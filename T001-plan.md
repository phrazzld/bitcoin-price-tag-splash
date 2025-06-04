# T001: Typography Improvement Plan

## Current Issues

1. **Font sizing**: Using `clamp(2.5rem, 6vw, 4rem)` doesn't align with 8pt grid system
2. **Line height**: 1.1 is too tight for readability
3. **Letter spacing**: No explicit letter spacing, could improve readability
4. **Color integration**: "everywhere" span feels disconnected
5. **Spacing**: mb-8 might need adjustment for better hierarchy

## Typography Scale (8pt Grid Aligned)

- **Mobile**: 40px (2.5rem) - fits 8pt grid
- **Tablet**: 56px (3.5rem) - fits 8pt grid
- **Desktop**: 64px (4rem) - fits 8pt grid

## Improvements

1. **Line Height**: Increase to 1.25 for better readability
2. **Letter Spacing**: Add slight negative spacing (-0.02em) for sophistication
3. **Font Weight**: Keep font-bold but consider font-black for better presence
4. **Color Treatment**: Improve "everywhere" integration with subtle spacing
5. **Margin**: Increase to mb-12 (48px) for better hierarchy

## Implementation

- Update HeroSection.tsx with new typography classes
- Create responsive font sizing using Tailwind responsive prefixes
- Add proper letter spacing and line height
- Improve spacing relationships
