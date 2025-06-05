'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function TestAccessibilityNavigation(): React.JSX.Element {
  const [logEntries, setLogEntries] = useState<string[]>([]);

  const addLogEntry = (message: string) => {
    setLogEntries((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleSkipLinkTest = () => {
    addLogEntry('Skip link activated - should jump to main content');
  };

  const handleDemoInteraction = () => {
    addLogEntry('Conversion demo button activated');
  };

  return (
    <>
      {/* Skip Navigation Link Test */}
      <a
        href="#main-content-test"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:border-2 focus:border-bitcoin-orange focus:rounded focus:font-medium focus:shadow-lg"
        onClick={handleSkipLinkTest}
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content-test" className="pt-24 pb-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Comprehensive Accessibility & Keyboard Navigation Test
            </h1>
            <p className="text-center text-gray-700 mb-16 text-lg">
              Enhanced focus states, ARIA labels, and screen reader compatibility testing
            </p>

            <div className="space-y-16">
              {/* Skip Navigation Test */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Skip Navigation Test</h2>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-blue-900">Test Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    <li>
                      Press Tab from the address bar - the first focused element should be
                      &ldquo;Skip to main content&rdquo;
                    </li>
                    <li>Press Enter on the skip link - it should jump to the main content area</li>
                    <li>Verify that the skip link is visually hidden until focused</li>
                    <li>Confirm the skip link has proper styling and positioning when focused</li>
                  </ol>
                </div>
              </section>

              {/* Enhanced Focus States */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Enhanced Focus States</h2>

                <div className="space-y-8">
                  {/* Button Focus Tests */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-gray-800">Button Focus Indicators</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Button size="small">Small Button</Button>
                      <Button>Default Button</Button>
                      <Button size="large">Large Button</Button>
                      <Button loading={true}>Loading Button</Button>
                      <Button disabled>Disabled Button</Button>
                    </div>
                    <p className="text-sm text-gray-600">
                      ✓ All buttons should show orange focus ring when tabbed to
                      <br />
                      ✓ Focus ring should be visible during hover and active states
                      <br />✓ Loading and disabled buttons should still be focusable with proper
                      indicators
                    </p>
                  </div>

                  {/* Conversion Demo Focus Test */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-gray-800">
                      Conversion Demo Focus State
                    </h3>
                    <div className="text-center mb-4">
                      <div
                        className="inline-block bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg relative"
                        tabIndex={0}
                        role="button"
                        aria-label="Interactive price conversion demonstration: Click to see how $99.99 converts to Bitcoin"
                        aria-describedby="demo-help"
                        onClick={handleDemoInteraction}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleDemoInteraction();
                          }
                        }}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px white, 0 0 0 6px #c77518, 0 0 0 8px rgba(199, 117, 24, 0.2)';
                          e.currentTarget.style.borderRadius = '16px';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span className="text-2xl font-mono font-bold text-gray-700">
                          $99.99 → 0.00234584 BTC
                        </span>
                      </div>
                      <div id="demo-help" className="sr-only">
                        This interactive demonstration shows how the Bitcoin Price Tag extension
                        works. Press Enter or Space to activate this demo.
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      ✓ Conversion demo should show enhanced triple-ring focus indicator
                      <br />
                      ✓ Focus ring should be white inner, orange middle, semi-transparent outer
                      <br />
                      ✓ Should have proper ARIA labels and descriptions for screen readers
                      <br />✓ Should respond to Enter and Space key activation
                    </p>
                  </div>
                </div>
              </section>

              {/* Tab Order Test */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Tab Order Validation</h2>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-green-900">Expected Tab Order</h3>
                  <ol className="list-decimal list-inside space-y-1 text-green-800">
                    <li>Skip navigation link (when tabbed from address bar)</li>
                    <li>Navigation: &ldquo;Add to Chrome&rdquo; button</li>
                    <li>Main content: Conversion demo button</li>
                    <li>Main content: Primary CTA button</li>
                    <li>Additional page content (if present)</li>
                  </ol>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2 text-green-900">Tab Order Test Elements:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button
                        className="p-3 bg-white border border-green-300 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Test element 1"
                      >
                        Element 1
                      </button>
                      <button
                        className="p-3 bg-white border border-green-300 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Test element 2"
                      >
                        Element 2
                      </button>
                      <button
                        className="p-3 bg-white border border-green-300 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Test element 3"
                      >
                        Element 3
                      </button>
                      <button
                        className="p-3 bg-white border border-green-300 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Test element 4"
                      >
                        Element 4
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* ARIA and Screen Reader Tests */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  ARIA & Screen Reader Compatibility
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-purple-900">Semantic Structure</h3>
                    <ul className="space-y-2 text-purple-800 text-sm">
                      <li>
                        ✓ <strong>nav</strong> element with aria-label=&ldquo;Main navigation&rdquo;
                      </li>
                      <li>
                        ✓ <strong>main</strong> element with id=&ldquo;main-content&rdquo;
                      </li>
                      <li>
                        ✓ <strong>section</strong> elements with aria-labelledby/describedby
                      </li>
                      <li>
                        ✓ <strong>h1-h6</strong> proper heading hierarchy
                      </li>
                      <li>
                        ✓ <strong>button</strong> elements with descriptive aria-labels
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-purple-900">ARIA Enhancements</h3>
                    <ul className="space-y-2 text-purple-800 text-sm">
                      <li>
                        ✓ <strong>aria-label</strong> for interactive elements
                      </li>
                      <li>
                        ✓ <strong>aria-describedby</strong> for additional context
                      </li>
                      <li>
                        ✓ <strong>aria-hidden</strong> for decorative elements
                      </li>
                      <li>
                        ✓ <strong>role=&ldquo;button&rdquo;</strong> for custom interactive elements
                      </li>
                      <li>
                        ✓ <strong>sr-only</strong> for screen reader only content
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Screen Reader Instructions */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Screen Reader Testing</h2>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-yellow-900">Testing Instructions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 text-yellow-900">macOS VoiceOver</h4>
                      <p className="text-sm text-yellow-800">
                        Command + F5 to toggle
                        <br />
                        Control + Option + Arrow keys to navigate
                        <br />
                        Control + Option + Space to activate
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-yellow-900">Windows NVDA</h4>
                      <p className="text-sm text-yellow-800">
                        Control + Alt + N to start
                        <br />
                        Arrow keys to navigate
                        <br />
                        Enter or Space to activate
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-yellow-900">Expected Behavior</h4>
                      <p className="text-sm text-yellow-800">
                        All interactive elements announced
                        <br />
                        Proper role and state information
                        <br />
                        Logical reading order maintained
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Activity Log */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Interaction Log</h2>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-gray-800">Activity Log:</h3>
                  <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto">
                    {logEntries.length === 0 ? (
                      <p className="text-gray-500 text-sm">No interactions logged yet...</p>
                    ) : (
                      logEntries.map((entry, index) => (
                        <div key={index} className="text-sm font-mono text-gray-700 mb-1">
                          {entry}
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => setLogEntries([])}
                    className="mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear log
                  </button>
                </div>
              </section>

              {/* Compliance Summary */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  WCAG 2.1 AA Compliance Summary
                </h2>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-green-900">✅ Keyboard Navigation</h3>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• All interactive elements keyboard accessible</li>
                        <li>• Logical tab order maintained</li>
                        <li>• Skip navigation link implemented</li>
                        <li>• Custom focus indicators meet contrast requirements</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-green-900">
                        ✅ Screen Reader Support
                      </h3>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Semantic HTML structure maintained</li>
                        <li>• ARIA labels and descriptions provided</li>
                        <li>• Decorative elements properly hidden</li>
                        <li>• Context and instructions available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
