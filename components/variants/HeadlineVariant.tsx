'use client';

/**
 * Headline A/B Test Variant Component
 *
 * Renders different headline variants based on A/B test assignment.
 * Tracks impressions and interactions for analytics.
 */

import React, { useEffect } from 'react';
import { useTestVariant, useABTestTracking } from '@/lib/ab-testing';

interface HeadlineVariantProps {
  className?: string;
  id?: string;
}

/**
 * Headline variants for A/B testing
 */
const HEADLINE_VARIANTS = {
  control: {
    text: '',
    emphasis: 'Bitcoin Price Tag',
    emphasisSuffix: '',
    description: 'Clean brand-focused headline',
  },
  'variant-a': {
    text: '',
    emphasis: 'Bitcoin Price Tag',
    emphasisSuffix: '',
    description: 'Clean brand-focused headline',
  },
  'variant-b': {
    text: '',
    emphasis: 'Bitcoin Price Tag',
    emphasisSuffix: '',
    description: 'Clean brand-focused headline',
  },
};

const HeadlineVariant: React.FC<HeadlineVariantProps> = ({
  className = 'typography-display hero-responsive-spacing text-foreground text-shadow-micro',
  id = 'hero-heading',
}) => {
  const variantId = useTestVariant('hero-headline');
  const { trackInteraction } = useABTestTracking('hero-headline');

  // Get the variant configuration, fallback to control
  const variant =
    variantId && HEADLINE_VARIANTS[variantId as keyof typeof HEADLINE_VARIANTS]
      ? HEADLINE_VARIANTS[variantId as keyof typeof HEADLINE_VARIANTS]
      : HEADLINE_VARIANTS.control;

  useEffect(() => {
    // Track headline impression
    if (variantId) {
      trackInteraction('headline_impression', {
        variant_id: variantId,
        headline_text: variant.text,
        emphasis_text: variant.emphasis,
        emphasis_suffix: variant.emphasisSuffix ?? null,
      });
    }
  }, [variantId, variant, trackInteraction]);

  const handleInteraction = () => {
    if (variantId) {
      trackInteraction('headline_interaction', {
        variant_id: variantId,
        interaction_method: 'click',
        headline_text: variant.text,
      });
    }
  };

  return (
    <h1
      id={id}
      className={className}
      onClick={handleInteraction}
      data-testid={`headline-variant-${variantId || 'control'}`}
      aria-label={`${variant.text} ${variant.emphasis}${variant.emphasisSuffix ? ` ${variant.emphasisSuffix}` : ''}`}
    >
      {variant.text}{' '}
      <span className="text-primary font-extrabold relative text-shadow-subtle">
        {variant.emphasis}
      </span>
      {variant.emphasisSuffix && <span className="text-foreground"> {variant.emphasisSuffix}</span>}
    </h1>
  );
};

export default HeadlineVariant;
