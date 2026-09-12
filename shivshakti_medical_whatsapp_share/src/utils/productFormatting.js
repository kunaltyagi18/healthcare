const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function formatCurrency(value) {
  return value == null ? null : currencyFormatter.format(value);
}

function withoutContactFooter(description = '') {
  return description.replace(/If you have any doubts or queries,[\s\S]*$/i, '').trim();
}

export function getDescription(description = '') {
  const cleanDescription = withoutContactFooter(description).replace(/\s+/g, ' ').trim();
  return cleanDescription || 'Product specifications available on request.';
}

export function getDescriptionLines(description = '') {
  const lines = withoutContactFooter(description)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[➢•●-]\s*/, ''));

  return lines.length > 0 ? lines : ['Product specifications available on request.'];
}
