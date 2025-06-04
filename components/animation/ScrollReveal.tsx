'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import useIntersectionObserver from '@/lib/utils/use-intersection-observer';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  // Delay options align with the CSS utility classes
  delay?: 'none' | 'short' | 'medium';
  // Duration options align with the CSS utility classes
  duration?: 'short' | 'medium' | 'long';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.15,
  triggerOnce = true,
  className = '',
  delay = 'none',
  duration = 'medium',
}) => {
  const correlationId = useCorrelationId();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Log component mount
    logger.debug('ScrollReveal component mounted', 'ScrollReveal', {
      event_type: 'component_lifecycle',
      lifecycle_stage: 'mount',
      threshold,
      trigger_once: triggerOnce,
      delay,
      duration,
      correlation_id_from_hook: correlationId,
    });

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      logger.info('Reduced motion preference detected', 'ScrollReveal', {
        event_type: 'accessibility_feature',
        feature: 'prefers_reduced_motion',
        animation_disabled: true,
        correlation_id_from_hook: correlationId,
      });
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      logger.info('Motion preference changed', 'ScrollReveal', {
        event_type: 'accessibility_feature',
        feature: 'prefers_reduced_motion',
        new_state: e.matches ? 'reduced' : 'normal',
        correlation_id_from_hook: correlationId,
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      logger.debug('ScrollReveal component unmounted', 'ScrollReveal', {
        event_type: 'component_lifecycle',
        lifecycle_stage: 'unmount',
        correlation_id_from_hook: correlationId,
      });
    };
  }, [correlationId, threshold, triggerOnce, delay, duration]);

  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -100px 0px', // Same as the original margin
  });

  // Log scroll reveal triggers
  useEffect(() => {
    if (isIntersecting) {
      logger.debug('ScrollReveal element became visible', 'ScrollReveal', {
        event_type: 'user_interaction',
        interaction_type: 'scroll_reveal',
        threshold,
        animation_enabled: !prefersReducedMotion,
        delay,
        duration,
        correlation_id_from_hook: correlationId,
      });
    }
  }, [isIntersecting, correlationId, threshold, prefersReducedMotion, delay, duration]);

  // If reduced motion is preferred, show content immediately when intersecting
  const shouldAnimate = !prefersReducedMotion;

  // Combine the animation state classes with any additional classes
  const combinedClassName = clsx(
    className,
    prefersReducedMotion
      ? isIntersecting
        ? 'opacity-100'
        : 'opacity-0'
      : isIntersecting
        ? 'scroll-reveal-final'
        : 'scroll-reveal-initial',
    shouldAnimate && `delay-${delay}`,
    shouldAnimate && `duration-${duration}`
  );

  return (
    <div ref={ref} className={combinedClassName}>
      {children}
    </div>
  );
};

export default ScrollReveal;
