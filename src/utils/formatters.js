export function formatCurrency(amount, currency = '$') {
  const num = Number(amount) || 0;

  return `${currency}${num.toFixed(2)}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date)) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatShortDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date)) return dateString;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}