/**
 * Web Vitals Component - Phase 10: Performance Optimization
 *
 * Automatically reports Web Vitals metrics for performance monitoring
 */

'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid blocking main bundle
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Report all Web Vitals
      onCLS(reportMetric);
      onFCP(reportMetric);
      onLCP(reportMetric);
      onTTFB(reportMetric);
      onINP(reportMetric);
    });
  }, []);

  return null;
}

function reportMetric(metric: Metric) {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value.toFixed(2),
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Example: Custom analytics endpoint
    if (typeof window !== 'undefined' && navigator.sendBeacon) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
      });
      navigator.sendBeacon('/api/analytics/vitals', body);
    }
  }
}
