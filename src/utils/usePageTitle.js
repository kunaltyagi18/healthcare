/**
 * usePageTitle.js
 * Sets document.title on mount, restores the default on unmount.
 */
import { useEffect } from 'react';

const BASE = 'Shivshakti Healthcare Equipments';

export default function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${BASE}`
      : BASE;
    return () => {
      document.title = BASE;
    };
  }, [pageTitle]);
}
