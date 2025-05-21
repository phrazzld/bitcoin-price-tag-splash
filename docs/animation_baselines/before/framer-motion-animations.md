# Framer Motion Animations - Current Implementation

This document describes the current animations implemented using Framer Motion in the Bitcoin Price Tag Splash page.

## 1. Page-Level Fade-In (`app/page.tsx`)

**Component**: Root page component
**Animation Type**: Fade-in on page load
**Implementation**:

- Uses `motion.div` wrapper with opacity transition
- Initial opacity: 0
- Animate to opacity: 1
- Duration: 0.3 seconds

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="relative"
>
  {/* Page content */}
</motion.div>
```

## 2. Animated Background (`components/ui/AnimatedBackground.tsx`)

**Component**: Background animation with floating orbs
**Animation Type**: Continuous motion animation (infinite repeating)
**Implementation**:

- Two `motion.div` elements representing orbs
- First orb:
  - Initial position: x: -100, y: -100
  - Animates along a path: [100, -100, 100] for x and [-100, 200, -100] for y
  - Duration: 20 seconds
  - Easing: easeInOut
  - Repeats infinitely
- Second orb:
  - Initial position: x: 100, y: 100
  - Animates along a path: [-100, 100, -100] for x and [100, -200, 100] for y
  - Duration: 25 seconds
  - Easing: easeInOut
  - Repeats infinitely
- Both orbs have blur effect (blur-3xl) and semi-transparent orange background

## 3. Scroll Reveal (`components/animation/ScrollReveal.tsx`)

**Component**: Wrapper for sections that animate in when scrolled into view
**Animation Type**: Entrance animation triggered by scroll position
**Implementation**:

- Uses `useInView` hook from Framer Motion to detect when element enters viewport
- Initial state: opacity: 0, y offset (default 40px), scale: 0.95
- Animates to: opacity: 1, y: 0, scale: 1 when in view
- Configurable properties:
  - yOffset: Vertical offset amount (default: 40)
  - duration: Animation duration in seconds (default: 0.6)
  - delay: Animation delay in seconds (default: 0)
- Accessibility: Uses `useReducedMotion` hook to disable animations if user prefers reduced motion
- Trigger: Animation happens once when element is 15% in view

## Visual Appearance

The animations work together to create a modern, subtle animation experience:

1. Page initially fades in
2. Background has continuous, slow-moving blur orbs for depth
3. Page sections sequentially animate in as the user scrolls down

Each of these animations will need to be recreated using CSS-only techniques while maintaining the same visual appearance and behavior.
