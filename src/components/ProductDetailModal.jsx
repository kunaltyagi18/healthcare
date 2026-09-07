import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { formatCurrency, getDescriptionLines } from '../utils/productFormatting';

export default function ProductDetailModal({ product, onClose, onNavigate }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const price = formatCurrency(product.discountedPrice ?? product.totalValue ?? product.mrp);
  const mrp = formatCurrency(product.mrp);
  const totalValue = formatCurrency(product.totalValue);

  return (
    <div className="product-detail-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="product-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="product-detail-close" onClick={onClose} aria-label="Close product details">
          <X size={20} />
        </button>

        <div className="product-detail-grid">
          <div className="product-detail-media">
            <img src={product.image} alt={product.title} />
            <span>{product.category}</span>
          </div>

          <div className="product-detail-content">
            <p className="product-detail-subcategory">{product.subCategory}</p>
            <h2 id="product-detail-title">{product.title}</h2>
            {product.modelNumber && <p className="product-detail-model">Model: {product.modelNumber}</p>}

            <div className="product-detail-price-row">
              <div>
                {price ? <strong>{price}</strong> : <strong>Price on request</strong>}
                {mrp && mrp !== price && <span>MRP {mrp}</span>}
                {totalValue && product.discountedPrice != null && <small>Incl. GST: {totalValue}</small>}
              </div>
              <span className="product-detail-number">#{product.serialNumber}</span>
            </div>

            <div className="product-detail-specifications">
              <h3>Product details</h3>
              <ul>
                {getDescriptionLines(product.description).map((line, index) => <li key={`${product.id}-detail-${index}`}>{line}</li>)}
              </ul>
            </div>

            <button className="product-detail-enquire" onClick={() => onNavigate('contact')}>
              Enquire About This Product <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
