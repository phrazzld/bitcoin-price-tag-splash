import React from 'react';
import Container from '../ui/Container';
import FeatureCard from '../FeatureCard';
import { type IconName } from '../ui/Icon';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'zap' as IconName,
      title: 'Instant awareness',
      description: "See what you're really spending in Bitcoin terms",
    },
    {
      icon: 'globe' as IconName,
      title: 'Universal compatibility',
      description: 'Works on every major shopping and commerce site',
    },
    {
      icon: 'refreshCw' as IconName,
      title: 'Real-time accuracy',
      description: 'Live Bitcoin prices ensure precise calculations',
    },
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <h2 className="sr-only">Features</h2>
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
