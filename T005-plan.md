# T005: Button Component Redesign Plan

## Current Analysis

### Existing Implementation

- Basic Bitcoin orange (#F7931A) background
- Simple hover/active states with hardcoded colors
- Basic responsive sizing (px-6 md:px-8, py-3 md:py-4)
- Simple shadows and transforms
- Good accessibility (min-height: 44px, motion-reduce support)

### Current Issues

1. **Override dependency**: HeroSection needs additional classes suggesting insufficient base styles
2. **Hardcoded colors**: No systematic color progression
3. **Basic visual depth**: Simple shadows, could be more sophisticated
4. **Typography inconsistency**: No built-in text sizing/weight standards

## Design Strategy

### Typography System

- **Font weight**: font-semibold (600) as default for prominence
- **Font size**: text-base (16px) mobile, text-lg (18px) tablet+
- **Letter spacing**: tracking-tight (-0.025em) for sophistication
- **Line height**: Optimized for button context

### Visual Enhancement

- **Background**: Sophisticated gradient from lighter to darker Bitcoin orange
- **Shadows**: Multi-layer shadow system for depth
- **Border radius**: Refined 12px (rounded-xl) for modern feel
- **Border**: Subtle inner border for definition

### Color System

- **Primary**: Bitcoin orange (#F7931A)
- **Hover**: Darker progression (#E0841A) with enhanced shadows
- **Active**: Even darker (#C77518) with reduced transform
- **Focus**: High contrast outline for accessibility

### Spacing & Sizing

- **Padding**: 16px horizontal, 12px vertical (mobile), scale up for desktop
- **Min height**: 48px for better touch targets
- **Responsive scaling**: Proper progression across breakpoints

### Interaction Design

- **Hover**: Lift effect with enhanced shadows and subtle color shift
- **Active**: Pressed state with reduced elevation
- **Focus**: Clear focus ring for keyboard navigation
- **Loading**: Future state consideration
- **Disabled**: Proper visual feedback

## Implementation Approach

1. Remove override classes from HeroSection usage
2. Build comprehensive base styles into Button component
3. Test accessibility and responsiveness
4. Ensure motion-reduce support is maintained
5. Verify logging integration continues to work
