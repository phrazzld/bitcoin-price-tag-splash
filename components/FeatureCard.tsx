import React from 'react';
import { Card, CardContent } from './ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
