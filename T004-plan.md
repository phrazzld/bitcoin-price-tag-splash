# T004: Set up Global CSS and Inter Font - Plan

## Objective

Configure the Inter Variable font as the default sans-serif font and clean up global CSS to ensure Tailwind controls styling.

## Implementation Approach

1. Import the Inter Variable font in `app/layout.tsx`

   - This is preferred over globals.css for Next.js font optimization

2. Clean up `app/globals.css`

   - Remove any base styles that conflict with Tailwind
   - Keep only essential global styles
   - Ensure Tailwind controls most styling

3. Verify the font is properly configured
   - The Inter font should already be set as the default in tailwind.config.ts (from T003)
   - Make sure the font is properly loaded and applied

## Steps

1. Import `@fontsource-variable/inter` in layout.tsx
2. Remove unnecessary styles from globals.css that were added by default Next.js template
3. Keep only Tailwind imports and minimal base styles
4. Test that Inter font is loaded and applied correctly
