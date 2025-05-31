'use client';

import React from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScrollReveal from '@/components/animation/ScrollReveal';
import useIntersectionObserver from '@/lib/utils/use-intersection-observer';

export default function TestAllAnimationsPage(): React.ReactNode {
  const [animationSectionRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-[300vh] relative fade-in">
      {/* Background with floating orbs */}
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-white/90 backdrop-blur-sm shadow-md p-6">
        <h1 className="text-3xl font-bold text-center">CSS Animation Test Suite</h1>
        <p className="text-center text-gray-600 mt-2">
          Testing all refactored CSS animations replacing Framer Motion
        </p>
      </header>

      {/* First section: page fade-in */}
      <section className="relative z-10 max-w-3xl mx-auto mt-12 p-6">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">1. Page Fade-In Animation</h2>
          <p className="mb-4">
            This entire page uses the page-level fade-in animation that was previously implemented
            with Framer Motion in app/page.tsx. The animation is now handled with pure CSS,
            triggered automatically on page load without any JavaScript.
          </p>
          <div className="p-4 bg-gray-100 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              <code>
                {`// CSS Animation (globals.css)
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: forwards;
}

// Component Implementation (Pure CSS)
<div className="... fade-in">
  ...content...
</div>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Second section: Animated Background */}
      <section className="relative z-10 max-w-3xl mx-auto mt-12 p-6">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">2. Animated Background</h2>
          <p className="mb-4">
            The floating orbs in the background use CSS animations instead of Framer Motion. They
            maintain the same visual appearance and motion patterns.
          </p>
          <div className="p-4 bg-gray-100 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              <code>
                {`// CSS Animation (globals.css)
@keyframes floatOrbOne {
  0% { transform: translate(-100px, -100px); }
  50% { transform: translate(100px, 200px); }
  100% { transform: translate(-100px, -100px); }
}

// Component Implementation
<div
  className="absolute w-96 h-96 rounded-full 
             bg-bitcoin-orange/5 blur-3xl float-orb-one"
  style={{ transform: 'translate(-100px, -100px)' }}
/>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Element for demonstrating intersection observer */}
      <div className="h-[40vh] my-20 flex items-center justify-center" ref={animationSectionRef}>
        <div
          className={`p-6 bg-bitcoin-orange text-white rounded-xl transform transition-all duration-700
            ${
              isIntersecting
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-20 scale-95'
            }`}
        >
          <h3 className="text-xl font-bold">Custom Intersection Animation</h3>
          <p>This element is using the useIntersectionObserver hook directly</p>
        </div>
      </div>

      {/* Third section: ScrollReveal */}
      <ScrollReveal>
        <section className="relative z-10 max-w-3xl mx-auto p-6">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">3. ScrollReveal Component</h2>
            <p className="mb-4">
              This section is wrapped in the refactored ScrollReveal component that uses CSS
              transitions and our custom useIntersectionObserver hook.
            </p>
            <div className="p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>
                  {`// CSS Classes (globals.css)
.scroll-reveal-initial {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.scroll-reveal-final {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition:
    opacity var(--animation-duration-medium) var(--animation-easing-entrance),
    transform var(--animation-duration-medium) var(--animation-easing-entrance);
}

// Component Implementation
const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
  threshold,
  triggerOnce,
  rootMargin: '0px 0px -100px 0px',
});

<div
  ref={ref}
  className={\`$\{isIntersecting ? 'scroll-reveal-final' : 'scroll-reveal-initial'}\`}
>
  {children}
</div>`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Various ScrollReveal examples with different configurations */}
      <div className="relative z-10 max-w-3xl mx-auto mt-12 p-6 space-y-24">
        <h2 className="text-2xl font-bold text-center">ScrollReveal Variations</h2>

        <ScrollReveal duration="short">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Short Duration</h3>
            <p>This section uses a shorter animation duration</p>
          </div>
        </ScrollReveal>

        <ScrollReveal duration="long">
          <div className="bg-green-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Long Duration</h3>
            <p>This section uses a longer animation duration</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay="short">
          <div className="bg-purple-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Short Delay</h3>
            <p>This section has a short delay before animating</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay="medium">
          <div className="bg-orange-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Medium Delay</h3>
            <p>This section has a medium delay before animating</p>
          </div>
        </ScrollReveal>

        <ScrollReveal triggerOnce={false}>
          <div className="bg-pink-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Repeat on Scroll</h3>
            <p>This section will animate each time it enters the viewport (triggerOnce: false)</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Animation showcase */}
      <section className="relative z-10 max-w-3xl mx-auto mt-20 mb-32 p-6">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">CSS Animation Library Showcase</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Fade In</h3>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center fade-in">
                <span>fade-in</span>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Slide In Up</h3>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center slide-in-up">
                <span>slide-in-up</span>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Slide In Down</h3>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center slide-in-down">
                <span>slide-in-down</span>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Scale In</h3>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center scale-in">
                <span>scale-in</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Reduced Motion Support</h3>
            <p className="text-sm">
              All animations automatically respect the user&apos;s motion preferences through the{' '}
              <code>prefers-reduced-motion</code> media query in globals.css.
            </p>
            <p className="mt-2 text-sm">
              Current setting:{' '}
              <strong>
                {typeof window !== 'undefined' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'reduced motion'
                  : 'standard motion'}
              </strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
