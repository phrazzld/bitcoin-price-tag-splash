'use client';

import React from 'react';

export default function TestPageFadeInPage(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-50 p-6 fade-in">
      <header className="relative z-10 mb-12">
        <h1 className="text-3xl font-bold text-center">Page Fade-In Test</h1>
        <p className="text-center text-gray-600 mt-2">
          Testing CSS-only fade-in animation for the main page
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Test container with the fade-in animation */}
        <div className="p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Fade-In Animation</h2>
          <p className="text-gray-700 mb-6">
            This page demonstrates the pure CSS fade-in animation technique that replaces the Framer
            Motion animation in the main app/page.tsx file. The animation triggers automatically on
            page load using CSS animations without any JavaScript.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Implementation Details</h3>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>
                Uses the <code>fade-in</code> CSS class from globals.css
              </li>
              <li>
                CSS animation starts with <code>opacity: 0</code> and animates to{' '}
                <code>opacity: 1</code>
              </li>
              <li>Animation triggers immediately on page load via pure CSS</li>
              <li>No JavaScript required for the animation</li>
              <li>Automatically respects the user&apos;s reduced motion preferences</li>
            </ul>
          </div>
        </div>

        {/* Motion preferences display */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Reduced Motion Support</h3>
          <p className="text-sm">
            This animation respects the user&apos;s motion preferences. When{' '}
            <code>prefers-reduced-motion: reduce</code> is set, animations will be minimized via the
            global CSS media query in globals.css.
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
    </div>
  );
}
