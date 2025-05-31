import React from 'react';
import Container from '../ui/Container';
import FeatureCard from '../FeatureCard';
import { type IconName } from '../ui/Icon';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'zap' as IconName,
      title: 'Instant conversion',
      description: 'See Bitcoin values in real-time as you browse',
    },
    {
      icon: 'globe' as IconName,
      title: 'Works everywhere',
      description: 'Compatible with all major shopping sites',
    },
    {
      icon: 'refreshCw' as IconName,
      title: 'Always current',
      description: 'Live exchange rates updated continuously',
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
