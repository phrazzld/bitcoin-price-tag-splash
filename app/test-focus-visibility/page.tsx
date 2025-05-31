'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';

export default function TestFocusVisibility(): React.ReactNode {
  return (
    <>
      <Navigation />
      <main className="pt-24 p-12 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Focus Visibility Test Page</h1>

        <div className="space-y-12">
          {/* Button Focus Tests */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Button Focus States</h2>
            <p className="mb-4 text-sm text-gray-600">
              Tab through these buttons and verify focus is visible during hover/active states
            </p>
            <div className="space-x-4">
              <Button>Default Button</Button>
              <Button className="hover:scale-105">With Scale Transform</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </section>

          {/* Link Focus Tests */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Link Focus States</h2>
            <p className="mb-4 text-sm text-gray-600">
              Tab through these links and verify focus indicators
            </p>
            <div className="space-x-6">
              <a
                href="#"
                className="text-gray-700 hover:text-bitcoin-orange transition-colors rounded-sm"
              >
                Regular Link
              </a>
              <a
                href="#"
                className="relative text-gray-700 hover:text-bitcoin-orange hover:scale-105 transition-all rounded-sm inline-block"
              >
                Link with Transform
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-bitcoin-orange hover:-translate-y-1 transition-all rounded-sm inline-block"
              >
                Link with Translate
              </a>
            </div>
          </section>

          {/* Stacking Context Tests */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Z-Index and Stacking Tests</h2>
            <p className="mb-4 text-sm text-gray-600">
              Ensure focus indicators appear above other elements
            </p>
            <div className="relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 z-[5]">
                <span className="text-xs p-2 block">z-index: 5</span>
              </div>
              <Button className="mr-40">Button near overlay</Button>
            </div>
          </section>

          {/* Animation During Focus */}
          <section className="bg-gray-100 p-8 rounded-lg mt-20">
            <h2 className="text-xl font-bold mb-4">Animation During Focus</h2>
            <p className="mb-4 text-sm text-gray-600">
              Focus on this button and then hover to see transform behavior
            </p>
            <Button>Hover While Focused</Button>
          </section>

          {/* Keyboard Navigation Flow */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tab Order Test</h2>
            <p className="mb-4 text-sm text-gray-600">
              Tab through all elements to verify smooth navigation
            </p>
            <div className="grid grid-cols-3 gap-4">
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 1</button>
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 2</button>
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 3</button>
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 4</button>
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 5</button>
              <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded relative">Item 6</button>
            </div>
          </section>
        </div>

        <div className="mt-16 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Use Tab key to navigate through all interactive elements</li>
            <li>Verify orange focus ring is visible on all elements</li>
            <li>Test hover states while element is focused</li>
            <li>Ensure focus indicators are not hidden by transforms or z-index</li>
            <li>Test in multiple browsers (Chrome, Firefox, Safari)</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
