/**
 * Animation constants for consistent timing and easing throughout the app
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  extraSlow: 700,
} as const;

// CSS transition classes for consistent animations
export const TRANSITIONS = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  colors: 'transition-colors duration-300 ease-in-out',
  opacity: 'transition-opacity duration-300 ease-in-out',
  transform: 'transition-transform duration-300 ease-in-out',
  shadow: 'transition-shadow duration-300 ease-in-out',
} as const;

// Hover scale transformations
export const HOVER_SCALE = {
  subtle: 'hover:scale-105',
  normal: 'hover:scale-110',
  prominent: 'hover:scale-125',
} as const;

// Shadow classes
export const SHADOWS = {
  subtle: 'shadow-sm hover:shadow-md',
  normal: 'shadow-md hover:shadow-lg',
  prominent: 'shadow-lg hover:shadow-xl',
} as const;

// Common animation combinations
export const BUTTON_ANIMATIONS = `${TRANSITIONS.normal} ${HOVER_SCALE.subtle} ${SHADOWS.subtle}`;
export const CARD_ANIMATIONS = `${TRANSITIONS.normal} ${SHADOWS.normal}`;
