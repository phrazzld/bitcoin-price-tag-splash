# T036 Plan - Add ARIA attributes for animated elements

## Current State Analysis

### Existing ARIA Implementation ✅

- **TestimonialsSection**: Has `aria-hidden="true"` for decorative quote mark
- **Layout**: Has proper `lang="en"` attribute

### Components Needing ARIA Attributes

1. **HeroSection** - Price conversion animation

   - Typewriter animation shows meaningful content ($99.99 → 0.00234584 BTC)
   - Arrow icon is decorative
   - Background patterns are decorative

2. **AnimatedBackground** - Floating orbs

   - All elements are purely decorative
   - Should be hidden from screen readers

3. **Navigation** - Logo and branding

   - Bitcoin symbol (₿) is decorative
   - Needs proper navigation semantics

4. **ScrollReveal** - Content wrapper
   - Wrapper itself doesn't need ARIA
   - Should not interfere with child content accessibility

## Implementation Strategy

### Phase 1: Mark Decorative Elements

- Add `aria-hidden="true"` to all decorative animated elements
- Ensure screen readers focus on meaningful content only

### Phase 2: Enhance Semantic Elements

- Add proper `aria-label` attributes for informational animations
- Implement `role` attributes where semantic HTML is insufficient

### Phase 3: Test Screen Reader Experience

- Verify content is announced appropriately
- Ensure no redundant or confusing announcements

## Implementation Steps

1. **Update HeroSection**

   - Add `aria-label` to price conversion container
   - Add `aria-hidden="true"` to decorative arrow and backgrounds
   - Ensure conversion example is accessible but not distracting

2. **Update AnimatedBackground**

   - Add `aria-hidden="true"` to floating orbs
   - Add `aria-hidden="true"` to grid pattern
   - Ensure entire component is hidden from screen readers

3. **Enhance Navigation**

   - Add `aria-label` to navigation
   - Add `aria-hidden="true"` to decorative Bitcoin symbol
   - Ensure logo text remains accessible

4. **Test ScrollReveal**

   - Verify it doesn't interfere with child content accessibility
   - Ensure content is announced when it becomes visible

5. **Create Comprehensive Test**
   - Add screen reader testing guidelines
   - Document expected announcements for each component

## Technical Approach

### ARIA Attributes to Implement

```typescript
// HeroSection
<div aria-label="Price conversion demonstration: 99 dollars 99 cents converts to 0.00234584 Bitcoin">
<svg aria-hidden="true">
<div aria-hidden="true"> // decorative backgrounds

// AnimatedBackground
<div aria-hidden="true"> // entire component

// Navigation
<nav aria-label="Main navigation">
<span aria-hidden="true">₿</span> // decorative symbol
```

### Accessibility Principles

- Follow WCAG 2.1 AA guidelines
- Don't over-label - be concise and meaningful
- Mark decorative content as `aria-hidden="true"`
- Ensure informational content has appropriate labels
- Test with actual screen readers

## Success Criteria

- All decorative animated elements are hidden from screen readers
- Informational animations have appropriate labels
- Navigation has proper semantic structure
- No redundant or confusing announcements
- Screen reader testing validates implementation
- Content remains accessible during all animation states

## Files to Modify

1. `components/sections/HeroSection.tsx` - Add ARIA labels and hide decorative elements
2. `components/ui/AnimatedBackground.tsx` - Hide decorative animations
3. `components/Navigation.tsx` - Enhance navigation semantics
4. Create accessibility test documentation
