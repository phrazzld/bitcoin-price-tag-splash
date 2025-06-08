'use client';

/**
 * Conversion Demo A/B Test Variant Component
 *
 * Renders different animation styles for the USD to Bitcoin conversion demo
 * based on A/B test assignment. Tracks interactions for analytics.
 */

import React, { useEffect, useState } from 'react';
import { useTestVariant, useABTestTracking } from '@/lib/ab-testing';
import styles from '../sections/HeroSection.module.css';

interface ConversionDemoVariantProps {
  usdAmount: number;
  bitcoinAmount: string;
  onInteraction?: () => void;
  className?: string;
}

/**
 * Conversion demo variants for A/B testing
 */
const CONVERSION_VARIANTS = {
  control: {
    name: 'Vertical Flow (Current)',
    description: 'Standard vertical conversion flow',
  },
  'variant-a': {
    name: 'Side-by-Side Layout',
    description: 'Horizontal side-by-side comparison',
  },
  'variant-b': {
    name: 'Flip Card Animation',
    description: 'Card that flips between USD and Bitcoin',
  },
};

const ConversionDemoVariant: React.FC<ConversionDemoVariantProps> = ({
  usdAmount,
  bitcoinAmount,
  onInteraction,
  className = 'touch-target-large touch-separation',
}) => {
  const variantId = useTestVariant('conversion-demo');
  const { trackInteraction } = useABTestTracking('conversion-demo');
  const [isFlipped, setIsFlipped] = useState(false);

  // Get the variant configuration, fallback to control
  const variant =
    variantId && CONVERSION_VARIANTS[variantId as keyof typeof CONVERSION_VARIANTS]
      ? CONVERSION_VARIANTS[variantId as keyof typeof CONVERSION_VARIANTS]
      : CONVERSION_VARIANTS.control;

  useEffect(() => {
    // Track conversion demo impression
    if (variantId) {
      trackInteraction('conversion_demo_impression', {
        variant_id: variantId,
        demo_style: variant.name,
        usd_amount: usdAmount,
        btc_amount: bitcoinAmount,
      });
    }
  }, [variantId, variant, usdAmount, bitcoinAmount, trackInteraction]);

  const handleInteraction = () => {
    if (variantId) {
      trackInteraction('conversion_demo_interaction', {
        variant_id: variantId,
        demo_style: variant.name,
        interaction_method: 'click',
        usd_amount: usdAmount,
        btc_amount: bitcoinAmount,
      });
    }

    // For flip card variant, toggle the flip state
    if (variantId === 'variant-b') {
      setIsFlipped(!isFlipped);
    }

    if (onInteraction) {
      onInteraction();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      if (variantId) {
        trackInteraction('conversion_demo_interaction', {
          variant_id: variantId,
          demo_style: variant.name,
          interaction_method: 'keyboard',
          key_pressed: e.key,
        });
      }

      if (variantId === 'variant-b') {
        setIsFlipped(!isFlipped);
      }

      if (onInteraction) {
        onInteraction();
      }
    }
  };

  // Render vertical flow (control)
  if (!variantId || variantId === 'control') {
    return (
      <div
        className={`${styles.conversionContainerVertical} ${className}`}
        aria-label="Interactive price conversion demonstration: $99.99 converts to Bitcoin using live exchange rates"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer' }}
        data-testid="conversion-demo-vertical"
      >
        {/* USD Amount */}
        <div className={styles.usdAmountDisplay}>${usdAmount}</div>

        {/* Vertical Arrow */}
        <div className={styles.verticalArrow} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L6 13M12 19L18 13"
              stroke="var(--color-bitcoin-orange-700)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bitcoin Amount */}
        <div className={styles.btcAmountDisplay}>{bitcoinAmount} BTC</div>
      </div>
    );
  }

  // Render side-by-side layout (variant-a)
  if (variantId === 'variant-a') {
    return (
      <div
        className={`flex items-center justify-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-bitcoin-orange/30 transition-all duration-300 ${className}`}
        aria-label="Interactive price conversion demonstration: Side-by-side USD to Bitcoin conversion"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer' }}
        data-testid="conversion-demo-sidebyside"
      >
        {/* USD Amount */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">${usdAmount}</div>
          <div className="text-sm text-gray-500 font-medium">USD</div>
        </div>

        {/* Horizontal Arrow */}
        <div className="flex-shrink-0" aria-hidden="true">
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-bitcoin-orange"
          >
            <path
              d="M20 5L27 12M27 12L20 19M27 12H5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bitcoin Amount */}
        <div className="text-center">
          <div className="text-3xl font-bold text-bitcoin-orange mb-1">{bitcoinAmount}</div>
          <div className="text-sm text-gray-500 font-medium">BTC</div>
        </div>
      </div>
    );
  }

  // Render flip card animation (variant-b)
  if (variantId === 'variant-b') {
    return (
      <div
        className={`relative w-64 h-32 ${className}`}
        aria-label="Interactive flip card: Click to toggle between USD and Bitcoin amounts"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        style={{ cursor: 'pointer', perspective: '1000px' }}
        data-testid="conversion-demo-flipcard"
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-gpu ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front side (USD) */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-4xl font-bold mb-2">${usdAmount}</div>
            <div className="text-sm font-medium opacity-90">US Dollars</div>
            <div className="text-xs mt-1 opacity-75">Click to convert</div>
          </div>

          {/* Back side (Bitcoin) */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-bitcoin-orange to-orange-600 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white rotate-y-180"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-4xl font-bold mb-2">{bitcoinAmount}</div>
            <div className="text-sm font-medium opacity-90">Bitcoin</div>
            <div className="text-xs mt-1 opacity-75">Click to convert back</div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to control variant
  return (
    <div
      className={`${styles.conversionContainerVertical} ${className}`}
      aria-label="Interactive price conversion demonstration"
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
      data-testid="conversion-demo-fallback"
    >
      <div className={styles.usdAmountDisplay}>${usdAmount}</div>
      <div className={styles.verticalArrow} aria-hidden="true">
        ↓
      </div>
      <div className={styles.btcAmountDisplay}>{bitcoinAmount} BTC</div>
    </div>
  );
};

export default ConversionDemoVariant;
