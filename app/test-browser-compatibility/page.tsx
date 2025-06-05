'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function TestBrowserCompatibility(): React.ReactNode {
  const [browserInfo, setBrowserInfo] = useState<{
    userAgent: string;
    vendor: string;
    cookieEnabled: boolean;
    onLine: boolean;
    language: string;
  } | null>(null);

  const [cssSupport, setCssSupport] = useState<{
    customProperties: boolean;
    colorMix: boolean;
    cssLayers: boolean;
    intersectionObserver: boolean;
  }>({
    customProperties: false,
    colorMix: false,
    cssLayers: false,
    intersectionObserver: false,
  });

  useEffect(() => {
    // Get browser information
    setBrowserInfo({
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      language: navigator.language,
    });

    // Test CSS feature support
    const testElement = document.createElement('div');
    testElement.style.cssText = '--test: 1px';

    setCssSupport({
      customProperties: testElement.style.getPropertyValue('--test') === '1px',
      colorMix: CSS.supports('background-color', 'color-mix(in srgb, red 50%, blue)'),
      cssLayers: CSS.supports('@supports selector(@layer)'),
      intersectionObserver: 'IntersectionObserver' in window,
    });
  }, []);

  return (
    <div className="py-8">
      <Container>
        <div className="space-y-12">
          <h1 className="typography-display text-gray-900 mb-8">Browser Compatibility Test Page</h1>

          {/* Browser Information */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Browser Information</h2>
            {browserInfo && (
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-2">
                <div>
                  <strong>User Agent:</strong> {browserInfo.userAgent}
                </div>
                <div>
                  <strong>Vendor:</strong> {browserInfo.vendor}
                </div>
                <div>
                  <strong>Language:</strong> {browserInfo.language}
                </div>
                <div>
                  <strong>Cookies:</strong> {browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}
                </div>
                <div>
                  <strong>Online:</strong> {browserInfo.onLine ? 'Yes' : 'No'}
                </div>
              </div>
            )}
          </section>

          {/* CSS Feature Support */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">CSS Feature Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(cssSupport).map(([feature, supported]) => (
                <div
                  key={feature}
                  className={`p-4 rounded-lg border-2 ${
                    supported
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                  }`}
                >
                  <div className="font-semibold">
                    {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm">{supported ? '✅ Supported' : '❌ Not Supported'}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography System Test */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Typography System</h2>
            <div className="space-y-4">
              <div>
                <p className="typography-caption text-gray-500 mb-2">
                  Display Typography (Hero text)
                </p>
                <h1 className="typography-display text-gray-900">Display Text Example</h1>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">Headline Typography</p>
                <h2 className="typography-headline text-gray-900">Headline Text Example</h2>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">Title Typography</p>
                <h3 className="typography-title text-gray-900">Title Text Example</h3>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">Body Large Typography</p>
                <p className="typography-body-large text-gray-600">
                  This is large body text that should scale responsively and maintain proper line
                  height.
                </p>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">Body Typography</p>
                <p className="typography-body text-gray-600">
                  This is standard body text used throughout the application.
                </p>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">Caption Typography</p>
                <p className="typography-caption text-gray-500">
                  This is caption text for labels and metadata.
                </p>
              </div>
            </div>
          </section>

          {/* Button System Test */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Button System</h2>
            <div className="space-y-6">
              <div>
                <p className="typography-caption text-gray-500 mb-4">Button Sizes</p>
                <div className="flex flex-wrap gap-4">
                  <Button size="small">Small Button</Button>
                  <Button size="default">Default Button</Button>
                  <Button size="large">Large Button</Button>
                </div>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-4">Button States</p>
                <div className="flex flex-wrap gap-4">
                  <Button>Normal State</Button>
                  <Button loading>Loading State</Button>
                  <Button disabled>Disabled State</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Color System Test */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Color System</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-bitcoin-button rounded-lg"></div>
                <p className="typography-caption text-center">Bitcoin Button</p>
              </div>

              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-50 border rounded-lg"></div>
                <p className="typography-caption text-center">Surface</p>
              </div>

              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-900 rounded-lg"></div>
                <p className="typography-caption text-center text-gray-900">Primary Text</p>
              </div>

              <div className="space-y-2">
                <div className="w-full h-16 bg-gray-600 rounded-lg"></div>
                <p className="typography-caption text-center text-gray-600">Secondary Text</p>
              </div>
            </div>
          </section>

          {/* Advanced CSS Features Test */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Advanced CSS Features</h2>

            <div className="space-y-4">
              <div>
                <p className="typography-caption text-gray-500 mb-2">CSS Custom Properties Test</p>
                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  This box uses CSS custom properties for colors.
                </div>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">color-mix() Function Test</p>
                <div className="p-4 rounded-lg bg-bitcoin-button text-white">
                  This button background uses color-mix() in its gradient.
                </div>
              </div>

              <div>
                <p className="typography-caption text-gray-500 mb-2">CSS Animation Test</p>
                <div className="w-16 h-16 bg-bitcoin-orange rounded-lg animate-pulse"></div>
              </div>
            </div>
          </section>

          {/* Manual Test Instructions */}
          <section className="space-y-4">
            <h2 className="typography-headline text-gray-900">Manual Test Checklist</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="typography-title text-blue-900 mb-4">Test Instructions</h3>
              <ul className="typography-body text-blue-800 space-y-2">
                <li>• Resize window to test responsive typography scaling</li>
                <li>• Hover over buttons to test transition effects</li>
                <li>• Use Tab key to test focus states</li>
                <li>• Test on mobile devices for touch interactions</li>
                <li>• Check font loading and FOUC behavior</li>
                <li>• Verify animations respect prefers-reduced-motion</li>
                <li>• Test with browser zoom at 200% and 50%</li>
                <li>• Check print styles (Ctrl/Cmd + P)</li>
              </ul>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
