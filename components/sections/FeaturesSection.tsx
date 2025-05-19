import React from "react";
import Container from "../ui/Container";
import FeatureCard from "../FeatureCard";
import { Zap, Globe, RefreshCw } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Instant conversion",
      description: "See Bitcoin values in real-time as you browse"
    },
    {
      icon: <Globe size={24} />,
      title: "Works everywhere",
      description: "Compatible with all major shopping sites"
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Always current",
      description: "Live exchange rates updated continuously"
    }
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;