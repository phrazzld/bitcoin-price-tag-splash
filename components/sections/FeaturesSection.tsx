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
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;