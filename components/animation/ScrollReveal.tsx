'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import useIntersectionObserver from '@/lib/utils/use-intersection-observer';

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -100px 0px', // Same as the original margin
  });

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
