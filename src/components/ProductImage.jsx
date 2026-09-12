import { useState } from 'react';

function getUsableSource(src) {
  const value = String(src ?? '').trim();
  return value && !value.startsWith('/products/') ? value : '';
}

export default function ProductImage({ src, alt = '', className = '', ...props }) {
  const source = getUsableSource(src);
  const [failedSource, setFailedSource] = useState('');

  if (!source || failedSource === source) {
    return (
      <div
        className={`product-image-placeholder${className ? ` ${className}` : ''}`}
        role="img"
        aria-label={alt || 'Product image coming soon'}
      >
        <span className="product-image-placeholder-mark" aria-hidden="true">SVS</span>
        <span className="product-image-placeholder-text">Product Image<br />Coming Soon</span>
      </div>
    );
  }

  return <img {...props} className={className} src={source} alt={alt} onError={() => setFailedSource(source)} />;
}
