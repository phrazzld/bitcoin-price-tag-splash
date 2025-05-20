import React from 'react';
import Container from '../ui/Container';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-[800px] mx-auto">
          <div className="relative mb-8">
            <span
              className="text-[120px] md:text-[160px] leading-none text-bitcoin-orange opacity-20 absolute -top-8 md:-top-12 -left-4 md:-left-8"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="text-gray-800 leading-relaxed px-8 md:px-12"
              style={{ fontSize: '1.25rem', lineHeight: '1.6' }}
            >
              Finally I can see how much things actually cost. This extension changed how I think
              about spending money. Every purchase is now a Bitcoin decision.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-gray-800">Sarah Chen</p>
            <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
              Bitcoin investor since 2019
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
