'use client';

import React, { useEffect, useState } from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface PageLoadOrchestratorProps {
  children: React.ReactNode;
  enableOrchestration?: boolean;
  initialDelay?: number;
}

const PageLoadOrchestrator: React.FC<PageLoadOrchestratorProps> = ({
  children,
  enableOrchestration = true,
  initialDelay = 0,
}) => {
  const correlationId = useCorrelationId();
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const loadStartTime = performance.now();

    logger.info('Page load orchestration started', 'PageLoadOrchestrator', {
      event_type: 'performance_metric',
      operation: 'page_load_start',
      orchestration_enabled: enableOrchestration,
      prefers_reduced_motion: prefersReducedMotion,
      initial_delay: initialDelay,
      correlation_id_from_hook: correlationId,
    });

    const timer = setTimeout(() => {
      setIsLoaded(true);

      const loadEndTime = performance.now();
      const totalLoadTime = loadEndTime - loadStartTime;

      logger.info('Page load orchestration completed', 'PageLoadOrchestrator', {
        event_type: 'performance_metric',
        operation: 'page_load_complete',
        duration_ms: Math.round(totalLoadTime * 1000) / 1000,
        orchestration_enabled: enableOrchestration,
        prefers_reduced_motion: prefersReducedMotion,
        correlation_id_from_hook: correlationId,
      });
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      logger.debug('PageLoadOrchestrator unmounted', 'PageLoadOrchestrator', {
        event_type: 'component_lifecycle',
        lifecycle_stage: 'unmount',
        correlation_id_from_hook: correlationId,
      });
    };
  }, [correlationId, enableOrchestration, initialDelay, prefersReducedMotion]);

  // If reduced motion is preferred or orchestration is disabled, show immediately
  if (prefersReducedMotion || !enableOrchestration) {
    return <div className="opacity-100">{children}</div>;
  }

  // Enhanced orchestrated loading
  const orchestratorClasses = `
    page-load-orchestra
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
  `.trim();

  return <div className={orchestratorClasses}>{children}</div>;
};

export default PageLoadOrchestrator;
