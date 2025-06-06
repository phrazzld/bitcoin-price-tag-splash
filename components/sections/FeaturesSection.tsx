import React from 'react';
import Container from '../ui/Container';
import FeatureCard from '../FeatureCard';
import { type IconName } from '../ui/Icon';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'refreshCw' as IconName,
      title: 'Live Conversion',
      description: 'Real-time Bitcoin prices on every website',
    },
    {
      icon: 'zap' as IconName,
      title: 'Zero Setup',
      description: 'Works instantly on 50,000+ shopping sites',
    },
    {
      icon: 'shield' as IconName,
      title: 'Privacy First',
      description: 'No data collection, no account required',
    },
    {
      icon: 'globe' as IconName,
      title: 'Global Coverage',
      description: 'Supports all major currencies worldwide',
    },
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <h2 className="sr-only">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
