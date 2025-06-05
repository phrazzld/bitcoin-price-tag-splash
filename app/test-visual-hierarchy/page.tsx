'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function TestVisualHierarchy(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Enhanced Visual Hierarchy & Emphasis
          </h1>
          <p className="text-center text-gray-700 mb-16 text-lg">
            Improved visual flow and attention guidance following Swiss minimalism principles
          </p>

          <div className="space-y-16">
            {/* Visual Hierarchy Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">Visual Flow Analysis</h2>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border">
                <div className="space-y-8">
                  {/* Step 1: Headline */}
                  <div className="text-center">
                    <div className="inline-block bg-blue-100 px-4 py-2 rounded-full text-blue-800 text-sm font-medium mb-4">
                      Step 1: Attention Capture
                    </div>
                    <h3 className="text-4xl font-black leading-tight tracking-tight text-gray-900">
                      See Bitcoin prices{' '}
                      <span className="text-bitcoin-orange font-extrabold">everywhere</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Enhanced typography hierarchy with emphasized accent word
                    </p>
                  </div>

                  {/* Step 2: Demo Focus */}
                  <div className="text-center">
                    <div className="inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-800 text-sm font-medium mb-4">
                      Step 2: Product Demonstration
                    </div>
                    <div className="inline-block bg-white border-2 border-dashed border-bitcoin-orange p-6 rounded-lg">
                      <p className="text-lg font-mono text-gray-700 mb-2">
                        $99.99 → 0.00234584 BTC
                      </p>
                      <p className="text-xs text-gray-500">
                        Enhanced with subtle animations & depth
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Prominent conversion demo with enhanced shadows and hover effects
                    </p>
                  </div>

                  {/* Step 3: Value Proposition */}
                  <div className="text-center">
                    <div className="inline-block bg-green-100 px-4 py-2 rounded-full text-green-800 text-sm font-medium mb-4">
                      Step 3: Value Communication
                    </div>
                    <p className="text-lg text-gray-600 opacity-90 font-normal max-w-md mx-auto">
                      Convert any price to Bitcoin automatically while you browse
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Refined typography with reduced visual weight for supporting role
                    </p>
                  </div>

                  {/* Step 4: Call to Action */}
                  <div className="text-center">
                    <div className="inline-block bg-purple-100 px-4 py-2 rounded-full text-purple-800 text-sm font-medium mb-4">
                      Step 4: Action Trigger
                    </div>
                    <Button size="large">Add to Chrome</Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Large, prominent CTA button for maximum conversion potential
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhancement Details */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">Enhancement Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-gray-800">Bitcoin Amount Display</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>
                      • <strong>Enhanced Shadows:</strong> Multi-layer depth with orange accents
                    </li>
                    <li>
                      • <strong>Hover Effects:</strong> Subtle lift animation on interaction
                    </li>
                    <li>
                      • <strong>Shimmer Animation:</strong> Bitcoin text gradient effect
                    </li>
                    <li>
                      • <strong>Attention Pulse:</strong> Periodic subtle glow every 12 seconds
                    </li>
                    <li>
                      • <strong>Responsive Scaling:</strong> Progressive enhancement across
                      breakpoints
                    </li>
                  </ul>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-gray-800">Typography Hierarchy</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>
                      • <strong>Headline Emphasis:</strong> Enhanced accent word with font-extrabold
                    </li>
                    <li>
                      • <strong>Description Refinement:</strong> Reduced visual weight and opacity
                    </li>
                    <li>
                      • <strong>Improved Spacing:</strong> Tighter vertical rhythm for better flow
                    </li>
                    <li>
                      • <strong>CTA Prominence:</strong> Large button size for maximum impact
                    </li>
                    <li>
                      • <strong>Width Optimization:</strong> Narrower description for focus
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Accessibility Considerations */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                Accessibility & Performance
              </h2>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-green-900">Accessibility Features</h3>
                <ul className="space-y-2 text-green-800">
                  <li>
                    • <strong>Reduced Motion Support:</strong> All animations disabled for
                    prefers-reduced-motion
                  </li>
                  <li>
                    • <strong>Keyboard Navigation:</strong> Conversion demo remains focusable and
                    interactive
                  </li>
                  <li>
                    • <strong>Screen Reader Friendly:</strong> Semantic structure maintained with
                    ARIA labels
                  </li>
                  <li>
                    • <strong>High Contrast:</strong> All text combinations meet WCAG AA standards
                  </li>
                  <li>
                    • <strong>Progressive Enhancement:</strong> Core functionality works without
                    animations
                  </li>
                </ul>
              </div>
            </section>

            {/* Swiss Minimalism Adherence */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                Swiss Minimalism Principles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h4 className="font-semibold mb-2">Purposeful Enhancement</h4>
                  <p className="text-sm text-gray-600">
                    Every visual effect serves a specific functional purpose in guiding user
                    attention
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2">Subtle Sophistication</h4>
                  <p className="text-sm text-gray-600">
                    Refined visual effects that enhance without overwhelming or distracting
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📐</span>
                  </div>
                  <h4 className="font-semibold mb-2">Systematic Approach</h4>
                  <p className="text-sm text-gray-600">
                    Consistent 8pt grid spacing and methodical application of visual principles
                  </p>
                </div>
              </div>
            </section>

            {/* Interactive Demo */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                Interactive Demonstration
              </h2>

              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-center text-gray-600 mb-8">
                  Try hovering over elements to see the enhanced interaction effects:
                </p>

                <div className="space-y-8 text-center">
                  <div className="inline-block p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Enhanced <span className="text-bitcoin-orange">Typography</span>
                    </h4>
                    <p className="text-gray-600">Hover to see depth effects</p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button size="small">Small CTA</Button>
                    <Button>Default CTA</Button>
                    <Button size="large">Large CTA</Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
