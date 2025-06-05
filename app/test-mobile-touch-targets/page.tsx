'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Navigation from '@/components/Navigation';

export default function TestMobileTouchTargets(): React.ReactNode {
  const [currentTest, setCurrentTest] = useState<string>('overview');

  const testSections = {
    overview: 'Touch Target Overview',
    buttons: 'Button Touch Targets',
    navigation: 'Navigation Touch Targets',
    spacing: 'Mobile Spacing Tests',
    oneHanded: 'One-Handed Usage Tests',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20 pb-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Mobile Touch Targets & Interactions Test
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Testing WCAG AA compliant touch targets (44px minimum), thumb-friendly spacing, and
                one-handed mobile usage patterns.
              </p>
            </header>

            {/* Test Navigation */}
            <nav className="mb-8 bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(testSections).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentTest(key)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      min-h-[44px] min-w-[44px] touch-target-optimized
                      ${
                        currentTest === key
                          ? 'bg-bitcoin-orange text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Test Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              {currentTest === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Touch Target Guidelines</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">
                        ✅ Current Implementation
                      </h3>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• WCAG AA 44px minimum touch targets</li>
                        <li>• Responsive button padding</li>
                        <li>• Touch-friendly spacing utilities</li>
                        <li>• Mobile button spacing classes</li>
                        <li>• Thumb-friendly positioning</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">🎯 Testing Areas</h3>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• Interactive element spacing</li>
                        <li>• One-handed thumb reach zones</li>
                        <li>• Navigation touch targets</li>
                        <li>• Button grouping and spacing</li>
                        <li>• Conversion demo interaction</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-800 mb-2">📱 Mobile Usage Patterns</h3>
                    <p className="text-amber-700 text-sm">
                      Test this page on actual mobile devices to verify thumb reach zones,
                      especially focusing on one-handed usage scenarios where the thumb comfortable
                      reach is typically in the bottom 2/3 of the screen.
                    </p>
                  </div>
                </div>
              )}

              {currentTest === 'buttons' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Button Touch Target Tests</h2>

                  <div className="grid gap-6">
                    {/* Button Size Tests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Button Sizes & Touch Targets
                      </h3>
                      <div className="flex flex-wrap gap-4 items-end">
                        <div className="text-center">
                          <Button size="small" className="mb-2">
                            Small Button
                          </Button>
                          <p className="text-xs text-gray-600">Min: 44px height</p>
                        </div>
                        <div className="text-center">
                          <Button size="default" className="mb-2">
                            Default Button
                          </Button>
                          <p className="text-xs text-gray-600">Min: 48px height</p>
                        </div>
                        <div className="text-center">
                          <Button size="large" className="mb-2">
                            Large Button
                          </Button>
                          <p className="text-xs text-gray-600">Min: 56px height</p>
                        </div>
                      </div>
                    </div>

                    {/* Button Spacing Tests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Button Spacing & Grouping
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Horizontal Button Group
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <Button size="small">Action 1</Button>
                            <Button size="small">Action 2</Button>
                            <Button size="small">Action 3</Button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Vertical Button Stack
                          </h4>
                          <div className="flex flex-col space-y-3 max-w-xs">
                            <Button>Primary Action</Button>
                            <Button>Secondary Action</Button>
                            <Button>Tertiary Action</Button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Mobile-Optimized Spacing
                          </h4>
                          <div className="mobile-button-spacing space-y-2">
                            <Button className="w-full">Full Width Button</Button>
                            <Button className="w-full">Another Full Width</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentTest === 'navigation' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Navigation Touch Targets</h2>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Fixed Navigation Analysis
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Current Navigation Specs:
                          </h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• Height: 64px (4rem)</li>
                            <li>• Logo: 32px touch target</li>
                            <li>• Button: WCAG AA compliant</li>
                            <li>• Fixed positioning for accessibility</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Mobile Considerations:</h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• Top-aligned for thumb reach</li>
                            <li>• Adequate spacing between elements</li>
                            <li>• Backdrop blur for visual clarity</li>
                            <li>• Brand recognition in limited space</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Navigation Touch Test</h4>
                      <p className="text-amber-700 text-sm mb-3">
                        The navigation is fixed at the top of the screen. Test the &ldquo;Add to
                        Chrome&rdquo; button touch target by trying to tap it with your thumb on
                        mobile devices.
                      </p>
                      <p className="text-amber-700 text-sm">
                        ✅ Expected: Easy to tap without accidental touches
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentTest === 'spacing' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mobile Spacing Tests</h2>

                  <div className="space-y-6">
                    {/* Interactive Element Spacing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Interactive Element Spacing
                      </h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">Close Proximity Test</h4>
                        <p className="text-blue-700 text-sm mb-4">
                          Test tapping these closely spaced interactive elements without accidental
                          touches:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <button className="bg-blue-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 1
                          </button>
                          <button className="bg-blue-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 2
                          </button>
                          <button className="bg-blue-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 3
                          </button>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-3">Proper Spacing Test</h4>
                        <p className="text-green-700 text-sm mb-4">
                          These elements have proper mobile spacing (8px minimum between touch
                          targets):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button className="bg-green-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 1
                          </button>
                          <button className="bg-green-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 2
                          </button>
                          <button className="bg-green-500 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm">
                            Btn 3
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content Spacing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Content & Section Spacing
                      </h3>

                      <div className="grid gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Mobile Viewport Padding
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Test scrolling and content readability with mobile-specific padding
                            utilities:
                            <code className="bg-white px-1 rounded ml-1">
                              mobile-viewport-padding
                            </code>
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Responsive Section Padding
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Sections adapt spacing from mobile (3rem) to desktop (6rem):
                            <code className="bg-white px-1 rounded ml-1">
                              responsive-section-padding
                            </code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentTest === 'oneHanded' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">One-Handed Usage Tests</h2>

                  <div className="space-y-6">
                    {/* Thumb Reach Zone */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Thumb Reach Zone Analysis
                      </h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">📱 Mobile Screen Zones</h4>
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>Easy reach:</strong> Bottom 1/3 of screen (primary actions)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>Moderate reach:</strong> Middle 1/3 of screen (secondary
                              content)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>Hard reach:</strong> Top 1/3 of screen (navigation only)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-3">
                          ✅ Current Implementation
                        </h4>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Primary CTA buttons positioned in easy reach zone</li>
                          <li>
                            •{' '}
                            <code className="bg-white px-1 rounded">
                              thumb-friendly-positioning
                            </code>{' '}
                            utility used
                          </li>
                          <li>• Navigation fixed at top (standard pattern)</li>
                          <li>• Extra bottom padding for thumb comfort</li>
                        </ul>
                      </div>
                    </div>

                    {/* Test Interactive Elements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Interactive Element Positioning
                      </h3>

                      <div className="space-y-4">
                        {/* Primary Action Zone */}
                        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 mb-3">
                            🟢 Primary Action Zone (Easy Reach)
                          </h4>
                          <div className="thumb-friendly-positioning">
                            <Button size="large" className="w-full sm:w-auto">
                              Primary Action Button
                            </Button>
                          </div>
                          <p className="text-green-700 text-sm mt-2">
                            This button should be easy to reach with your thumb when holding the
                            phone with one hand.
                          </p>
                        </div>

                        {/* Secondary Action Zone */}
                        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-800 mb-3">
                            🟡 Secondary Zone (Moderate Reach)
                          </h4>
                          <div className="flex justify-center space-x-4">
                            <Button size="default">Secondary</Button>
                            <Button size="default">Actions</Button>
                          </div>
                          <p className="text-yellow-700 text-sm mt-2">
                            These buttons require slight thumb stretching but should still be
                            accessible.
                          </p>
                        </div>

                        {/* Navigation Zone */}
                        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 mb-3">
                            🔴 Navigation Zone (Hard Reach)
                          </h4>
                          <div className="text-center">
                            <p className="text-red-700 text-sm">
                              The fixed navigation at the top requires two-handed interaction or
                              repositioning the device. This is acceptable for secondary navigation
                              elements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar Simulation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Bottom Action Bar Test
                      </h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">
                          📱 Simulated Bottom Actions
                        </h4>
                        <p className="text-blue-700 text-sm mb-4">
                          This simulates how primary actions would feel in the bottom safe area:
                        </p>
                        <div className="flex justify-center space-x-3 pb-4">
                          <Button className="touch-target-optimized">Share</Button>
                          <Button className="touch-target-optimized">Save</Button>
                          <Button className="touch-target-optimized">Install</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Implementation Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Status</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">✅ Already Implemented</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• WCAG AA 44px minimum touch targets</li>
                    <li>• Responsive button padding system</li>
                    <li>• Touch-friendly spacing utilities</li>
                    <li>• Mobile button spacing classes</li>
                    <li>• Thumb-friendly positioning utility</li>
                    <li>• Mobile viewport padding system</li>
                    <li>• Responsive section padding</li>
                    <li>• One-handed optimization classes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-800 mb-3">🎯 Focus Areas</h3>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li>• Test actual thumb reach on real devices</li>
                    <li>• Verify button grouping spacing</li>
                    <li>• Validate conversion demo touch target</li>
                    <li>• Check navigation button accessibility</li>
                    <li>• Optimize for various device sizes</li>
                    <li>• Test one-handed interaction patterns</li>
                    <li>• Ensure consistent spacing application</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
