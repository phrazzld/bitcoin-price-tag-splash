# T019: Implement Content and Flow for HowItWorksSection.tsx

## Task Classification: Simple

## Implementation Plan

Based on PLAN.md requirements, I will update the HowItWorksSection component to include a 3-step horizontal flow using StepCard components.

## Requirements

1. Use Container component (already implemented)
2. Implement a 3-step horizontal flow:
   - Use StepCard components
   - Horizontal layout on desktop
   - Stack vertically on mobile
3. Populate with placeholder content:
   - Numbers (1, 2, 3)
   - Screenshot placeholders
   - Brief descriptions

## Technical Implementation

1. **Layout Structure**:
   - Use flexbox for horizontal flow
   - Mobile-first approach with responsive breakpoints
   - Add appropriate spacing between steps

2. **Step Content**:
   ```
   Step 1:
   - Number: 1
   - Screenshot: Placeholder rectangle
   - Description: "Install the extension from Chrome Web Store"
   
   Step 2:
   - Number: 2
   - Screenshot: Placeholder rectangle
   - Description: "Browse any website with prices"
   
   Step 3:
   - Number: 3
   - Screenshot: Placeholder rectangle
   - Description: "See Bitcoin values automatically"
   ```

3. **Responsive Behavior**:
   - Mobile: Stack steps vertically (flex-col)
   - Desktop: Arrange horizontally (flex-row)
   - Gap between items for spacing

## Testing Plan

1. Verify horizontal flow on desktop
2. Check vertical stacking on mobile
3. Test StepCard rendering with placeholder content
4. Verify responsive breakpoints