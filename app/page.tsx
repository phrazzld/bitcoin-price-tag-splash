'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScrollReveal from '@/components/animation/ScrollReveal';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Home(): React.ReactNode {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after component mounts to trigger the fade-in animation
    setIsLoaded(true);
  }, []);

  return (
    <div className={`relative ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ScrollReveal>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
