import React from 'react';
import Container from '../ui/Container';
import StepCard from '../StepCard';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Add to Chrome in one click',
    },
    {
      number: 2,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Shop anywhere you normally do',
    },
    {
      number: 3,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Prices appear automatically',
    },
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <h2 className="typography-headline text-center text-gray-900 mb-12 md:mb-16">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              screenshot={step.screenshot}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
