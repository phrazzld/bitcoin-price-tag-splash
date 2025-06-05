import React from 'react';
import Icon, { type IconName } from './ui/Icon';

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-left">
      <div className="mb-4">
        <Icon name={icon} className="text-gray-800" />
      </div>
      <h3 className="typography-title text-gray-900 mb-2">{title}</h3>
      <p className="typography-body text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
