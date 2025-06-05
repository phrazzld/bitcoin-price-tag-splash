import React from 'react';

interface StepCardProps {
  number: number;
  screenshot: React.ReactNode;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, screenshot, description }) => {
  return (
    <div className="text-center">
      <div className="text-7xl font-bold text-gray-700 mb-6">{number}</div>
      <div className="border border-gray-300 rounded-none mb-4 relative aspect-video">
        {screenshot}
      </div>
      <p className="typography-body text-gray-700">{description}</p>
    </div>
  );
};

export default StepCard;
