import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface StepCardProps {
  number: number;
  screenshot: React.ReactNode;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, screenshot, description }) => {
  return (
    <div className="text-center space-y-4">
      <Badge
        variant="outline"
        className="w-12 h-12 rounded-full text-2xl font-bold border-primary/20 text-primary"
      >
        {number}
      </Badge>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video relative">{screenshot}</div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground font-medium">{description}</p>
    </div>
  );
};

export default StepCard;
