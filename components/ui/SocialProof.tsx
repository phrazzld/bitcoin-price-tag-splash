'use client';

import React from 'react';
import { Badge } from './badge';

interface SocialProofProps {
  className?: string;
}

const SocialProof: React.FC<SocialProofProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-6 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold">50,000+</span>
        <span className="text-muted-foreground">users</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-muted'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-muted-foreground">4.8</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <Badge variant="secondary" className="text-xs">
        Chrome Web Store
      </Badge>
    </div>
  );
};

export default SocialProof;
