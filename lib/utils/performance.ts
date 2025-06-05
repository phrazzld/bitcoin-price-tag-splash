/**
 * Performance monitoring utilities for animations and Core Web Vitals
 */

import { logger } from '@/lib/logging/logger';

interface PerformanceMetrics {
  animationFrameTime: number;
  animationDuration: number;
  elementCount: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

/**
 * Measures animation performance using requestAnimationFrame
 */
export function measureAnimationPerformance(
  elementSelector: string,
  animationName: string,
  callback?: (metrics: PerformanceMetrics) => void
): void {
  const element = document.querySelector(elementSelector);
  if (!element) {
    logger.warn(
      `Element not found for performance measurement: ${elementSelector}`,
      'PerformanceUtils'
    );
    return;
  }

  const startTime = performance.now();
  let frameCount = 0;
  let maxFrameTime = 0;
  let animationEndTime = 0;

  const measureFrame = (timestamp: number) => {
    frameCount++;
    const frameTime = timestamp - (animationEndTime || startTime);
    maxFrameTime = Math.max(maxFrameTime, frameTime);
    animationEndTime = timestamp;

    // Continue measuring until animation completes or 2 seconds elapsed
    if (timestamp - startTime < 2000) {
      requestAnimationFrame(measureFrame);
    } else {
      const metrics: PerformanceMetrics = {
        animationFrameTime: maxFrameTime,
        animationDuration: timestamp - startTime,
        elementCount: document.querySelectorAll(elementSelector).length,
      };

      // Log performance metrics
      logger.info('Animation performance measured', 'PerformanceUtils', {
        event_type: 'performance_measurement',
        animation_name: animationName,
        max_frame_time_ms: metrics.animationFrameTime,
        total_duration_ms: metrics.animationDuration,
        frame_count: frameCount,
        avg_fps: Math.round(frameCount / (metrics.animationDuration / 1000)),
        element_count: metrics.elementCount,
        performance_grade:
          metrics.animationFrameTime < 16.67
            ? 'excellent'
            : metrics.animationFrameTime < 33.33
              ? 'good'
              : 'poor',
      });

      callback?.(metrics);
    }
  };

  requestAnimationFrame(measureFrame);
}

/**
 * Measures Core Web Vitals using the Web Vitals API
 */
export function measureCoreWebVitals(): void {
  // Only measure in production and with Web Vitals API support
  if (process.env.NODE_ENV !== 'production' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    // Measure Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      logger.info('Core Web Vital measured', 'PerformanceUtils', {
        event_type: 'core_web_vital',
        metric: 'LCP',
        value: lastEntry.startTime,
        grade:
          lastEntry.startTime < 2500
            ? 'good'
            : lastEntry.startTime < 4000
              ? 'needs_improvement'
              : 'poor',
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as FirstInputEntry;
        logger.info('Core Web Vital measured', 'PerformanceUtils', {
          event_type: 'core_web_vital',
          metric: 'FID',
          value: fidEntry.processingStart - fidEntry.startTime,
          grade:
            fidEntry.processingStart - fidEntry.startTime < 100
              ? 'good'
              : fidEntry.processingStart - fidEntry.startTime < 300
                ? 'needs_improvement'
                : 'poor',
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Measure Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as LayoutShiftEntry;
        if (!layoutEntry.hadRecentInput) {
          clsValue += layoutEntry.value;
        }
      }

      logger.info('Core Web Vital measured', 'PerformanceUtils', {
        event_type: 'core_web_vital',
        metric: 'CLS',
        value: clsValue,
        grade: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor',
      });
    }).observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    logger.warn('Failed to measure Core Web Vitals', 'PerformanceUtils', {
      event_type: 'performance_error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Measures paint timing (FCP, FP)
 */
export function measurePaintTiming(): void {
  if (!('PerformanceObserver' in window)) {
    return;
  }

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        logger.info('Paint timing measured', 'PerformanceUtils', {
          event_type: 'paint_timing',
          metric: entry.name,
          value: entry.startTime,
          grade:
            entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs_improvement' : 'poor',
        });
      });
    }).observe({ entryTypes: ['paint'] });
  } catch (error) {
    logger.warn('Failed to measure paint timing', 'PerformanceUtils', {
      event_type: 'performance_error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Initialize performance monitoring
 */
export function initializePerformanceMonitoring(): void {
  // Wait for page load before measuring
  if (document.readyState === 'complete') {
    measureCoreWebVitals();
    measurePaintTiming();
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        measureCoreWebVitals();
        measurePaintTiming();
      }, 100);
    });
  }
}

/**
 * Debounced performance measurement for scroll events
 */
export function debouncePerformanceMeasurement<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}
