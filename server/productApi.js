import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const PRODUCT_PAGE_SIZE = 15;

const productsPath = fileURLToPath(new URL('../src/data/products.json', import.meta.url));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const uniqueSorted = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
const categories = uniqueSorted(products.map((product) => product.category));
const subCategories = uniqueSorted(products.map((product) => product.subCategory));

function normalise(value) {
  return String(value ?? '').trim().toLocaleLowerCase();
}

function matchesSearch(product, search) {
  const keywords = normalise(search).split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return true;

  const searchableText = normalise([
    product.title,
    product.modelNumber,
    product.category,
    product.subCategory,
    product.description,
  ].join(' '));

  return keywords.every((keyword) => searchableText.includes(keyword));
}

export function getProductsPage(searchParams) {
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const subCategory = searchParams.get('subCategory') ?? '';
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const filteredProducts = products.filter((product) => (
    (!category || product.category === category) &&
    (!subCategory || product.subCategory === subCategory) &&
    matchesSearch(product, search)
  ));

  const total = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PRODUCT_PAGE_SIZE;

  return {
    data: filteredProducts.slice(start, start + PRODUCT_PAGE_SIZE),
    pagination: {
      page: safePage,
      limit: PRODUCT_PAGE_SIZE,
      total,
      totalPages,
      hasPreviousPage: safePage > 1,
      hasNextPage: safePage < totalPages,
    },
    filters: {
      categories,
      subCategories,
    },
  };
}

export function sendProductsResponse(req, res) {
  const requestUrl = new URL(req.originalUrl || req.url || '/', 'http://localhost');
  const payload = getProductsPage(requestUrl.searchParams);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}
