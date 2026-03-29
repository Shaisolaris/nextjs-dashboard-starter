import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export function formatDate(dateString: string, fmt = 'MMM d, yyyy'): string {
  try {
    return format(parseISO(dateString), fmt);
  } catch {
    return dateString;
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
}

export function getPercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function generateInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active:   'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30',
    archived: 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800',
    pending:  'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30',
    error:    'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30',
  };
  return map[status] ?? map.pending;
}

export function getRoleColor(role: string): string {
  const map: Record<string, string> = {
    owner:  'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/30',
    admin:  'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30',
    member: 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800',
    viewer: 'text-gray-400 bg-gray-50 dark:text-gray-500 dark:bg-gray-900',
  };
  return map[role] ?? map.member;
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
