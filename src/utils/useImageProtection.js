import { useEffect } from 'react';

function isImageTarget(target) {
  return target instanceof Element
    && Boolean(target.closest('img, [data-image-protected="true"]'));
}

/**
 * Prevents normal browser image-copy actions without affecting text or
 * browser inspection controls elsewhere on the site.
 */
export default function useImageProtection() {
  useEffect(() => {
    const preventImageAction = (event) => {
      if (isImageTarget(event.target)) event.preventDefault();
    };

    document.addEventListener('contextmenu', preventImageAction, true);
    document.addEventListener('copy', preventImageAction, true);
    document.addEventListener('cut', preventImageAction, true);
    document.addEventListener('selectstart', preventImageAction, true);
    document.addEventListener('dragstart', preventImageAction, true);

    return () => {
      document.removeEventListener('contextmenu', preventImageAction, true);
      document.removeEventListener('copy', preventImageAction, true);
      document.removeEventListener('cut', preventImageAction, true);
      document.removeEventListener('selectstart', preventImageAction, true);
      document.removeEventListener('dragstart', preventImageAction, true);
    };
  }, []);
}
