# Tailwind CSS v4 Configuration Fix

## Issue
- The project uses Tailwind CSS v4 but had v3-style configuration
- Console errors about unknown utility classes like `bg-bitcoin-orange`

## Solution
1. Removed old tailwind.config.ts (v3 style)
2. Updated app/globals.css to use v4 syntax:
   - Used `@import "tailwindcss/theme"` and `@import "tailwindcss/utilities"`
   - Defined custom colors as CSS variables in `:root`
   - Created custom utility classes manually for bitcoin-orange color
3. Removed unnecessary config files

## Key Changes
- Custom colors are now CSS variables: `--color-bitcoin-orange`
- Custom utilities are defined explicitly in CSS
- No JavaScript/TypeScript config file needed for v4

## Files Modified
- app/globals.css - Complete rewrite for v4 compatibility
- Removed: tailwind.config.ts, tailwind.config.js, tailwind.config.css, app/tailwind.css

This fixes the console errors and maintains all visual styling.