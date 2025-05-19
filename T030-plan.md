# T030 Plan: Implement and Optimize Fluid Typography Scale

## Objective
Apply fluid typography to H1 elements and ensure all typographic elements follow the design system specifications.

## Implementation Approach

1. **Identify H1 Elements**
   - Locate all H1 elements in the codebase (likely in HeroSection.tsx)
   - Apply the specified clamp() function: `font-size: clamp(2rem, 5vw, 3.5rem);`

2. **Review Typography Scale**
   - Check all heading levels (H1, H2, H3) and body text
   - Ensure they use rem-based sizes according to the design system:
     - H1: 56px (3.5rem)
     - H2: 40px (2.5rem)
     - H3: 24px (1.5rem)
     - Body: 16px (1rem)
     - Small: 14px (0.875rem)
   - Verify line heights match specifications

3. **Verify Consistency**
   - Ensure typography scale is consistent across all components
   - Check that all text elements properly inherit from the base font settings

## Files to Modify
- HeroSection.tsx (primary location for H1)
- Potentially other section components if they contain typography that needs adjustment
- Global CSS if base typography settings need updating

## Testing
- Test fluid typography by resizing browser window
- Verify H1 scales between 2rem and 3.5rem based on viewport width
- Check that all typography maintains proper hierarchy and readability across breakpoints