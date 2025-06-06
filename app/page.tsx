'use client';

import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScrollReveal from '@/components/animation/ScrollReveal';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import PageLoadOrchestrator from '@/components/ui/PageLoadOrchestrator';
import { initializePerformanceMonitoring } from '@/lib/utils/performance';

export default function Home(): React.ReactNode {
  useEffect(() => {
    // Initialize performance monitoring for Core Web Vitals
    initializePerformanceMonitoring();
  }, []);

  return (
    <PageLoadOrchestrator initialDelay={50}>
      <div className="relative">
        {/* Skip Navigation Link for Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:border-2 focus:border-bitcoin-orange focus:rounded focus:font-medium focus:shadow-lg elegant-transition"
        >
          Skip to main content
        </a>

        <div className="page-load-orchestra load-delay-1">
          <AnimatedBackground />
        </div>

        <div className="page-load-orchestra load-delay-2">
          <Navigation />
        </div>

        <main id="main-content" className="relative z-10">
          <div className="page-load-orchestra load-delay-3">
            <HeroSection />
          </div>

          <ScrollReveal delay="short" duration="medium">
            <FeaturesSection />
          </ScrollReveal>

          <ScrollReveal delay="none" duration="medium">
            <HowItWorksSection />
          </ScrollReveal>

          <ScrollReveal delay="none" duration="medium">
            <CTASection />
          </ScrollReveal>
        </main>

        <div className="page-load-orchestra load-delay-4">
          <Footer />
        </div>
      </div>
    </PageLoadOrchestrator>
  );
}
