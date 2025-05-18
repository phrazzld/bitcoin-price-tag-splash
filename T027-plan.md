# T027: Implement page load fade-in animation

## Task Overview
Add a 300ms fade-in animation to the main page content on initial load using Framer Motion.

## Implementation Approach

1. **Determine animation target**
   - Apply animation to the entire page content
   - Use the root layout or main content wrapper

2. **Choose animation location**
   - Either app/layout.tsx (for all pages)
   - Or app/page.tsx (for homepage only)
   - Based on the task, will implement in app/page.tsx

3. **Implement Framer Motion animation**
   - Import motion components from framer-motion
   - Wrap content in motion.div
   - Configure initial and animate states
   - Set transition duration to 300ms

4. **Consider accessibility**
   - Respect prefers-reduced-motion
   - Use proper animation properties

## Technical Details
- Use Framer Motion's motion.div component
- Initial state: opacity: 0
- Animate to: opacity: 1
- Duration: 300ms
- Animation trigger: on mount