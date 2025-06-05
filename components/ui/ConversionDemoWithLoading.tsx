'use client';

import React, { useState, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';
import styles from '../sections/HeroSection.module.css';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface ConversionDemoWithLoadingProps {
  initialLoadTime?: number;
  showSkeleton?: boolean;
  onLoadComplete?: () => void;
}

const ConversionDemoWithLoading: React.FC<ConversionDemoWithLoadingProps> = ({
  initialLoadTime = 2000,
  showSkeleton = true,
  onLoadComplete,
}) => {
  const correlationId = useCorrelationId();
  const [isLoading, setIsLoading] = useState(showSkeleton);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (showSkeleton) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        onLoadComplete?.();

        logger.info('Conversion demo loading completed', 'ConversionDemoWithLoading', {
          event_type: 'ui_state_change',
          state_change: 'loading_complete',
          loading_duration_ms: initialLoadTime,
          correlation_id_from_hook: correlationId,
        });
      }, initialLoadTime);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [showSkeleton, initialLoadTime, onLoadComplete, correlationId]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);

      logger.info('Conversion demo interaction', 'ConversionDemoWithLoading', {
        event_type: 'user_interaction',
        interaction_type: 'conversion_demo_click',
        was_loading: isLoading,
        correlation_id_from_hook: correlationId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <SkeletonLoader
          type="conversion"
          className="elegant-transition"
          aria-label="Loading price conversion demo"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center content-reveal">
      <div
        className={`${styles.conversionContainer} elegant-transition progressive-blur progressive-scale`}
        aria-label="Interactive price conversion demonstration: Click to see how $99.99 converts to 0.00234584 Bitcoin"
        onClick={handleInteraction}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleInteraction();
          }
        }}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.conversionAnimation}>
          <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
          <span className={`${styles.priceValue} ${styles.btcPrice}`}>0.00234584 BTC</span>
        </div>
        <div className={styles.conversionArrow} aria-hidden="true">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
              fill="var(--color-bitcoin-orange-700)"
              fillOpacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ConversionDemoWithLoading;
