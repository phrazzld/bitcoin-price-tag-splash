'use client';

import React from 'react';
import ScrollReveal from '@/components/animation/ScrollReveal';

export default function TestScrollReveal(): React.ReactNode {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Scroll Reveal Test</h1>

      <div className="space-y-32">
        <div className="h-[70vh] flex items-center justify-center bg-gray-100">
          <p className="text-2xl">Scroll down to see animations</p>
        </div>

        <ScrollReveal>
          <div className="p-8 bg-blue-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">First Section</h2>
            <p>This section will fade in from below as you scroll (default configuration)</p>
          </div>
        </ScrollReveal>

        <ScrollReveal duration="short">
          <div className="p-8 bg-green-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Second Section</h2>
            <p>This section has a shorter animation duration</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay="short">
          <div className="p-8 bg-purple-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Third Section</h2>
            <p>This section has a slight delay before animating</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold={0.5} triggerOnce={false}>
          <div className="p-8 bg-orange-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Final Section</h2>
            <p>
              This section uses a higher threshold (0.5) and will animate each time it enters the
              viewport (triggerOnce: false)
            </p>
          </div>
        </ScrollReveal>

        <div className="p-8 bg-white rounded-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Implementation Details</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Using CSS transitions via <code>scroll-reveal-initial</code> and{' '}
              <code>scroll-reveal-final</code> classes
            </li>
            <li>
              Powered by custom <code>useIntersectionObserver</code> hook
            </li>
            <li>Supports configurable threshold, duration, and delay</li>
            <li>
              Automatically respects <code>prefers-reduced-motion</code>
            </li>
            <li>No JavaScript animation libraries needed</li>
          </ul>
        </div>
      </div>

      {/* Status display */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
        <div className="max-w-3xl mx-auto">
          <p>
            <strong>Motion Preferences:</strong>{' '}
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
