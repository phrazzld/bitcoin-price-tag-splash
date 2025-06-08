'use client';

import React from 'react';
import { Badge } from './badge';

interface TrustBadgesProps {
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <Badge variant="secondary" className="text-xs">
        No Data Collected
      </Badge>
      <Badge variant="secondary" className="text-xs">
        One-Click Install
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Works Everywhere
      </Badge>
    </div>
  );
};

export default TrustBadges;
