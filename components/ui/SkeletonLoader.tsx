'use client';

import React from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface SkeletonLoaderProps {
  type?: 'text' | 'text-large' | 'button' | 'conversion' | 'custom';
  className?: string;
  width?: string;
  height?: string;
  count?: number;
  animate?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'text',
  className = '',
  width,
  height,
  count = 1,
  animate = true,
}) => {
  const correlationId = useCorrelationId();

  React.useEffect(() => {
    logger.debug('SkeletonLoader rendered', 'SkeletonLoader', {
      event_type: 'component_lifecycle',
      lifecycle_stage: 'mount',
      skeleton_type: type,
      skeleton_count: count,
      animation_enabled: animate,
      correlation_id_from_hook: correlationId,
    });
  }, [correlationId, type, count, animate]);

  const getTypeClasses = () => {
    switch (type) {
      case 'text':
        return 'skeleton-text';
      case 'text-large':
        return 'skeleton-text-large';
      case 'button':
        return 'skeleton-button';
      case 'conversion':
        return 'skeleton-conversion';
      case 'custom':
        return '';
      default:
        return 'skeleton-text';
    }
  };

  const baseClasses = `
    skeleton-base 
    ${getTypeClasses()}
    ${!animate ? 'motion-reduce:animation-none' : ''}
    ${className}
  `.trim();

  const customStyles = {
    ...(width && { width }),
    ...(height && { height }),
  };

  // Render multiple skeleton elements if count > 1
  const skeletonElements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={baseClasses}
      style={customStyles}
      aria-hidden="true"
      role="presentation"
    />
  ));

  return (
    <div className="skeleton-container" role="status" aria-label="Loading content">
      {skeletonElements}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonLoader;
