import { useEffect, useRef } from 'react';

const EDITABLE_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '[contenteditable=""]',
].join(',');

function elementFromTarget(target) {
  if (target instanceof Element) return target;
  return target?.parentElement ?? null;
}

function isEditableTarget(target) {
  return Boolean(elementFromTarget(target)?.closest(EDITABLE_SELECTOR));
}

function clearSelection() {
  window.getSelection()?.removeAllRanges();
}

function isCopyShortcut(event) {
  const key = event.key.toLowerCase();
  return (event.ctrlKey || event.metaKey) && (key === 'c' || key === 'x');
}

function isInsideScope(target, scope) {
  const element = elementFromTarget(target);
  return Boolean(element && (element === scope || scope.contains(element)));
}

/**
 * Adds a scoped copy deterrent to a product detail surface. The hook returns
 * a ref so the rest of the site keeps normal selection, context menus and
 * browser inspection controls.
 */
export default function useAntiCopy() {
  const scopeRef = useRef(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    scope.classList.add('anti-copy-scope');

    const preventCopyUnlessEditable = (event) => {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
        clearSelection();
      }
    };

    const preventShortcut = (event) => {
      if (!isEditableTarget(event.target) && isCopyShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
        clearSelection();
      }
    };

    const preventNonEditableSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

      const touchesScope = isInsideScope(selection.anchorNode, scope)
        || isInsideScope(selection.focusNode, scope);
      if (!touchesScope) return;

      const startsInEditable = isEditableTarget(selection.anchorNode);
      const endsInEditable = isEditableTarget(selection.focusNode);
      if (!startsInEditable || !endsInEditable) clearSelection();
    };

    scope.addEventListener('selectstart', preventCopyUnlessEditable, true);
    scope.addEventListener('copy', preventCopyUnlessEditable, true);
    scope.addEventListener('cut', preventCopyUnlessEditable, true);
    scope.addEventListener('dragstart', preventCopyUnlessEditable, true);
    scope.addEventListener('keydown', preventShortcut, true);
    document.addEventListener('selectionchange', preventNonEditableSelection, true);

    return () => {
      scope.classList.remove('anti-copy-scope');
      scope.removeEventListener('selectstart', preventCopyUnlessEditable, true);
      scope.removeEventListener('copy', preventCopyUnlessEditable, true);
      scope.removeEventListener('cut', preventCopyUnlessEditable, true);
      scope.removeEventListener('dragstart', preventCopyUnlessEditable, true);
      scope.removeEventListener('keydown', preventShortcut, true);
      document.removeEventListener('selectionchange', preventNonEditableSelection, true);
    };
  }, []);

  return scopeRef;
}
