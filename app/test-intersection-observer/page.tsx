'use client';

import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '@/lib/utils/use-intersection-observer';

interface TestCardProps {
  threshold?: number;
  triggerOnce?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({ threshold = 0.1, triggerOnce = true }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`
        p-6 rounded-lg border-2 border-bitcoin-orange 
        transition-all duration-500 
        ${
          isIntersecting
            ? 'bg-bitcoin-orange text-white opacity-100 translate-y-0 scale-100'
            : 'bg-white text-gray-900 opacity-0 translate-y-10 scale-95'
        }
      `}
    >
      <h3 className="text-xl font-bold mb-2">{isIntersecting ? 'Visible!' : 'Not yet visible'}</h3>
      <p>
        {isIntersecting
          ? 'This element is now intersecting with the viewport.'
          : 'Scroll down to see this element animate in.'}
      </p>
      <p className="mt-2 text-sm">
        <strong>Threshold:</strong> {threshold} | <strong>Trigger Once:</strong>{' '}
        {triggerOnce ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default function TestIntersectionObserverPage(): React.ReactNode {
  const [scrollIndicator, setScrollIndicator] = useState<boolean>(true);

  // Hide scroll indicator after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollIndicator(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[300vh] pb-40 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md p-6 z-10">
        <h1 className="text-3xl font-bold text-center">Intersection Observer Hook Test</h1>
        <p className="text-center text-gray-600 mt-2">
          Scroll down to see elements animate in when they intersect with the viewport
        </p>
      </header>

      {/* First spacer */}
      <div className="h-[50vh] flex items-center justify-center">
        {scrollIndicator && (
          <p className="animate-bounce text-gray-500">↓ Scroll down to see the test elements ↓</p>
        )}
      </div>

      {/* Test cards with different configurations */}
      <div className="max-w-3xl mx-auto space-y-40 px-4">
        <TestCard threshold={0.1} triggerOnce={true} />
        <TestCard threshold={0.5} triggerOnce={true} />
        <TestCard threshold={0.1} triggerOnce={false} />
      </div>

      {/* Status display */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold mb-2">Motion Preferences:</h2>
          <p>
            <code>prefers-reduced-motion</code>:{' '}
            {typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'reduce'
              : 'no-preference'}
          </p>
        </div>
      </div>
    </div>
  );
}
