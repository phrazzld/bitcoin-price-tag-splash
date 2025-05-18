# T018: Create HowItWorksSection.tsx Structure

## Task Classification: Simple

## Implementation Plan

Based on PLAN.md requirements, I will create a HowItWorksSection component with responsive vertical padding.

## Requirements

1. Create `components/sections/HowItWorksSection.tsx`
2. Apply section padding:
   - Desktop: 120px vertical
   - Mobile: 64px vertical

## Technical Implementation

1. **Component Structure**:
   - Functional React component with TypeScript
   - Use Container component for consistent grid alignment
   - Apply responsive padding with Tailwind CSS

2. **Styling Approach**:
   - Use Tailwind's responsive modifiers
   - Mobile-first: `py-16` (64px)
   - Desktop: `md:py-[120px]` (120px)

3. **Component Template**:
   ```tsx
   import React from "react";
   import Container from "../ui/Container";
   
   const HowItWorksSection: React.FC = () => {
     return (
       <section className="py-16 md:py-[120px]">
         <Container>
           {/* How it works content will go here */}
         </Container>
       </section>
     );
   };
   
   export default HowItWorksSection;
   ```

## Testing Plan

1. Create test page to verify section padding
2. Use browser developer tools to inspect computed styles
3. Verify responsive behavior at different breakpoints