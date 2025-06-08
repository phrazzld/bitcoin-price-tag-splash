'use client';

import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { ArrowDown } from 'lucide-react';

interface ConversionDemoProps {
  usdAmount: number;
  bitcoinAmount: string;
  onInteraction?: () => void;
  className?: string;
}

const ConversionDemo: React.FC<ConversionDemoProps> = ({
  usdAmount,
  bitcoinAmount,
  onInteraction,
  className = '',
}) => {
  return (
    <Card
      className={`w-full max-w-sm mx-auto cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${className}`}
      onClick={onInteraction}
    >
      <CardContent className="p-8 text-center space-y-6">
        {/* USD Amount */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">${usdAmount.toFixed(2)}</div>
          <Badge variant="secondary" className="text-xs">
            US Dollar
          </Badge>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <ArrowDown className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Bitcoin Amount */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary font-mono">{bitcoinAmount} BTC</div>
          <Badge variant="outline" className="text-xs border-primary/20">
            Bitcoin
          </Badge>
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live rates</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionDemo;
