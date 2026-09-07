import { ArrowRight } from 'lucide-react';
import { formatCurrency, getDescription } from '../utils/productFormatting';

export default function ProductCard({ product, onNavigate, onOpen }) {
  const displayPrice = product.discountedPrice ?? product.totalValue ?? product.mrp;
  const mrp = formatCurrency(product.mrp);
  const totalValue = formatCurrency(product.totalValue);
  const price = formatCurrency(displayPrice);

  return (
    <article
      className="product-card"
      onClick={() => onOpen(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(product);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
    >
      <div className="product-card-media">
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
        <span className="product-card-number">#{product.serialNumber}</span>
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-subcategory">{product.subCategory}</span>
          {product.modelNumber && <span className="product-card-model">{product.modelNumber}</span>}
        </div>
        <h2 className="product-card-title">{product.title}</h2>
        <p className="product-card-description">{getDescription(product.description)}</p>

        <div className="product-card-footer">
          <div className="product-card-price-block">
            {price ? (
              <>
                <span className="product-card-price">{price}</span>
                {mrp && mrp !== price && <span className="product-card-mrp">MRP {mrp}</span>}
                {totalValue && product.discountedPrice != null && (
                  <span className="product-card-gst">Incl. GST: {totalValue}</span>
                )}
              </>
            ) : (
              <span className="product-card-price product-card-price-request">Price on request</span>
            )}
          </div>
          <button
            className="product-card-enquire"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate('contact');
            }}
            aria-label={`Enquire about ${product.title}`}
          >
            <span>Enquire</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
