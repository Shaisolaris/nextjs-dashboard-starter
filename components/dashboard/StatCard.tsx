'use client';

import { cn, formatCurrency, formatNumber, getPercentageChange } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  iconColor?: string;
  format?: 'number' | 'currency' | 'raw';
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  previousValue,
  prefix,
  suffix,
  icon: Icon,
  iconColor = 'text-brand-600 bg-brand-50 dark:text-brand-400 dark:bg-brand-900/30',
  format = 'raw',
  loading = false,
}: StatCardProps) {
  const numValue = typeof value === 'number' ? value : parseFloat(String(value));

  const displayValue = () => {
    if (format === 'currency') return formatCurrency(numValue);
    if (format === 'number') return formatNumber(numValue);
    return `${prefix ?? ''}${value}${suffix ?? ''}`;
  };

  const change = previousValue !== undefined && typeof numValue === 'number'
    ? getPercentageChange(numValue, previousValue)
    : null;

  if (loading) {
    return (
      <div className="stat-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="stat-card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
        {displayValue()}
      </p>

      {change !== null && (
        <div className={cn(
          'flex items-center gap-1 mt-2 text-xs font-medium',
          change > 0 ? 'text-green-600 dark:text-green-400' :
          change < 0 ? 'text-red-500 dark:text-red-400' :
          'text-gray-400'
        )}>
          {change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> :
           change < 0 ? <TrendingDown className="w-3.5 h-3.5" /> :
           <Minus className="w-3.5 h-3.5" />}
          <span>
            {change > 0 ? '+' : ''}{change}% vs last month
          </span>
        </div>
      )}
    </div>
  );
}

interface StatGridProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}

export function StatGrid({ children, cols = 4 }: StatGridProps) {
  return (
    <div className={cn(
      'grid gap-4',
      cols === 2 && 'grid-cols-1 sm:grid-cols-2',
      cols === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      cols === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    )}>
      {children}
    </div>
  );
}
