import React from 'react';
import Container from '../ui/Container';
import StepCard from '../StepCard';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Install the free Bitcoin Price Tag extension',
    },
    {
      number: 2,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Shop normally on any e-commerce site',
    },
    {
      number: 3,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: 'Instantly see the true Bitcoin cost of every purchase',
    },
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
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
