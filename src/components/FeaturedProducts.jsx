import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, PackageOpen, RefreshCw } from 'lucide-react';
import { fetchProducts } from '../api/products';

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

    fetchProducts({ page: 1, signal: controller.signal })
      .then((response) => setProducts(response.data.slice(0, 8)))
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
                  <img
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
