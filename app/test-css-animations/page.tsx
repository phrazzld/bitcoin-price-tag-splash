'use client';

import React, { useState } from 'react';

export default function TestCssAnimations(): React.ReactNode {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnimation = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="p-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">CSS Animation Test Page</h1>

      <div className="space-y-12">
        {/* Fade-in animation */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Fade In Animation</h2>
          <button
            onClick={() => toggleAnimation(0)}
            className="bg-bitcoin-orange text-white px-4 py-2 rounded mb-4"
          >
            {activeIndex === 0 ? 'Reset' : 'Trigger Animation'}
          </button>
          <div
            className={`w-64 h-32 bg-bitcoin-orange ${activeIndex === 0 ? 'fade-in' : 'opacity-0'}`}
          ></div>
          <p className="mt-4 text-sm">
            Class: <code>fade-in</code>
          </p>
        </section>

        {/* Slide-in-up animation */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Slide In Up Animation</h2>
          <button
            onClick={() => toggleAnimation(1)}
            className="bg-bitcoin-orange text-white px-4 py-2 rounded mb-4"
          >
            {activeIndex === 1 ? 'Reset' : 'Trigger Animation'}
          </button>
          <div
            className={`w-64 h-32 bg-bitcoin-orange ${activeIndex === 1 ? 'slide-in-up' : 'opacity-0'}`}
          ></div>
          <p className="mt-4 text-sm">
            Class: <code>slide-in-up</code>
          </p>
        </section>

        {/* Scale-in animation */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Scale In Animation</h2>
          <button
            onClick={() => toggleAnimation(2)}
            className="bg-bitcoin-orange text-white px-4 py-2 rounded mb-4"
          >
            {activeIndex === 2 ? 'Reset' : 'Trigger Animation'}
          </button>
          <div
            className={`w-64 h-32 bg-bitcoin-orange ${activeIndex === 2 ? 'scale-in' : 'opacity-0'}`}
          ></div>
          <p className="mt-4 text-sm">
            Class: <code>scale-in</code>
          </p>
        </section>

        {/* Floating orbs animation */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Floating Orbs Animation</h2>
          <div className="relative overflow-hidden h-64 border border-gray-300">
            <div className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/10 blur-3xl float-orb-one"></div>
            <div className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/10 blur-3xl float-orb-two"></div>
          </div>
          <p className="mt-4 text-sm">
            Classes: <code>float-orb-one</code> and <code>float-orb-two</code>
          </p>
        </section>

        {/* ScrollReveal animation simulation */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Scroll Reveal Animation</h2>
          <button
            onClick={() => toggleAnimation(3)}
            className="bg-bitcoin-orange text-white px-4 py-2 rounded mb-4"
          >
            {activeIndex === 3 ? 'Reset' : 'Trigger Animation'}
          </button>
          <div
            className={`w-64 h-32 bg-bitcoin-orange ${activeIndex === 3 ? 'scroll-reveal-final' : 'scroll-reveal-initial'}`}
          ></div>
          <p className="mt-4 text-sm">
            Classes: <code>scroll-reveal-initial</code> and <code>scroll-reveal-final</code>
          </p>
        </section>

        {/* Duration and delay tests */}
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Duration and Delay Tests</h2>
          <button
            onClick={() => toggleAnimation(4)}
            className="bg-bitcoin-orange text-white px-4 py-2 rounded mb-4"
          >
            {activeIndex === 4 ? 'Reset' : 'Trigger Animation'}
          </button>
          <div className="space-y-4">
            <div
              className={`w-64 h-16 bg-bitcoin-orange ${activeIndex === 4 ? 'fade-in duration-short' : 'opacity-0'}`}
            >
              <p className="text-white text-center pt-4">Short duration (0.3s)</p>
            </div>
            <div
              className={`w-64 h-16 bg-bitcoin-orange ${activeIndex === 4 ? 'fade-in duration-medium' : 'opacity-0'}`}
            >
              <p className="text-white text-center pt-4">Medium duration (0.6s)</p>
            </div>
            <div
              className={`w-64 h-16 bg-bitcoin-orange ${activeIndex === 4 ? 'fade-in duration-long' : 'opacity-0'}`}
            >
              <p className="text-white text-center pt-4">Long duration (1s)</p>
            </div>
            <div
              className={`w-64 h-16 bg-bitcoin-orange ${activeIndex === 4 ? 'fade-in delay-short' : 'opacity-0'}`}
            >
              <p className="text-white text-center pt-4">Short delay (0.1s)</p>
            </div>
            <div
              className={`w-64 h-16 bg-bitcoin-orange ${activeIndex === 4 ? 'fade-in delay-medium' : 'opacity-0'}`}
            >
              <p className="text-white text-center pt-4">Medium delay (0.3s)</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
