'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function TestButtonStates(): React.JSX.Element {
  const [loadingStates, setLoadingStates] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  const handleLoadingDemo = (buttonKey: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [buttonKey]: true }));

    // Simulate async operation
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonKey]: false }));
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Button States Test</h1>

          <div className="space-y-16">
            {/* Normal Button States */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Normal States</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                <Button>Normal Button</Button>
                <Button disabled>Disabled Button</Button>
                <Button href="https://example.com">Link Button</Button>
              </div>
              <p className="mt-4 text-gray-600">
                Hover, focus (tab), and click to test interaction states
              </p>
            </section>

            {/* Loading States */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Loading States</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                <Button
                  loading={loadingStates.button1}
                  onClick={() => handleLoadingDemo('button1')}
                >
                  {loadingStates.button1 ? 'Processing...' : 'Click to Load'}
                </Button>

                <Button
                  loading={loadingStates.button2}
                  href="https://example.com"
                  onClick={() => handleLoadingDemo('button2')}
                >
                  {loadingStates.button2 ? 'Navigating...' : 'Link with Loading'}
                </Button>

                <Button loading={true}>Always Loading</Button>
              </div>
              <p className="mt-4 text-gray-600">
                Click buttons to see 3-second loading states with spinner
              </p>
            </section>

            {/* State Combinations */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">State Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 text-gray-800">Interactive States</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • <strong>Hover:</strong> Elevates with gradient shift and shadow
                    </li>
                    <li>
                      • <strong>Focus:</strong> Orange outline for keyboard navigation
                    </li>
                    <li>
                      • <strong>Active:</strong> Pressed state with reduced elevation
                    </li>
                    <li>
                      • <strong>Disabled:</strong> Reduced opacity, no interactions
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 text-gray-800">Loading Features</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • <strong>Spinner:</strong> Animated loading indicator
                    </li>
                    <li>
                      • <strong>Text Fade:</strong> Content becomes semi-transparent
                    </li>
                    <li>
                      • <strong>Click Prevention:</strong> No actions when loading
                    </li>
                    <li>
                      • <strong>Accessibility:</strong> Proper ARIA attributes
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Accessibility Notes */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Accessibility Features</h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-left">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Keyboard Navigation:</strong> Tab through buttons, Enter/Space to
                    activate
                  </li>
                  <li>
                    • <strong>Screen Reader:</strong> Proper aria-disabled states for loading
                  </li>
                  <li>
                    • <strong>Motion Reduction:</strong> Respects prefers-reduced-motion setting
                  </li>
                  <li>
                    • <strong>High Contrast:</strong> Focus outlines and color combinations meet
                    WCAG AA
                  </li>
                  <li>
                    • <strong>Touch Targets:</strong> Minimum 48px height for mobile accessibility
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
