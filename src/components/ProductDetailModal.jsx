import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { formatCurrency, getDescriptionLines } from '../utils/productFormatting';
import useAntiCopy from '../utils/useAntiCopy';

export default function ProductDetailModal({ product, onClose, onNavigate }) {
  const antiCopyRef = useAntiCopy();
  const allProductImages = [...new Set([
    product.image,
    ...(Array.isArray(product.images) ? product.images : []),
  ].filter(Boolean))];
  const hasCloudinaryImages = allProductImages.some((image) => String(image).includes('res.cloudinary.com'));
  const productImages = allProductImages.filter((image) => (
    !hasCloudinaryImages || !String(image).startsWith('/products/')
  ));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleSwipe() {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 40 && activeImageIndex < productImages.length - 1) {
      setActiveImageIndex((prev) => prev + 1);
    } else if (distance < -40 && activeImageIndex > 0) {
      setActiveImageIndex((prev) => prev - 1);
    }
    setTouchStart(null);
    setTouchEnd(null);
  }

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
        ref={antiCopyRef}
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
            <div 
              className="product-detail-image-stage"
              onTouchStart={(e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); }}
              onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
              onTouchEnd={handleSwipe}
              onMouseDown={(e) => { setIsDragging(true); setTouchEnd(null); setTouchStart(e.clientX); }}
              onMouseMove={(e) => { if (isDragging) setTouchEnd(e.clientX); }}
              onMouseUp={() => { if (isDragging) { setIsDragging(false); handleSwipe(); } }}
              onMouseLeave={() => { if (isDragging) { setIsDragging(false); handleSwipe(); } }}
              style={{ cursor: productImages.length > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <img
                className="product-detail-main-image"
                src={productImages[activeImageIndex] || product.image}
                alt={product.title}
                draggable="false"
                onCopy={(event) => event.preventDefault()}
                onContextMenu={(event) => event.preventDefault()}
                onDragStart={(event) => event.preventDefault()}
              />
            </div>
            {productImages.length > 1 && (
              <div className="product-detail-gallery" aria-label="Product images">
                {productImages.map((image, index) => (
                  <button
                    className={`product-detail-thumbnail${index === activeImageIndex ? ' is-active' : ''}`}
                    type="button"
                    key={image}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={index === activeImageIndex}
                  >
                    <img src={image} alt="" draggable="false" />
                  </button>
                ))}
              </div>
            )}
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
