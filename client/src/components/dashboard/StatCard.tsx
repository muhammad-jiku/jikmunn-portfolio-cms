'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  green: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  purple: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
  orange: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/20 dark:text-fuchsia-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-sm mt-2',
                trend.isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              )}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
