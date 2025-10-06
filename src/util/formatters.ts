// Utility functions for formatting currency, dates, and other locale-specific values
// Supports Bulgarian (BG) and English (EN) locales

export function formatPrice(price: number, locale: string = 'bg'): string {
  const currency = 'EUR';

  if (locale === 'bg') {
    // Bulgarian format: 1 234,56 €
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(price);
  } else {
    // English format: €1,234.56
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(price);
  }
}

export function formatDate(date: Date | string, locale: string = 'bg'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (locale === 'bg') {
    // Bulgarian date format: 15.10.2023
    return d.toLocaleDateString('bg-BG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } else {
    // English date format: 10/15/2023
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }
}

export function formatNumber(num: number, locale: string = 'bg'): string {
  if (locale === 'bg') {
    return num.toLocaleString('bg-BG');
  } else {
    return num.toLocaleString('en-US');
  }
}