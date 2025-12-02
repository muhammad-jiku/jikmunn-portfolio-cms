/**
 * Lazy Loading Utilities - Phase 10: Performance Optimization
 *
 * These utilities provide code splitting and lazy loading capabilities
 * to reduce initial bundle size and improve page load performance.
 */

import dynamic from 'next/dynamic';
import type { ComponentType, ReactElement } from 'react';

/**
 * Loading component for lazy-loaded components
 */
export const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
  </div>
);

/**
 * Error boundary fallback component
 */
export const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex items-center justify-center min-h-[200px] p-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
        Failed to load component
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{error.message}</p>
    </div>
  </div>
);

/**
 * Lazy load a component with automatic code splitting
 *
 * @param importFunc - Dynamic import function
 * @param options - Loading and error components
 * @returns Dynamically imported component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    loading?: () => ReactElement;
    ssr?: boolean;
  }
) {
  return dynamic(importFunc, {
    loading: options?.loading || LoadingFallback,
    ssr: options?.ssr ?? true,
  });
}

/**
 * Lazy load a component with no SSR (client-side only)
 * Useful for components that rely on browser APIs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoadClient<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    loading?: () => ReactElement;
  }
) {
  return dynamic(importFunc, {
    loading: options?.loading || LoadingFallback,
    ssr: false,
  });
}

/**
 * Preload a component for faster subsequent renders
 * Call this when you know a component will be needed soon
 *
 * @param importFunc - Dynamic import function to preload
 */
export function preloadComponent<T>(importFunc: () => Promise<{ default: T }>) {
  // Webpack will start loading the chunk
  importFunc();
}

/**
 * Lazy load multiple components in parallel
 * Useful for route-based code splitting
 *
 * @param imports - Array of import functions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function lazyLoadMultiple<T extends any[]>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...imports: Array<() => Promise<any>>
): Promise<T> {
  return Promise.all(imports.map((importFunc) => importFunc())) as Promise<T>;
}
