# T002: Bitcoin Amount Display Redesign Plan

## Current Implementation Analysis

- Animated typewriter effect with USD → BTC conversion
- Monospace font (Monaco, Courier New)
- Current size: 2rem mobile, 2.5rem desktop
- Complex CSS animations for typing effect
- Good accessibility support (prefers-reduced-motion)

## Issues to Address

1. **Typography**: Font stack could be improved, sizing could be more prominent
2. **Visual hierarchy**: Needs to be more focal point of the page
3. **Number formatting**: Could have better spacing and emphasis
4. **Monospace font**: Should use more modern font stack
5. **Size**: Could be larger to match the improved headline

## Design Improvements

### Typography

- **Font stack**: Use modern monospace fonts (Fira Code, SF Mono, Monaco, Courier New)
- **Size**: Increase to 2.5rem mobile, 3rem tablet, 3.5rem desktop
- **Weight**: Maintain font-weight: 700 for prominence
- **Line height**: Optimize for better visual balance

### Visual Enhancements

- **Container size**: Increase padding and dimensions proportionally
- **Background**: Enhance gradient and shadow for more depth
- **Border radius**: Adjust to match new size
- **Spacing**: Increase margin to create more visual separation

### Number Formatting

- **BTC highlighting**: Make Bitcoin amount more prominent with color
- **Spacing**: Improve letter spacing for better readability
- **Animation timing**: Keep existing animation but enhance visual appeal

## Implementation Approach

- Update CSS module with new sizing and typography
- Improve font stack for better cross-platform support
- Enhance visual styling while preserving animations
- Maintain accessibility features
- Test responsive behavior
