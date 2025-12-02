/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Caching Utilities - Phase 10: Performance Optimization
 *
 * Implements caching strategies including:
 * - Incremental Static Regeneration (ISR)
 * - Stale-While-Revalidate (SWR)
 * - Client-side caching
 */

/**
 * ISR Configuration for Next.js pages
 * Use in page components with generateStaticParams or getStaticProps
 */
export const ISRConfig = {
  // Revalidate every 60 seconds
  revalidate: 60,
  // Enable ISR for dynamic routes
  dynamicParams: true,
} as const;

/**
 * Cache durations for different data types
 */
export const CacheDuration = {
  // Static content (rarely changes)
  STATIC: 60 * 60 * 24 * 7, // 1 week
  // Semi-static content (changes occasionally)
  SEMI_STATIC: 60 * 60 * 24, // 1 day
  // Dynamic content (changes frequently)
  DYNAMIC: 60 * 5, // 5 minutes
  // Real-time content (changes constantly)
  REALTIME: 0, // No cache
} as const;

/**
 * Fetch options with caching configuration
 */
export function getCacheOptions(duration: number, tags?: string[]) {
  return {
    next: {
      revalidate: duration,
      tags: tags || [],
    },
  };
}

/**
 * Client-side cache using Map with TTL
 */
class ClientCache<T = any> {
  private cache = new Map<string, { data: T; expiry: number }>();

  set(key: string, data: T, ttl: number = CacheDuration.DYNAMIC) {
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { data, expiry });
  }

  get(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  has(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  /**
   * Get or set data with automatic fetching
   */
  async getOrFetch<D = T>(
    key: string,
    fetcher: () => Promise<D>,
    ttl: number = CacheDuration.DYNAMIC
  ): Promise<D> {
    const cached = this.get(key) as D;
    if (cached) return cached;

    const data = await fetcher();
    this.set(key, data as any, ttl);
    return data;
  }
}

/**
 * Global client cache instance
 */
export const clientCache = new ClientCache();

/**
 * SWR-like hook configuration
 * Use with RTK Query or custom hooks
 */
export const SWRConfig = {
  // Dedupe requests within this window
  dedupingInterval: 2000,
  // Revalidate on focus
  revalidateOnFocus: true,
  // Revalidate on reconnect
  revalidateOnReconnect: true,
  // Retry on error
  shouldRetryOnError: true,
  // Error retry count
  errorRetryCount: 3,
  // Error retry interval
  errorRetryInterval: 5000,
  // Focus throttle
  focusThrottleInterval: 5000,
} as const;

/**
 * Prefetch data for faster page transitions
 */
export async function prefetchData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = CacheDuration.DYNAMIC
): Promise<T> {
  return clientCache.getOrFetch(key, fetcher, ttl);
}

/**
 * Invalidate cache entries by tag or key
 */
export function invalidateCache(keyOrTag: string) {
  if (keyOrTag.includes('*')) {
    // Wildcard deletion
    const pattern = new RegExp(keyOrTag.replace('*', '.*'));
    const keysToDelete: string[] = [];

    clientCache['cache'].forEach((_, key) => {
      if (pattern.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => clientCache.delete(key));
  } else {
    clientCache.delete(keyOrTag);
  }
}

/**
 * Memory-efficient cache with size limit
 */
export class LRUCache<T = any> {
  private cache = new Map<string, T>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set(key: string, value: T) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    // Delete and re-add to move to end (most recent)
    this.cache.delete(key);
    this.cache.set(key, value);
  }

  get(key: string): T | undefined {
    if (!this.cache.has(key)) return undefined;

    // Move to end (mark as recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}
