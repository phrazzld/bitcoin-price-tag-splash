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
      {/* Enhanced floating orbs with sophisticated gradients */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl float-orb-one motion-reduce:[animation-play-state:paused] elevation-micro"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(247, 147, 26, 0.08) 0%, rgba(247, 147, 26, 0.04) 50%, rgba(247, 147, 26, 0.01) 100%)`,
        }}
      />

      <div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl float-orb-two motion-reduce:[animation-play-state:paused] elevation-micro"
        style={{
          background: `radial-gradient(circle at 70% 70%, rgba(97, 97, 97, 0.06) 0%, rgba(97, 97, 97, 0.03) 50%, rgba(97, 97, 97, 0.01) 100%)`,
        }}
      />

      {/* Sophisticated grid pattern with depth */}
      <div
        className="absolute inset-0 opacity-[0.015] backdrop-micro"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.6) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '72px 72px',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Ultra-subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
