import React from "react";
import Container from "../ui/Container";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Container>
        <div className="max-w-[800px] mx-auto text-center">
          {/* Placeholder content for now */}
          <h1 className="text-4xl font-bold mb-4">Hero Section</h1>
          <p className="text-lg">This is placeholder content for the hero section.</p>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;