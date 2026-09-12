import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, PackageOpen, RefreshCw } from 'lucide-react';
import { fetchProducts } from '../api/products';
import ProductImage from './ProductImage';

const excludedFeaturedModels = new Set([
  'SVS-ELT-199',
  'SVS-ELTA-210',
  'SVS-ELTA-211',
  'SVS-ELTA-212',
  'SVS-ELTA-213',
]);
const preferredFeaturedModels = ['SVS-REH-522', 'SVS-CMG-1103', 'SVS-REH-553'];

function hasUsableFeaturedImage(product) {
  const image = String(product.image ?? '').trim();
  return image
    && !image.startsWith('/products/')
    && !excludedFeaturedModels.has(product.modelNumber);
}

function FeaturedProductLoading() {
  return (
    <div className="featured-product-grid" aria-live="polite" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => <div className="featured-product-skeleton" key={index} />)}
    </div>
  );
}

export default function FeaturedProducts({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadFeaturedProducts() {
      const [firstPage, ...preferredPages] = await Promise.all([
        fetchProducts({ page: 1, signal: controller.signal }),
        ...preferredFeaturedModels.map((modelNumber) => fetchProducts({ search: modelNumber, signal: controller.signal })),
      ]);
      const firstProducts = firstPage.data.filter(hasUsableFeaturedImage).slice(0, 5);
      const preferredProducts = preferredPages
        .flatMap((response) => response.data)
        .filter(hasUsableFeaturedImage);

      setProducts([...firstProducts, ...preferredProducts].slice(0, 8));
    }

    loadFeaturedProducts()
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load featured products.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="section-shell featured-products-section">
      <div className="container">
        <div className="featured-products-heading">
          <div>
            <span className="eyebrow">OUR PRODUCT RANGE</span>
            <h2>Featured Products</h2>
          </div>
        </div>

        {error ? (
          <div className="featured-products-message" role="alert">
            <AlertCircle size={34} />
            <p>{error}</p>
            <button className="product-retry-button" onClick={() => window.location.reload()}>
              <RefreshCw size={15} /> Try again
            </button>
          </div>
        ) : isLoading ? (
          <FeaturedProductLoading />
        ) : products.length > 0 ? (
          <div className="featured-product-grid">
            {products.map((product) => (
              <button
                className="featured-product-tile"
                key={product.id}
                onClick={() => onNavigate('products')}
                aria-label={`View ${product.title} on the products page`}
              >
                <div className="featured-product-image">
                  <ProductImage
                    src={product.image}
                    alt=""
                    loading="lazy"
                    draggable="false"
                    onCopy={(event) => event.preventDefault()}
                    onContextMenu={(event) => event.preventDefault()}
                    onDragStart={(event) => event.preventDefault()}
                  />
                </div>
                <span className="featured-product-name">{product.title}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="featured-products-message" role="status">
            <PackageOpen size={36} />
            <p>No products are available right now.</p>
          </div>
        )}

        <div className="featured-products-footer">
          <button className="featured-products-view-all" onClick={() => onNavigate('products')}>
            See All Products <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
