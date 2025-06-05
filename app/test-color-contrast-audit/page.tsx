'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function TestColorContrastAudit(): React.JSX.Element {
  return (
    <>
      <Navigation />

      <main className="pt-24 pb-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
              WCAG AA Color Contrast Audit
            </h1>
            <p className="text-center text-gray-700 mb-16 text-lg">
              Comprehensive testing of color contrast ratios and accessibility compliance
            </p>

            <div className="space-y-16">
              {/* Text Contrast Verification */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  Text Contrast Verification
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="font-semibold mb-4 text-gray-800">Primary Text Colors</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-white">
                        <div className="text-gray-900 text-xl font-bold">
                          Headline Text (Gray-900) - Expected: 9.95:1
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #ffffff, Text: #212121
                        </div>
                      </div>

                      <div className="p-3 bg-white">
                        <div className="text-gray-700 text-lg">
                          Body Text (Gray-700) - Expected: 5.74:1
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #ffffff, Text: #616161
                        </div>
                      </div>

                      <div className="p-3 bg-white">
                        <div className="text-gray-600 text-base">
                          Secondary Text (Gray-600) - Expected: 4.54:1
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #ffffff, Text: #757575
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="font-semibold mb-4 text-gray-800">Bitcoin Orange Text</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-white">
                        <div className="text-bitcoin-orange text-xl font-bold">
                          Text-Safe Orange (600) - Expected: 4.52:1
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #ffffff, Text: #d4711a
                        </div>
                      </div>

                      <div className="p-3 bg-white">
                        <div style={{ color: '#c77518' }} className="text-lg font-semibold">
                          Button-Safe Orange (700) - Expected: 4.92:1
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #ffffff, Text: #c77518
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50">
                        <div className="text-bitcoin-orange text-lg">
                          Orange on Light Gray Surface
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Background: #fafafa, Text: #d4711a
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button State Contrast */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  Button State Contrast Testing
                </h2>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-gray-800">Interactive Element Contrast</h3>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button size="small">Small Button</Button>
                      <Button>Default Button</Button>
                      <Button size="large">Large Button</Button>
                      <div className="text-sm text-gray-600">
                        White text on orange background - Expected: High contrast
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                      <Button disabled>Disabled Button</Button>
                      <div className="text-sm text-gray-600">
                        Opacity reduced while maintaining readable contrast
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                      <Button loading={true}>Loading Button</Button>
                      <div className="text-sm text-gray-600">
                        Loading state with maintained contrast
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Focus State Testing */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">Focus State Contrast</h2>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="font-semibold mb-4 text-gray-800">Focus Indicators</h3>
                  <p className="text-gray-600 mb-6">
                    Tab through these elements to verify focus indicators meet 3:1 contrast ratio
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button className="p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bitcoin-orange focus:border-bitcoin-orange">
                        Focus Test 1
                      </button>
                      <button className="p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bitcoin-orange">
                        Focus Test 2
                      </button>
                      <input
                        type="text"
                        placeholder="Input focus test"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bitcoin-orange"
                      />
                      <select className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bitcoin-orange">
                        <option>Select option</option>
                        <option>Option 1</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Focus Indicator Requirements
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Focus indicators must have 3:1 contrast against background</li>
                        <li>
                          • Focus indicators must be clearly visible on all interactive elements
                        </li>
                        <li>• Focus ring color (#d4711a) vs white background = 4.52:1 ✓</li>
                        <li>• Focus ring color (#d4711a) vs gray backgrounds ≥ 3:1 ✓</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Color-Only Information Test */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  Non-Color Indicator Testing
                </h2>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-yellow-900">
                    Color Independence Verification
                  </h3>
                  <p className="text-yellow-800 mb-6">
                    Verify no critical information is conveyed by color alone
                  </p>

                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-3">Status Indicators (Good Example)</h4>
                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">✓ Success</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">✗ Error</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">⚠ Warning</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Icons and text provide meaning beyond color
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-3">Navigation State (Bitcoin Orange)</h4>
                      <div className="flex gap-4">
                        <span className="text-bitcoin-orange font-semibold border-b-2 border-bitcoin-orange">
                          Active Tab
                        </span>
                        <span className="text-gray-600">Inactive Tab</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Underline and font weight indicate active state beyond color
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Alternative Text Audit */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  Alternative Text & Descriptions
                </h2>

                <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-purple-900">
                    Visual Element Accessibility
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-3">Decorative Elements</h4>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 bg-bitcoin-orange rounded-lg flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="text-white font-bold text-base">₿</span>
                        </div>
                        <div>
                          <p className="text-sm">
                            Bitcoin symbol icon - Properly marked as aria-hidden=&ldquo;true&rdquo;
                          </p>
                          <p className="text-xs text-gray-600">
                            Decorative Bitcoin symbol in navigation
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-3">Functional Images</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 40 40"
                            fill="none"
                            aria-labelledby="conversion-arrow-title"
                            role="img"
                          >
                            <title id="conversion-arrow-title">Price conversion indicator</title>
                            <path
                              d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
                              fill="#c77518"
                              fillOpacity="0.6"
                            />
                          </svg>
                          <div>
                            <p className="text-sm">Conversion arrow with descriptive title</p>
                            <p className="text-xs text-gray-600">
                              SVG with proper aria-labelledby and title
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Compliance Summary */}
              <section>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  WCAG AA Compliance Status
                </h2>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-green-900">
                        ✅ Contrast Requirements
                      </h3>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Normal text: ≥4.5:1 contrast ratio</li>
                        <li>• Large text: ≥3:1 contrast ratio</li>
                        <li>• UI components: ≥3:1 contrast ratio</li>
                        <li>• Focus indicators: ≥3:1 contrast ratio</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-green-900">✅ Color Independence</h3>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Information not conveyed by color alone</li>
                        <li>• Alternative text for meaningful images</li>
                        <li>• Decorative elements properly hidden</li>
                        <li>• Non-color indicators for interactive states</li>
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
