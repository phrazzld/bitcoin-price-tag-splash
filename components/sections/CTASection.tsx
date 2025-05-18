import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Start seeing Bitcoin prices
          </h2>
          <Button>Get Started</Button>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;