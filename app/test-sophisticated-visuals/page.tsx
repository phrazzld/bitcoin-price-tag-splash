'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function TestSophisticatedVisuals(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 text-shadow-micro">
            Sophisticated Visual Details Test
          </h1>

          <div className="space-y-16">
            {/* Surface Treatments */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Surface Treatments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="surface-premium p-8 rounded-xl">
                  <h3 className="font-semibold mb-4 text-shadow-micro">Premium Surface</h3>
                  <p className="text-gray-600">Subtle gradient with refined shadows and borders</p>
                </div>
                <div className="surface-elevated p-8 rounded-xl">
                  <h3 className="font-semibold mb-4 text-shadow-micro">Elevated Surface</h3>
                  <p className="text-gray-600">Enhanced depth with sophisticated elevation</p>
                </div>
                <div className="surface-refined p-8 rounded-xl">
                  <h3 className="font-semibold mb-4 text-shadow-micro">Refined Surface</h3>
                  <p className="text-gray-600">Ultimate sophistication with texture overlay</p>
                </div>
              </div>
            </section>

            {/* Elevation System */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Elevation System
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="elevation-micro bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Micro</h3>
                  <p className="text-sm text-gray-600">Barely visible</p>
                </div>
                <div className="elevation-subtle bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Subtle</h3>
                  <p className="text-sm text-gray-600">Gentle lift</p>
                </div>
                <div className="elevation-soft bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Soft</h3>
                  <p className="text-sm text-gray-600">Comfortable depth</p>
                </div>
                <div className="elevation-refined bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Refined</h3>
                  <p className="text-sm text-gray-600">Premium feel</p>
                </div>
              </div>
            </section>

            {/* Inset Surfaces */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Inset Surface Treatments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="surface-inset-micro bg-white p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Inset Micro</h3>
                  <p className="text-gray-600">Ultra-subtle inset depth</p>
                </div>
                <div className="surface-inset-subtle bg-white p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Inset Subtle</h3>
                  <p className="text-gray-600">Tactile pressed feeling</p>
                </div>
                <div className="surface-inset-refined bg-white p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Inset Refined</h3>
                  <p className="text-gray-600">Premium carved appearance</p>
                </div>
              </div>
            </section>

            {/* Border System */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Sophisticated Borders
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="border-micro bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Micro Border</h3>
                  <p className="text-sm text-gray-600">0.5px ultra-thin</p>
                </div>
                <div className="border-subtle bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Subtle Border</h3>
                  <p className="text-sm text-gray-600">1px gentle</p>
                </div>
                <div className="border-refined bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Refined Border</h3>
                  <p className="text-sm text-gray-600">1px sophisticated</p>
                </div>
                <div className="border-highlight bg-gray-900 text-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Highlight Border</h3>
                  <p className="text-sm text-gray-300">Light accent</p>
                </div>
              </div>
            </section>

            {/* Enhanced Background */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Background Sophistication
              </h2>
              <div className="background-sophisticated p-12 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-shadow-subtle">
                  Premium Background Treatment
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-shadow-micro">
                  This background combines sophisticated gradients, ultra-subtle texture overlays,
                  and refined color relationships to create a sense of premium quality while
                  maintaining Swiss minimalism principles.
                </p>
              </div>
            </section>

            {/* Ultimate Sophistication */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Ultimate Depth Sophistication
              </h2>
              <div className="depth-sophisticated p-12 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-shadow-refined">
                  Premium Depth Treatment
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-shadow-micro">
                  The ultimate combination of all sophisticated visual details: layered shadows,
                  texture overlays, gradient refinements, and enhanced borders create an
                  unmistakably premium feeling while respecting minimalist design principles.
                </p>
                <div className="mt-8">
                  <Button size="large" className="elevation-refined">
                    Experience Premium Quality
                  </Button>
                </div>
              </div>
            </section>

            {/* Backdrop System */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Backdrop Sophistication
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="backdrop-ultra-subtle border-subtle p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Ultra Subtle</h3>
                  <p className="text-gray-600">Almost invisible enhancement</p>
                </div>
                <div className="backdrop-micro border-subtle p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Micro Backdrop</h3>
                  <p className="text-gray-600">Barely perceptible depth</p>
                </div>
                <div className="backdrop-refined border-subtle p-8 rounded-xl">
                  <h3 className="font-semibold mb-4">Refined Backdrop</h3>
                  <p className="text-gray-600">Sophisticated presence</p>
                </div>
              </div>
            </section>

            {/* Text Shadow System */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Text Shadow Refinement
              </h2>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-shadow-micro">
                  Micro Text Shadow - Ultra Subtle
                </h3>
                <h3 className="text-3xl font-bold text-shadow-subtle">
                  Subtle Text Shadow - Gentle Depth
                </h3>
                <h3 className="text-3xl font-bold text-shadow-refined">
                  Refined Text Shadow - Premium Quality
                </h3>
              </div>
            </section>

            {/* Implementation Notes */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-shadow-micro">
                Swiss Minimalism + Sophistication
              </h2>
              <div className="surface-refined p-8 rounded-2xl text-left max-w-4xl mx-auto">
                <h3 className="font-semibold mb-4 text-shadow-micro">Design Philosophy</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    • <strong>Subtlety over flashiness:</strong> Every effect is barely visible
                    individually but collectively creates premium quality
                  </li>
                  <li>
                    • <strong>Functional beauty:</strong> Each visual detail serves a purpose in
                    enhancing depth perception and material definition
                  </li>
                  <li>
                    • <strong>Mathematical precision:</strong> Shadow systems, gradients, and
                    spacing follow exact mathematical relationships
                  </li>
                  <li>
                    • <strong>Premium materials:</strong> Sophisticated textures and surfaces that
                    feel expensive but not decorative
                  </li>
                  <li>
                    • <strong>Restrained complexity:</strong> Knowing when to stop - maintaining the
                    essence of Swiss minimalism
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
