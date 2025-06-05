'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import ConversionDemoWithLoading from '@/components/ui/ConversionDemoWithLoading';
import PageLoadOrchestrator from '@/components/ui/PageLoadOrchestrator';
import ScrollReveal from '@/components/animation/ScrollReveal';

export default function TestLoadingTransitions(): React.JSX.Element {
  const [showSkeletons, setShowSkeletons] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageOrchestration, setPageOrchestration] = useState(true);

  const handleButtonLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 3000);
  };

  const handleSkeletonDemo = () => {
    setShowSkeletons(true);
    setTimeout(() => setShowSkeletons(false), 2500);
  };

  const toggleOrchestration = () => {
    setPageOrchestration(!pageOrchestration);
    // Force page reload to see orchestration effect
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <PageLoadOrchestrator enableOrchestration={pageOrchestration}>
      <main className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="page-load-orchestra load-delay-1">
              <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 text-shadow-micro">
                Loading & Transition States Test
              </h1>
            </div>

            <div className="space-y-20">
              {/* Page Load Orchestration */}
              <div className="page-load-orchestra load-delay-2">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Page Load Orchestration
                  </h2>
                  <div className="surface-refined p-8 rounded-2xl">
                    <p className="mb-6 text-gray-600">
                      This page demonstrates orchestrated loading with staggered element reveals for
                      a polished experience.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button onClick={toggleOrchestration} className="elegant-transition">
                        {pageOrchestration ? 'Disable' : 'Enable'} Orchestration
                      </Button>
                      <Button
                        onClick={() => window.location.reload()}
                        className="elegant-transition"
                      >
                        Reload Page
                      </Button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Skeleton Loading States */}
              <div className="page-load-orchestra load-delay-3">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Skeleton Loading States
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="surface-elevated p-6 rounded-xl">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Text Skeleton</h3>
                      {showSkeletons ? (
                        <SkeletonLoader type="text" count={3} />
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-2">This is sample text content</p>
                          <p className="text-gray-600 mb-2">Multiple lines of content</p>
                          <p className="text-gray-600">With proper spacing</p>
                        </div>
                      )}
                    </div>

                    <div className="surface-elevated p-6 rounded-xl">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Large Text Skeleton</h3>
                      {showSkeletons ? (
                        <SkeletonLoader type="text-large" count={2} />
                      ) : (
                        <div>
                          <h4 className="text-xl font-semibold mb-2">Large Heading</h4>
                          <h4 className="text-xl font-semibold">Another Heading</h4>
                        </div>
                      )}
                    </div>

                    <div className="surface-elevated p-6 rounded-xl">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Button Skeleton</h3>
                      {showSkeletons ? (
                        <SkeletonLoader type="button" />
                      ) : (
                        <Button className="elegant-transition">Sample Button</Button>
                      )}
                    </div>

                    <div className="surface-elevated p-6 rounded-xl">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Custom Skeleton</h3>
                      {showSkeletons ? (
                        <SkeletonLoader
                          type="custom"
                          width="100%"
                          height="60px"
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="bg-bitcoin-orange text-white p-4 rounded-lg text-center">
                          Custom Content
                        </div>
                      )}
                    </div>
                  </div>

                  <Button onClick={handleSkeletonDemo} size="large" className="elegant-transition">
                    Trigger Skeleton Demo
                  </Button>
                </section>
              </div>

              {/* Conversion Demo with Loading */}
              <ScrollReveal delay="short">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Dynamic Content Loading
                  </h2>
                  <div className="surface-refined p-12 rounded-2xl">
                    <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
                      This demonstrates how skeleton loading can be used for dynamic content like
                      the conversion demo.
                    </p>
                    <ConversionDemoWithLoading initialLoadTime={2000} showSkeleton={true} />
                  </div>
                </section>
              </ScrollReveal>

              {/* Enhanced Button States */}
              <ScrollReveal delay="none">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Enhanced Interactive Elements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="surface-elevated p-8 rounded-xl">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Button States</h3>
                      <div className="space-y-4">
                        <Button
                          loading={buttonLoading}
                          onClick={handleButtonLoadingDemo}
                          className="elegant-transition w-full"
                        >
                          {buttonLoading ? 'Loading...' : 'Test Loading'}
                        </Button>
                        <Button className="elegant-transition interactive-refined w-full">
                          Enhanced Interactions
                        </Button>
                      </div>
                    </div>

                    <div className="surface-elevated p-8 rounded-xl elegant-transition">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Surface Transitions</h3>
                      <p className="text-gray-600">
                        This card demonstrates elegant hover transitions with refined interactive
                        feedback.
                      </p>
                    </div>

                    <div className="surface-elevated p-8 rounded-xl interactive-refined">
                      <h3 className="font-semibold mb-4 text-shadow-micro">Interactive Surface</h3>
                      <p className="text-gray-600">
                        Enhanced surface with sophisticated interaction states and smooth
                        transitions.
                      </p>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Scroll Reveal Enhancements */}
              <ScrollReveal delay="short" duration="long">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Enhanced Scroll Reveals
                  </h2>
                  <div className="surface-refined p-12 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-4 text-shadow-refined">
                      Sophisticated Content Reveal
                    </h3>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                      This section uses enhanced scroll reveal with content blur effects,
                      sophisticated timing, and purposeful animations that respect user preferences.
                      The reveal includes subtle filter effects and scaling for a premium feeling.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="surface-elevated p-6 rounded-xl content-reveal">
                          <h4 className="font-semibold mb-2">Feature {num}</h4>
                          <p className="text-gray-600 text-sm">
                            Each card reveals with sophisticated timing and elegant transitions.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Implementation Notes */}
              <ScrollReveal delay="none">
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                    Implementation Details
                  </h2>
                  <div className="surface-refined p-8 rounded-2xl text-left max-w-4xl mx-auto">
                    <h3 className="font-semibold mb-4 text-shadow-micro">
                      Enhanced Loading & Transition Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-bitcoin-orange">
                          Page Load Orchestration
                        </h4>
                        <ul className="space-y-1 text-gray-600 text-sm">
                          <li>• Staggered component loading with 100ms delays</li>
                          <li>• Performance monitoring integration</li>
                          <li>• Accessibility-first with motion preference detection</li>
                          <li>• GPU-accelerated animations with transform3d</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-bitcoin-orange">Skeleton Loading</h4>
                        <ul className="space-y-1 text-gray-600 text-sm">
                          <li>• Multiple skeleton types (text, button, custom)</li>
                          <li>• Shimmer animation with elegant timing</li>
                          <li>• Configurable dimensions and appearance</li>
                          <li>• Proper ARIA labels for accessibility</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-bitcoin-orange">
                          Interactive Enhancements
                        </h4>
                        <ul className="space-y-1 text-gray-600 text-sm">
                          <li>• Refined hover states with brightness filters</li>
                          <li>• Micro-interactions with scale and translate</li>
                          <li>• Enhanced focus states for keyboard navigation</li>
                          <li>• Sophisticated timing with cubic-bezier easing</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-bitcoin-orange">Content Reveals</h4>
                        <ul className="space-y-1 text-gray-600 text-sm">
                          <li>• Blur-to-focus transitions for premium feel</li>
                          <li>• Progressive enhancement with graceful degradation</li>
                          <li>• Coordinated reveal timing for visual flow</li>
                          <li>• Complete motion-reduce accessibility support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </main>
    </PageLoadOrchestrator>
  );
}
