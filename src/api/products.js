export const PRODUCT_PAGE_SIZE = 15;

export async function fetchProducts({ page = 1, search = '', category = '', subCategory = '', signal } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PRODUCT_PAGE_SIZE),
  });

  if (search.trim()) params.set('search', search.trim());
  if (category) params.set('category', category);
  if (subCategory) params.set('subCategory', subCategory);

  const response = await fetch(`/api/products?${params.toString()}`, { signal });
  if (!response.ok) {
    throw new Error('Unable to load the product catalogue.');
  }

  return response.json();
}
