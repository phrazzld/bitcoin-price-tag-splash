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
            {/* Button Sizes */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Button Sizes</h2>
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <Button size="small">Small Button</Button>
                <Button size="default">Default Button</Button>
                <Button size="large">Large Button</Button>
              </div>
              <p className="mt-4 text-gray-600">
                Three size variants following 8pt grid system with responsive scaling
              </p>
            </section>

            {/* Normal Button States */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Interactive States</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                <Button>Normal Button</Button>
                <Button disabled>Disabled Button</Button>
                <Button href="https://example.com">Link Button</Button>
              </div>
              <p className="mt-4 text-gray-600">
                Hover, focus (tab), and click to test interaction states
              </p>
            </section>

            {/* Loading States with Sizes */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Loading States</h2>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  <Button
                    size="small"
                    loading={loadingStates.button1}
                    onClick={() => handleLoadingDemo('button1')}
                  >
                    {loadingStates.button1 ? 'Loading...' : 'Small Loading'}
                  </Button>

                  <Button
                    loading={loadingStates.button2}
                    onClick={() => handleLoadingDemo('button2')}
                  >
                    {loadingStates.button2 ? 'Processing...' : 'Default Loading'}
                  </Button>

                  <Button
                    size="large"
                    loading={loadingStates.button3}
                    onClick={() => handleLoadingDemo('button3')}
                  >
                    {loadingStates.button3 ? 'Working...' : 'Large Loading'}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                  <Button size="small" loading={true}>
                    Small Always Loading
                  </Button>
                  <Button loading={true}>Default Always Loading</Button>
                  <Button size="large" loading={true}>
                    Large Always Loading
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                Click buttons to see 3-second loading states with size-appropriate spinners
              </p>
            </section>

            {/* State Details */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Implementation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 text-gray-800">Size System</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • <strong>Small:</strong> 40px-44px height, 8px border radius
                    </li>
                    <li>
                      • <strong>Default:</strong> 48px-52px height, 12px border radius
                    </li>
                    <li>
                      • <strong>Large:</strong> 56px-60px height, 16px border radius
                    </li>
                    <li>
                      • <strong>8pt Grid:</strong> All spacing follows 8px increments
                    </li>
                  </ul>
                </div>

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
                      • <strong>Size-matched Spinners:</strong> Proportional indicators
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

            {/* Spacing Demonstration */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Spacing & Layout</h2>
              <div className="space-y-6">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    External Margins (mx-1)
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    <Button size="small">Button 1</Button>
                    <Button>Button 2</Button>
                    <Button size="large">Button 3</Button>
                    <Button>Button 4</Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Buttons automatically have 4px horizontal margins for proper spacing
                  </p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Responsive Padding & Font Sizes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="small">Small: 16px→24px padding</Button>
                      <Button>Default: 24px→32px padding</Button>
                      <Button size="large">Large: 32px→40px padding</Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Padding and font sizes scale up on desktop (md: breakpoint)
                  </p>
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
                    • <strong>Touch Targets:</strong> All sizes meet minimum accessibility
                    requirements
                  </li>
                  <li>
                    • <strong>Responsive Design:</strong> Buttons scale appropriately across devices
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
