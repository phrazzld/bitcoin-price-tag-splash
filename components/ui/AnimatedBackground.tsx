'use client';

import React, { useEffect } from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

const AnimatedBackground: React.FC = () => {
  const correlationId = useCorrelationId();

  useEffect(() => {
    const startTime = performance.now();

    // Log component mount with performance timing
    logger.debug('AnimatedBackground component mounted', 'AnimatedBackground', {
      event_type: 'component_lifecycle',
      lifecycle_stage: 'mount',
      performance_critical: true,
      correlation_id_from_hook: correlationId,
    });

    // Check if animations are enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      logger.info('Reduced motion detected', 'AnimatedBackground', {
        event_type: 'accessibility_feature',
        feature: 'prefers_reduced_motion',
        animation_state: 'paused',
        correlation_id_from_hook: correlationId,
      });
    }

    const mountTime = performance.now() - startTime;

    // Log mount performance
    logger.debug('AnimatedBackground mount completed', 'AnimatedBackground', {
      event_type: 'performance_metric',
      operation: 'component_mount',
      duration_ms: Math.round(mountTime * 1000) / 1000,
      correlation_id_from_hook: correlationId,
    });

    return () => {
      logger.debug('AnimatedBackground component unmounted', 'AnimatedBackground', {
        event_type: 'component_lifecycle',
        lifecycle_stage: 'unmount',
        performance_critical: true,
        correlation_id_from_hook: correlationId,
      });
    };
  }, [correlationId]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Floating orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl float-orb-one motion-reduce:[animation-play-state:paused]" />

      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl float-orb-two motion-reduce:[animation-play-state:paused]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                           linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
