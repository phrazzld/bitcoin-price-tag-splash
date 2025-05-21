# Implementation Plan: Enforce CSS-Only Animations by Refactoring Framer Motion Usage

## Overview

This plan outlines the steps to replace all Framer Motion animations with CSS-only alternatives in the Bitcoin Price Tag Splash Page, following the project constraint of "CSS animations only" mentioned in CLAUDE.md. This will help reduce JavaScript bundle size, simplify animation logic, and align with the project's principles of Simplicity First and Performance Optimization.

## Architecture Approach

We'll replace Framer Motion animations with CSS transitions and keyframe animations. For scroll-based animations, we'll use a lightweight JavaScript utility based on the IntersectionObserver API to toggle CSS classes that trigger animations.

### Components Affected

1. `app/page.tsx`: Root page component with initial fade-in animation
2. `components/animation/ScrollReveal.tsx`: Component that triggers animations on scroll
3. `components/ui/AnimatedBackground.tsx`: Background animation component
4. Any other components using Framer Motion animations

### New Components/Files to Create

1. `lib/utils/use-intersection-observer.ts`: Custom hook for intersection observer
2. CSS animation classes in `app/globals.css`

## Implementation Steps

1. **Measure Current Bundle Size**

   - Use Next.js built-in tools to measure the current bundle size
   - Save screenshots of current animations for visual comparison

2. **Create CSS Animation Utilities**

   - Add CSS animation classes to `app/globals.css`
   - Define base animation utility classes (fade-in, slide-up, etc.)
   - Add `@media (prefers-reduced-motion: reduce)` overrides

3. **Create Intersection Observer Hook**

   - Implement a custom React hook `useIntersectionObserver`
   - Handle `triggerOnce` behavior (unobserve after first intersection)
   - Include proper cleanup in `useEffect` returns

4. **Refactor AnimatedBackground Component**

   - Replace Framer Motion with CSS `@keyframes` animations
   - Use pure CSS for all animation effects

5. **Refactor Page-Level Fade-in**

   - Remove `motion.div` wrapper from `app/page.tsx`
   - Add a CSS class for page fade-in animation

6. **Refactor ScrollReveal Component**

   - Replace Framer Motion with CSS transitions
   - Use `useIntersectionObserver` to trigger class changes
   - Maintain the same props API where possible
   - Support custom animation timing, delay, and thresholds

7. **Test Animations**

   - Test all refactored animations across supported browsers
   - Verify animations respect `prefers-reduced-motion` preferences
   - Check for any console errors or performance issues

8. **Remove Framer Motion Dependency**

   - Run `pnpm remove framer-motion`
   - Verify package.json and lock file are updated
   - Check for any remaining Framer Motion imports

9. **Measure New Bundle Size**

   - Measure bundle size after changes
   - Document the size reduction achieved

10. **Code Cleanup and Documentation**
    - Remove any unused animation code
    - Add comments to explain animation approach
    - Update documentation if needed

## Testing Strategy

1. **Visual Testing**

   - Test all animations in test pages (`/test-*` routes)
   - Compare visual appearance with original animations
   - Test responsive behavior on different screen sizes

2. **Accessibility Testing**

   - Verify animations respect `prefers-reduced-motion` setting
   - Ensure content is still accessible if animations fail

3. **Browser Compatibility Testing**
   - Test on all supported browsers (Chrome, Firefox, Safari, Edge)
   - Verify graceful degradation where needed

## Risk Mitigation

1. **Visual Differences**

   - Carefully match timing, easing, and visual appearance
   - Use CSS variables for consistent animation parameters

2. **Accessibility**

   - Ensure proper media queries for reduced motion preferences
   - Content should be visible/accessible even if animations fail

3. **Browser Compatibility**
   - Use well-supported CSS properties
   - Test thoroughly on all target browsers
   - Plan for graceful degradation where needed

## Acceptance Criteria

1. All Framer Motion animations replaced with CSS equivalents
2. Visual appearance and animation quality remain consistent
3. Framer Motion dependency removed from package.json
4. Bundle size is reduced
5. Animations work correctly across supported browsers
6. Animations respect user preferences (`prefers-reduced-motion`)

## Branch Strategy

Create a feature branch using:

```bash
git checkout -b feature/css-only-animations
```
