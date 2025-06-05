'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export function PerformanceMonitor() {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      entries.forEach((entry) => {
        metrics.fid = entry.processingStart - entry.startTime;
      });
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries() as any[];
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
    });

    // First Contentful Paint & Time to First Byte
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        if (entry.responseStart) {
          metrics.ttfb = entry.responseStart - entry.requestStart;
        }
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      navigationObserver.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }

    // Report metrics after page load
    const reportMetrics = () => {
      // In production, you could send these to analytics
      console.log('EPK Performance Metrics:', metrics);
      
      // Optional: Send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: sendToAnalytics(metrics);
      }
    };

    // Report after 5 seconds to capture most metrics
    const timer = setTimeout(reportMetrics, 5000);

    return () => {
      clearTimeout(timer);
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      navigationObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for component-level performance monitoring
export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      console.log(`${componentName} render time: ${renderTime}ms`);
    };
  }, [componentName]);
}
