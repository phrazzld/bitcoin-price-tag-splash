# T035 Plan - Fix focus indicator visibility during animations

## Current State Analysis

### Focus Implementation Issues Identified

1. **Conflicting Focus Styles**

   - Global `:focus-visible` uses box-shadow approach
   - Button component uses `focus:ring` utilities but also has `focus:outline-none`
   - Potential conflict between global and component-specific styles

2. **Transform-Related Issues**

   - Button has `hover:-translate-y-0.5` and `active:translate-y-0` transforms
   - Transforms can affect stacking context and clip focus indicators
   - No explicit z-index management for focus states

3. **Components with Interactive Elements**
   - Button (used in Navigation, HeroSection, CTASection)
   - Footer links (with hover color transitions)
   - Navigation logo (₿ symbol - not focusable but could be)

## Implementation Strategy

### Phase 1: Standardize Focus Approach

- Decide between box-shadow (global) vs ring (Tailwind) approach
- Ensure consistency across all interactive elements
- Remove conflicting styles

### Phase 2: Fix Transform Issues

- Add proper z-index management for focus states
- Use `isolate` utility class or explicit z-index for transformed elements
- Ensure focus indicators are not clipped by parent containers

### Phase 3: Enhance Interactive Elements

- Add focus styles to all interactive elements (links, buttons)
- Ensure consistent focus behavior across components
- Test keyboard navigation flow

## Implementation Steps

1. **Update Global Focus Styles**

   - Enhance the global `:focus-visible` implementation
   - Add z-index to ensure visibility above transformed elements
   - Consider using CSS custom properties for consistency

2. **Fix Button Component**

   - Remove conflicting `focus:outline-none`
   - Choose between global box-shadow or Tailwind ring approach
   - Add `relative z-10` during focus to ensure visibility
   - Test with transforms active

3. **Update Footer Links**

   - Add explicit focus styles to match the design system
   - Ensure focus is visible during hover transitions
   - Add proper z-index if needed

4. **Navigation Enhancements**

   - Ensure logo is not keyboard focusable (decorative)
   - Verify Button focus works within fixed navigation
   - Test z-index stacking with fixed positioning

5. **Testing Strategy**
   - Create comprehensive keyboard navigation test
   - Test all interactive elements in different states
   - Verify focus visibility during animations/transforms
   - Test across browsers (Chrome, Firefox, Safari)

## Technical Approach

### Option 1: Global Box-Shadow (Recommended)

```css
:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px white,
    0 0 0 4px var(--color-bitcoin-orange);
  position: relative;
  z-index: 10;
}
```

### Option 2: Component-Specific Ring

```tsx
// Remove from Button
focus:outline-none

// Keep or enhance
focus-visible:ring-2
focus-visible:ring-bitcoin-orange
focus-visible:ring-offset-2
focus-visible:relative
focus-visible:z-10
```

## Success Criteria

- All interactive elements have visible focus indicators
- Focus indicators remain visible during transforms/animations
- Keyboard navigation works smoothly without visual glitches
- Focus styles are consistent across the application
- No z-index conflicts or clipped focus indicators
- Implementation passes WCAG 2.1 AA Focus Visible (2.4.7)

## Files to Modify

1. `app/globals.css` - Enhance global focus styles
2. `components/ui/Button.tsx` - Fix conflicting focus styles
3. `components/sections/Footer.tsx` - Add focus styles to links
4. `components/Navigation.tsx` - Verify focus behavior
5. Create test page to validate all focus states
