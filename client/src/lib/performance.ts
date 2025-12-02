/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performance Monitoring - Phase 10: Performance Optimization
 *
 * Utilities for monitoring and measuring application performance:
 * - Web Vitals (CLS, FID, LCP, FCP, TTFB)
 * - Custom performance metrics
 * - Component render tracking
 * - API call timing
 */

'use client';

import { useEffect } from 'react';

/**
 * Performance metric types
 */
export type MetricType = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

export interface PerformanceMetric {
  name: MetricType;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType: string;
  id: string;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value.toFixed(2),
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    if (typeof window !== 'undefined' && navigator.sendBeacon) {
      const body = JSON.stringify(metric);
      navigator.sendBeacon('/api/analytics/vitals', body);
    }
  }
}

/**
 * Custom performance marker
 */
export class PerformanceMarker {
  private marks = new Map<string, number>();

  /**
   * Start timing an operation
   */
  start(name: string) {
    this.marks.set(name, performance.now());
  }

  /**
   * End timing and get duration
   */
  end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`No start mark found for: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Measure and report duration
   */
  measure(name: string, callback: () => void): number {
    this.start(name);
    callback();
    return this.end(name);
  }

  /**
   * Async measure
   */
  async measureAsync<T>(name: string, callback: () => Promise<T>): Promise<T> {
    this.start(name);
    const result = await callback();
    this.end(name);
    return result;
  }
}

/**
 * Global performance marker instance
 */
export const perfMarker = new PerformanceMarker();

/**
 * Measure component render time
 */
export function useRenderTracking(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const renderTime = performance.now() - startTime;
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        // Warn if render takes longer than one frame (16ms)
        console.warn(
          `[Render Tracking] ${componentName} took ${renderTime.toFixed(2)}ms to render`
        );
      }
    };
  }, [componentName]);
}

/**
 * Track API call performance
 */
export async function trackAPICall<T>(endpoint: string, fetcher: () => Promise<T>): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fetcher();
    const duration = performance.now() - startTime;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Call] ${endpoint}: ${duration.toFixed(2)}ms`);
    }

    // Log slow API calls
    if (duration > 1000) {
      console.warn(`[Slow API] ${endpoint} took ${duration.toFixed(2)}ms`);
    }

    return result;
  } catch (err) {
    const duration = performance.now() - startTime;
    console.error(`[API Error] ${endpoint} failed after ${duration.toFixed(2)}ms`, err);
    throw err;
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    // Navigation timing
    dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
    tcp: navigation?.connectEnd - navigation?.connectStart,
    ttfb: navigation?.responseStart - navigation?.requestStart,
    download: navigation?.responseEnd - navigation?.responseStart,
    domInteractive: navigation?.domInteractive - navigation?.fetchStart,
    domComplete: navigation?.domComplete - navigation?.fetchStart,
    loadComplete: navigation?.loadEventEnd - navigation?.fetchStart,

    // Paint timing
    fcp: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,

    // Memory (if available)
    memory: (performance as any).memory
      ? {
          used: Math.round(((performance as any).memory.usedJSHeapSize / 1048576) * 100) / 100,
          total: Math.round(((performance as any).memory.totalJSHeapSize / 1048576) * 100) / 100,
          limit: Math.round(((performance as any).memory.jsHeapSizeLimit / 1048576) * 100) / 100,
        }
      : null,
  };
}

/**
 * Log performance metrics to console (development only)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV !== 'development') return;

  const metrics = getPerformanceMetrics();
  if (!metrics) return;

  console.group('⚡ Performance Metrics');
  console.log('DNS Lookup:', `${metrics.dns.toFixed(2)}ms`);
  console.log('TCP Connection:', `${metrics.tcp.toFixed(2)}ms`);
  console.log('TTFB:', `${metrics.ttfb.toFixed(2)}ms`);
  console.log('Download:', `${metrics.download.toFixed(2)}ms`);
  console.log('DOM Interactive:', `${metrics.domInteractive.toFixed(2)}ms`);
  console.log('DOM Complete:', `${metrics.domComplete.toFixed(2)}ms`);
  console.log('Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`);
  console.log('FCP:', `${metrics.fcp.toFixed(2)}ms`);

  if (metrics.memory) {
    console.log(
      'Memory:',
      `${metrics.memory.used}MB / ${metrics.memory.total}MB (${metrics.memory.limit}MB limit)`
    );
  }

  console.groupEnd();
}

/**
 * Performance observer for long tasks
 */
export function observeLongTasks(threshold: number = 50) {
  if (typeof window === 'undefined' || !(window as any).PerformanceObserver) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > threshold) {
          console.warn(`[Long Task] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['longtask', 'measure'] });

    return () => observer.disconnect();
  } catch {
    console.warn('Long task observation not supported');
  }
}
