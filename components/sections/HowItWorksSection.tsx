import React from "react";
import Container from "../ui/Container";
import StepCard from "../StepCard";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: "Install the extension from Chrome Web Store"
    },
    {
      number: 2,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: "Browse any website with prices"
    },
    {
      number: 3,
      screenshot: <div className="w-full h-48 bg-gray-200 rounded" />,
      description: "See Bitcoin values automatically"
    }
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex-1">
              <StepCard
                number={step.number}
                screenshot={step.screenshot}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;