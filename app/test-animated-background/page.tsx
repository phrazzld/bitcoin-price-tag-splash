'use client';

import React from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function TestAnimatedBackgroundPage(): React.ReactNode {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Component */}
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 p-6">
        <h1 className="text-3xl font-bold text-center">AnimatedBackground Component Test</h1>
        <p className="text-center text-gray-600 mt-2">
          Testing CSS-only animations for the animated background
        </p>
      </header>

      {/* Content for visual comparison */}
      <main className="relative z-10 max-w-3xl mx-auto mt-16 p-6">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">CSS Animation Details</h2>
          <ul className="space-y-2">
            <li>
              <strong>First Orb:</strong> Using <code>float-orb-one</code> class with 20s animation
            </li>
            <li>
              <strong>Second Orb:</strong> Using <code>float-orb-two</code> class with 25s animation
            </li>
            <li>
              <strong>Easing:</strong> ease-in-out (matches original Framer Motion configuration)
            </li>
            <li>
              <strong>Initial Position:</strong> Preserved from original implementation
            </li>
          </ul>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Reduced Motion Support</h3>
            <p className="text-sm">
              This component respects the user&apos;s motion preferences. When{' '}
              <code>prefers-reduced-motion: reduce</code> is set, animations will be minimized via
              the global CSS media query in globals.css.
            </p>
            <p className="mt-4 text-sm">
              Current setting:{' '}
              <strong>
                {typeof window !== 'undefined' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'reduced motion'
                  : 'standard motion'}
              </strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
