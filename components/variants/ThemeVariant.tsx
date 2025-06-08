'use client';

/**
 * Theme A/B Test Variant Component
 *
 * Applies different Bitcoin orange saturation levels based on A/B test assignment.
 * Dynamically injects CSS custom properties to override the default theme.
 */

import React, { useEffect } from 'react';
import { useTestVariant, useABTestTracking } from '@/lib/ab-testing';

interface ThemeVariantProps {
  children: React.ReactNode;
}

/**
 * Bitcoin orange saturation variants for A/B testing
 */
const COLOR_VARIANTS = {
  control: {
    name: 'Pure Bitcoin Orange (#F7931A)',
    colors: {
      '--bitcoin-orange-pure': '#f7931a',
      '--color-bitcoin-orange-50': '#fff8f1',
      '--color-bitcoin-orange-100': '#ffedd5',
      '--color-bitcoin-orange-200': '#fed7aa',
      '--color-bitcoin-orange-300': '#fdba74',
      '--color-bitcoin-orange-400': '#fb923c',
      '--color-bitcoin-orange-500': '#f7931a',
      '--color-bitcoin-orange-600': '#ea7317',
      '--color-bitcoin-orange-700': '#c2410c',
      '--color-bitcoin-orange-800': '#9a3412',
      '--color-bitcoin-orange-900': '#7c2d12',
    },
    description: 'Standard Bitcoin orange color palette',
  },
  'variant-a': {
    name: 'Enhanced Saturation (+10%)',
    colors: {
      '--bitcoin-orange-pure': '#ff9f1f',
      '--color-bitcoin-orange-50': '#fffaf2',
      '--color-bitcoin-orange-100': '#ffefdb',
      '--color-bitcoin-orange-200': '#ffdcb6',
      '--color-bitcoin-orange-300': '#ffc481',
      '--color-bitcoin-orange-400': '#ff9f1f',
      '--color-bitcoin-orange-500': '#ff9f1f',
      '--color-bitcoin-orange-600': '#f07f1a',
      '--color-bitcoin-orange-700': '#cc4a0f',
      '--color-bitcoin-orange-800': '#a43a14',
      '--color-bitcoin-orange-900': '#863315',
    },
    description: 'More vibrant Bitcoin orange with increased saturation',
  },
  'variant-b': {
    name: 'Reduced Saturation (-15%)',
    colors: {
      '--bitcoin-orange-pure': '#e68c1a',
      '--color-bitcoin-orange-50': '#fef7f0',
      '--color-bitcoin-orange-100': '#fdebd1',
      '--color-bitcoin-orange-200': '#fad3a3',
      '--color-bitcoin-orange-300': '#f6b16a',
      '--color-bitcoin-orange-400': '#f08c33',
      '--color-bitcoin-orange-500': '#e68c1a',
      '--color-bitcoin-orange-600': '#d16815',
      '--color-bitcoin-orange-700': '#ae3c0b',
      '--color-bitcoin-orange-800': '#8c3010',
      '--color-bitcoin-orange-900': '#712711',
    },
    description: 'Muted Bitcoin orange with reduced saturation for subtle elegance',
  },
};

const ThemeVariant: React.FC<ThemeVariantProps> = ({ children }) => {
  const variantId = useTestVariant('bitcoin-orange');
  const { trackInteraction } = useABTestTracking('bitcoin-orange');

  // Get the variant configuration, fallback to control
  const variant =
    variantId && COLOR_VARIANTS[variantId as keyof typeof COLOR_VARIANTS]
      ? COLOR_VARIANTS[variantId as keyof typeof COLOR_VARIANTS]
      : COLOR_VARIANTS.control;

  useEffect(() => {
    // Track theme impression
    if (variantId) {
      trackInteraction('theme_impression', {
        variant_id: variantId,
        theme_name: variant.name,
        primary_color: variant.colors['--bitcoin-orange-pure'],
      });
    }

    // Apply theme colors to CSS custom properties
    const root = document.documentElement;

    // Store original values for cleanup
    const originalColors: Record<string, string> = {};

    Object.entries(variant.colors).forEach(([property, value]) => {
      // Store original value
      originalColors[property] = getComputedStyle(root).getPropertyValue(property);
      // Apply new value
      root.style.setProperty(property, value);
    });

    // Cleanup function to restore original colors
    return () => {
      Object.keys(originalColors).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [variantId, variant, trackInteraction]);

  // Track color interactions when users interact with orange elements
  useEffect(() => {
    const handleOrangeElementInteraction = (event: Event) => {
      const target = event.target as HTMLElement;

      // Check if the clicked element uses Bitcoin orange colors
      const computedStyle = getComputedStyle(target);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      const borderColor = computedStyle.borderColor;

      // Simple check for orange colors (contains rgb values close to Bitcoin orange)
      const hasOrangeColor = [backgroundColor, color, borderColor].some((colorValue) => {
        return (
          colorValue.includes('247') ||
          colorValue.includes('147') ||
          colorValue.includes('26') ||
          colorValue.includes('rgb(247') ||
          colorValue.includes('rgb(234')
        );
      });

      if (hasOrangeColor && variantId) {
        trackInteraction('orange_element_interaction', {
          variant_id: variantId,
          element_type: target.tagName.toLowerCase(),
          element_class: target.className,
          interaction_type: event.type,
          theme_name: variant.name,
        });
      }
    };

    // Add event listeners for interactions with orange elements
    document.addEventListener('click', handleOrangeElementInteraction);
    document.addEventListener('focus', handleOrangeElementInteraction);

    return () => {
      document.removeEventListener('click', handleOrangeElementInteraction);
      document.removeEventListener('focus', handleOrangeElementInteraction);
    };
  }, [variantId, variant, trackInteraction]);

  return (
    <div data-theme-variant={variantId || 'control'} data-theme-name={variant.name}>
      {children}
    </div>
  );
};

export default ThemeVariant;
