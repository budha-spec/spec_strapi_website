import { type ClassValue, clsx } from 'clsx';

/**
 * Merge Tailwind class names safely — handles conditional classes.
 * Use this instead of string concatenation.
 *
 * @example cn('base-class', isActive && 'active-class', 'another-class')
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date string to a readable format.
 * @example formatDate('2024-01-15') → 'January 15, 2024'
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
