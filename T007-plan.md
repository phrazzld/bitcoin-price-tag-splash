# T007: Create FeatureCard.tsx Component

## Implementation Plan

Based on the requirements from PLAN.md for the Feature Grid section, I will create a FeatureCard component with the following structure:

1. Component Structure:

   - Use our existing Icon component for the 24px icon
   - H3 element for the feature title
   - Paragraph element for the 2-line description

2. Design Implementation:

   - Follow the Swiss Minimalism principles established in the project
   - Use our existing color palette (Bitcoin orange, gray scale)
   - Apply appropriate spacing using the 8-point grid system
   - Ensure the component is mobile-responsive

3. Props Interface:

   - icon: IconName (from our Icon component)
   - title: string
   - description: string

4. Styling:

   - Use Tailwind CSS classes for consistency
   - Spacing: Apply appropriate margins/padding based on the design system
   - Typography: Use font weights and sizes consistent with other components

5. Client Component:
   - Mark as 'use client' if needed (likely not needed unless it has interactive elements)
