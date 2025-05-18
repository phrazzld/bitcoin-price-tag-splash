# T014: Add Content to HeroSection.tsx

## Task Classification: Simple

## Implementation Plan

Based on PLAN.md requirements, I will update the HeroSection component to include:

1. **Content Elements**:
   - H1: "See Bitcoin prices everywhere"
   - Subheading: "Convert any price to Bitcoin automatically"
   - Primary CTA: "Add to Chrome" button (Bitcoin orange)

2. **Typography Requirements**:
   - H1: Use Tailwind's text-5xl or text-6xl (from PLAN.md: 3.5rem = 56px)
   - Subheading: Use text-base or text-lg for body text
   - Apply Inter font weights as specified

3. **Spacing Requirements** (from PLAN.md):
   - Paragraph spacing: 24px (mb-6 in Tailwind)
   - Component spacing: 48px (mb-12 in Tailwind)

4. **Button Integration**:
   - Import Button component from ui/Button.tsx
   - Apply Bitcoin orange styling (already implemented in Button)
   - Add appropriate onClick handler placeholder

5. **Implementation Details**:
   - Remove placeholder content
   - Add semantic HTML structure
   - Apply responsive typography (using clamp as per PLAN.md)
   - Center-align text as per current layout