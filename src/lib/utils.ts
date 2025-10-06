import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes
 * Inspired by mobile.de's clean class management
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Euro currency for Bulgarian market
 */
export function formatPrice(price: number, locale: 'bg' | 'en' = 'bg'): string {
  if (locale === 'bg') {
    return `${price.toLocaleString('bg-BG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} €`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format numbers for Bulgarian locale
 */
export function formatNumber(num: number, locale: 'bg' | 'en' = 'bg'): string {
  return num.toLocaleString(locale === 'bg' ? 'bg-BG' : 'en-US');
}

/**
 * Format date for Bulgarian/English locales
 */
export function formatDate(date: Date, locale: 'bg' | 'en' = 'bg'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString(locale === 'bg' ? 'bg-BG' : 'en-US', options);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date, locale: 'bg' | 'en' = 'bg'): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale === 'bg' ? 'bg' : 'en', {
    numeric: 'auto'
  });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Generate URL slug from text (supports Cyrillic)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-а-я]/g, '') // Allow Cyrillic characters
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate Bulgarian phone number
 */
export function isValidBulgarianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Bulgarian mobile: +359 8X XXX XXXX or 08X XXX XXXX
  // Bulgarian landline: +359 X XXX XXXX or 0X XXX XXXX
  const bgPhoneRegex = /^(\+359|0)[2-9]\d{7,8}$/;
  return bgPhoneRegex.test(cleanPhone);
}

/**
 * Validate Bulgarian postal code
 */
export function isValidBulgarianPostalCode(postalCode: string): boolean {
  const cleanCode = postalCode.replace(/\s/g, '');
  // Bulgarian postal codes are 4 digits
  const bgPostalRegex = /^\d{4}$/;
  return bgPostalRegex.test(cleanCode);
}

/**
 * Generate random ID (for temporary use)
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Debounce function for search
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Calculate shipping cost based on weight and distance
 */
export function calculateShipping(weight: number, distance: number): number {
  const baseRate = 5; // 5 EUR base rate
  const weightRate = weight * 0.5; // 0.5 EUR per kg
  const distanceRate = distance > 50 ? 2 : 0; // 2 EUR for long distance
  
  return Math.max(baseRate + weightRate + distanceRate, 3); // Minimum 3 EUR
}

/**
 * Get car year options for filters
 */
export function getCarYears(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }
  
  return years;
}

/**
 * Validate part number format
 */
export function isValidPartNumber(partNumber: string): boolean {
  // Common part number formats: alphanumeric, dashes, spaces allowed
  const partNumberRegex = /^[A-Za-z0-9\s\-\.]{3,20}$/;
  return partNumberRegex.test(partNumber.trim());
}

/**
 * Convert file size to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Check if image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  const imageRegex = /\.(jpg|jpeg|png|webp|gif)$/i;
  return imageRegex.test(url);
}

/**
 * Mobile.de inspired color utilities
 */
export const colors = {
  primary: '#0ea5e9',
  primaryHover: '#0284c7',
  orange: '#f97316',
  orangeHover: '#ea580c',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const;