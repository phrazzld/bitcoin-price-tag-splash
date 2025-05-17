# T013: Create HeroSection.tsx Structure and Layout

## Task Classification: Simple

## Implementation Plan

Based on the requirements from PLAN.md, I will create a HeroSection component with the following specifications:

1. **File Location**: `components/sections/HeroSection.tsx`

2. **Layout Requirements**:
   - Height: `100vh - 64px` (full viewport height minus navigation height)
   - Content: Centered both horizontally and vertically
   - Content max-width: 800px
   - Use Container component for consistent grid alignment

3. **Technical Implementation**:
   - Use React functional component with TypeScript
   - Apply Tailwind CSS classes for styling
   - Use `calc(100vh - 64px)` for height calculation
   - Use flexbox for centering content
   - Apply max-width constraint on inner content

4. **Component Structure**:
   ```tsx
   HeroSection
   └── Container (from ui/Container.tsx)
       └── Centered content wrapper (max-width: 800px)
           └── Placeholder content
   ```

5. **Testing Approach**:
   - Create test page to verify dimensions
   - Check content alignment in browser
   - Verify responsive behavior