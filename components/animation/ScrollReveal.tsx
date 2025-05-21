'use client';

import React from 'react';
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
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -100px 0px', // Same as the original margin
  });

  // Combine the animation state classes with any additional classes
  const combinedClassName = `
    ${className}
    ${isIntersecting ? 'scroll-reveal-final' : 'scroll-reveal-initial'}
    delay-${delay}
    duration-${duration}
  `;

  return (
    <div ref={ref} className={combinedClassName.trim()}>
      {children}
    </div>
  );
};

export default ScrollReveal;
