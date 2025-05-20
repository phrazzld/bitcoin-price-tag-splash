'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScrollReveal from '@/components/animation/ScrollReveal';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
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
    </motion.div>
  );
}
