import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { CHROME_STORE_URL } from "@/lib/constants";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h2 className="font-bold text-gray-900 mb-8" style={{ fontSize: "2.25rem", lineHeight: "1.2" }}>
            Start seeing Bitcoin prices
          </h2>
          <Button 
            href={CHROME_STORE_URL}
            className="px-8 py-4 text-lg font-medium"
          >
            Get Started
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;