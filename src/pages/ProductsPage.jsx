import { useEffect, useState } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, PackageOpen, RefreshCw } from 'lucide-react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import ProductFilters from '../components/ProductFilters';

const emptyPagination = {
  hasNextPage: false,
  hasPreviousPage: false,
  limit: 15,
  page: 1,
  total: 0,
  totalPages: 1,
};

const emptyFilters = { categories: [], subCategories: [] };

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 4) return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages];
  if (currentPage >= totalPages - 3) return [1, 'ellipsis-left', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, 'ellipsis-left', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-right', totalPages];
}

function ProductPagination({ pagination, onPageChange }) {
  const pageItems = getPageItems(pagination.page, pagination.totalPages);

  return (
    <nav className="product-pagination" aria-label="Product pages">
      <button
        className="product-page-button product-page-arrow"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPreviousPage}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="product-page-numbers">
        {pageItems.map((item) => item.toString().startsWith('ellipsis') ? (
          <span className="product-page-ellipsis" key={item}>…</span>
        ) : (
          <button
            className={`product-page-button${item === pagination.page ? ' is-active' : ''}`}
            onClick={() => onPageChange(item)}
            aria-current={item === pagination.page ? 'page' : undefined}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className="product-page-button product-page-arrow"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNextPage}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

function ProductLoadingState() {
  return (
    <div className="product-grid" aria-live="polite" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => <div className="product-card-skeleton" key={index} />)}
    </div>
  );
}

export default function ProductsPage({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [pagination, setPagination] = useState(emptyPagination);
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);
      setError('');
      setProducts([]);

      fetchProducts({
        category,
        page,
        search: query,
        signal: controller.signal,
        subCategory,
      })
        .then((response) => {
          setProducts(response.data);
          setPagination(response.pagination);
          setFilters(response.filters);
          if (response.pagination.page !== page) setPage(response.pagination.page);
        })
        .catch((requestError) => {
          if (requestError.name !== 'AbortError') {
            setError(requestError.message || 'Unable to load products.');
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [category, page, query, retryToken, subCategory]);

  const firstProduct = pagination.total === 0 ? 0 : ((pagination.page - 1) * pagination.limit) + 1;
  const lastProduct = Math.min(pagination.page * pagination.limit, pagination.total);

  function clearFilters() {
    setQuery('');
    setCategory('');
    setSubCategory('');
    setPage(1);
  }

  return (
    <div className="products-page">
      <section className="products-page-header">
        <div className="container">
          <span className="products-page-eyebrow">PRODUCT CATALOGUE</span>
          <h1>Our Product Range</h1>
          <p>Explore our complete healthcare equipment catalogue with specifications, pricing and model details.</p>

          <ProductFilters
            query={query}
            category={category}
            subCategory={subCategory}
            categories={filters.categories}
            subCategories={filters.subCategories}
            onQueryChange={(value) => { setQuery(value); setPage(1); }}
            onCategoryChange={(value) => {
              setCategory(value);
              setSubCategory('');
              setFilters((currentFilters) => ({ ...currentFilters, subCategories: [] }));
              setPage(1);
            }}
            onSubCategoryChange={(value) => { setSubCategory(value); setPage(1); }}
            onClear={clearFilters}
            onClearSearch={() => { setQuery(''); setPage(1); }}
          />
        </div>
      </section>

      <section className="products-page-body section-shell">
        <div className="container">
          <div className="products-toolbar">
            <p>
              {isLoading ? 'Loading products…' : pagination.total > 0
                ? <>Showing <strong>{firstProduct}–{lastProduct}</strong> of <strong>{pagination.total}</strong> products</>
                : 'No products match your search'}
            </p>
          </div>

          {error ? (
            <div className="products-message products-error-message" role="alert">
              <AlertCircle size={42} strokeWidth={1.5} />
              <h2>We couldn&apos;t load the catalogue</h2>
              <p>{error}</p>
              <button className="product-retry-button" onClick={() => setRetryToken((currentToken) => currentToken + 1)}>
                <RefreshCw size={16} /> Try again
              </button>
            </div>
          ) : isLoading ? (
            <ProductLoadingState />
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="products-message" role="status">
              <PackageOpen size={48} strokeWidth={1.4} />
              <h2>No matching products found</h2>
              <p>Try a different keyword or remove one of the filters.</p>
              <button className="product-retry-button" onClick={clearFilters}>Reset search</button>
            </div>
          )}

          {!isLoading && !error && pagination.totalPages > 1 && (
            <ProductPagination pagination={pagination} onPageChange={setPage} />
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={(destination) => {
            setSelectedProduct(null);
            onNavigate(destination);
          }}
        />
      )}
    </div>
  );
}
