'use client';

/**
 * CTA Button A/B Test Variant Component
 *
 * Renders different CTA button text variants based on A/B test assignment.
 * Tracks conversions and interactions for analytics.
 */

import React, { useEffect } from 'react';
import { useTestVariant, useABTestTracking } from '@/lib/ab-testing';
import { Button } from '../ui/button';

interface CTAButtonVariantProps {
  href?: string;
  size?: 'small' | 'default' | 'large';
  className?: string;
  onClick?: () => void;
}

/**
 * CTA button text variants for A/B testing
 */
const CTA_VARIANTS = {
  control: {
    text: 'Install Extension',
    description: 'Simple and clear',
  },
  'variant-a': {
    text: 'Get Extension',
    description: 'Simpler acquisition-focused CTA',
  },
  'variant-b': {
    text: 'Add to Chrome',
    description: 'Action-oriented benefit-focused CTA',
  },
};

const CTAButtonVariant: React.FC<CTAButtonVariantProps> = ({
  href,
  size = 'large',
  className = 'touch-target-optimized mobile-button-spacing',
  onClick,
  ...props
}) => {
  const variantId = useTestVariant('cta-text');
  const { trackInteraction } = useABTestTracking('cta-text');

  // Get the variant configuration, fallback to control
  const variant =
    variantId && CTA_VARIANTS[variantId as keyof typeof CTA_VARIANTS]
      ? CTA_VARIANTS[variantId as keyof typeof CTA_VARIANTS]
      : CTA_VARIANTS.control;

  useEffect(() => {
    // Track CTA button impression
    if (variantId) {
      trackInteraction('cta_impression', {
        variant_id: variantId,
        button_text: variant.text,
        button_position: 'hero_section',
      });
    }
  }, [variantId, variant, trackInteraction]);

  const handleClick = () => {
    if (variantId) {
      // Track both interaction and conversion
      trackInteraction('cta_click', {
        variant_id: variantId,
        button_text: variant.text,
        interaction_method: 'click',
        destination_url: href,
      });

      // Track as conversion (user intent to install)
      trackInteraction('cta_conversion', {
        variant_id: variantId,
        button_text: variant.text,
        conversion_type: 'install_intent',
        destination_url: href,
      });
    }

    // Call original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (variantId) {
        trackInteraction('cta_click', {
          variant_id: variantId,
          button_text: variant.text,
          interaction_method: 'keyboard',
          key_pressed: event.key,
        });

        trackInteraction('cta_conversion', {
          variant_id: variantId,
          button_text: variant.text,
          conversion_type: 'install_intent',
          interaction_method: 'keyboard',
        });
      }
    }
  };

  return (
    <Button
      asChild={!!href}
      size={size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'default'}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid={`cta-button-variant-${variantId || 'control'}`}
      aria-label={`${variant.text} - Download Bitcoin Price Tag browser extension`}
      {...props}
    >
      {href ? (
        <a href={href} className="inline-flex items-center">
          {variant.text}
        </a>
      ) : (
        variant.text
      )}
    </Button>
  );
};

export default CTAButtonVariant;
