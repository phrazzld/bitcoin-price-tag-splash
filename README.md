# Bitcoin Price Tag Splash Page

A modern splash page for the Bitcoin Price Tag browser extension, built with Next.js, React, TypeScript, and Tailwind CSS, featuring CSS-only animations for optimal performance and accessibility.

## Getting Started

This project uses pnpm as the package manager. Other package managers (npm, yarn, bun) are not supported.

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Development Standards

This project follows strict code quality standards enforced by automated tools:

- TypeScript with strict mode enabled
- Prettier for code formatting
- ESLint with strict type-aware rules
- Pre-commit hooks via Husky and lint-staged
- CI pipeline with formatting and linting checks

For detailed information about our code quality standards and development workflow, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Animation System

This project uses CSS-only animations for improved performance and accessibility:

- CSS keyframes animations with custom easing and timing functions
- CSS transitions for scroll-reveal effects
- Intersection Observer API for triggering scroll-based animations
- Proper support for `prefers-reduced-motion` user preference
- No JavaScript animation libraries needed

Animation documentation can be found in:

- `/docs/animation_baselines/after/css-animations.md` - Animation implementation details
- `/docs/animation_baselines/after/bundle-size.md` - Performance benefits
- Test pages in `/app/test-*/page.tsx` provide visual demonstrations of each animation type

### Testing Animation Components

For visual testing of animation components, visit these routes:

- `/test-animated-background` - Tests the floating orbs animation
- `/test-page-fade-in` - Tests the page fade-in animation
- `/test-scroll-reveal` - Tests the scroll-triggered reveal animations
- `/test-all-animations` - Comprehensive test of all animation types
<!-- CI Cache Test 1 -->
