'use client';

import React from 'react';
import {
  Check,
  Zap,
  Shield,
  Download,
  Star,
  ChevronRight,
  Globe,
  DollarSign,
  RefreshCw,
  type LucideProps,
} from 'lucide-react';

const icons = {
  check: Check,
  zap: Zap,
  shield: Shield,
  download: Download,
  star: Star,
  chevronRight: ChevronRight,
  globe: Globe,
  dollarSign: DollarSign,
  refreshCw: RefreshCw,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} {...props} />;
};

export default Icon;
