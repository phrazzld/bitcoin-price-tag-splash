# Todo

## project setup

- [ ] **T001 · Chore · P0: initialize Next.js app with TypeScript and Tailwind**

  - **Context:** PLAN.md: Phase 1, Step 1
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
    2. Commit initial codebase to version control
  - **Done‑when:**
    1. Next.js app boots with TypeScript and Tailwind configured
  - **Verification:**
    1. Access app on localhost, see default Next.js welcome page
  - **Depends‑on:** none

- [ ] **T002 · Chore · P0: install and configure project dependencies**

  - **Context:** PLAN.md: Phase 1, Step 2
  - **Action:**
    1. Install `@fontsource-variable/inter`, `framer-motion`, `lucide-react` via pnpm
    2. Commit lockfile and dependencies
  - **Done‑when:**
    1. All dependencies installed and listed in package.json
  - **Verification:**
    1. `pnpm install` completes with no errors
  - **Depends‑on:** [T001]

- [ ] **T003 · Chore · P0: configure Tailwind for Swiss grid and color system**
  - **Context:** PLAN.md: Phase 1, Step 3
  - **Action:**
    1. Update `tailwind.config.ts` with custom color palette, spacing, fonts as per PLAN.md
    2. Enable 12-column grid and 24px gutters via Tailwind utilities
  - **Done‑when:**
    1. Tailwind config matches Swiss minimalism spec
  - **Verification:**
    1. Utility classes generate correct CSS in dev build
  - **Depends‑on:** [T002]

## base layout and structure

- [ ] **T004 · Feature · P0: implement global layout and base styles**

  - **Context:** PLAN.md: Code Structure `/app/layout.tsx`, `/app/globals.css`
  - **Action:**
    1. Create `layout.tsx` with font and color context
    2. Set up `globals.css` for font import, resets, and base typography
  - **Done‑when:**
    1. All pages render with Inter font and correct base styles
  - **Verification:**
    1. Typography and color palette render as per design system
  - **Depends‑on:** [T003]

- [ ] **T005 · Feature · P0: create Container component for responsive grid**
  - **Context:** PLAN.md: Components, Responsive Grid section
  - **Action:**
    1. Build `/components/ui/Container.tsx` implementing 12-col grid, 24px gutters, max-width 1200px, 8pt spacing
    2. Ensure mobile and desktop grid behavior per PLAN.md
  - **Done‑when:**
    1. Container renders children using correct responsive grid
  - **Verification:**
    1. Demo with test content at various screen sizes
  - **Depends‑on:** [T004]

## atomic UI components

- [ ] **T006 · Feature · P0: implement Button component per design system**

  - **Context:** PLAN.md: Buttons, Visual Components
  - **Action:**
    1. Create `/components/ui/Button.tsx` with Bitcoin orange, no border-radius, prescribed paddings, hover/active states
  - **Done‑when:**
    1. Button matches color, sizing, and interaction specs
  - **Verification:**
    1. Visual test in Storybook and app preview
  - **Depends‑on:** [T004]

- [ ] **T007 · Feature · P1: implement FeatureCard component with icon and text**

  - **Context:** PLAN.md: Feature Grid, Visual Components
  - **Action:**
    1. Build `/components/FeatureCard.tsx` with Lucide outline icon, H3, and two-line description
  - **Done‑when:**
    1. FeatureCard is reusable and visually aligned to spec
  - **Verification:**
    1. Storybook stories cover all three features
  - **Depends‑on:** [T005]

- [ ] **T008 · Feature · P1: implement StepCard component for How It Works**
  - **Context:** PLAN.md: How It Works
  - **Action:**
    1. Create `/components/StepCard.tsx` with step number, bordered screenshot, and description
  - **Done‑when:**
    1. Renders correctly for each step, border and spacing as specified
  - **Verification:**
    1. Storybook stories for each step
  - **Depends‑on:** [T005]

## navigation and page structure

- [ ] **T009 · Feature · P0: implement fixed Navigation bar with logo and CTA**
  - **Context:** PLAN.md: Navigation (Fixed)
  - **Action:**
    1. Build `/components/Navigation.tsx` with left logo and right Bitcoin orange CTA
    2. Add 64px height, 95% opacity backdrop blur, light/dark mode support
  - **Done‑when:**
    1. Navbar fixed, visually matches spec, CTA is tab-focusable
  - **Verification:**
    1. Keyboard navigation and color contrast check
  - **Depends‑on:** [T004], [T006]

## sections/organisms

- [ ] **T010 · Feature · P0: implement HeroSection with headline, subheading, CTA, and demo**

  - **Context:** PLAN.md: Hero Section, Key Implementation Details
  - **Action:**
    1. Build `/components/sections/HeroSection.tsx` with H1, subheading, primary CTA Button, and price conversion demo
    2. Center content, max-width 800px, full viewport minus nav
  - **Done‑when:**
    1. HeroSection displays and animates per design and demo
  - **Verification:**
    1. Demo shows "$99.99" → "0.00234584 BTC" with typing effect
    2. CTA is visually and functionally correct
  - **Depends‑on:** [T005], [T006], [T009]

- [ ] **T011 · Feature · P1: implement FeaturesSection as responsive feature grid**

  - **Context:** PLAN.md: Feature Grid
  - **Action:**
    1. Build `/components/sections/FeaturesSection.tsx` using three FeatureCard components in responsive grid (3-col desktop, 1-col mobile)
  - **Done‑when:**
    1. Section adapts layout at breakpoints, features have correct content
  - **Verification:**
    1. Visual test at mobile and desktop sizes
  - **Depends‑on:** [T007], [T005]

- [ ] **T012 · Feature · P1: implement HowItWorksSection with 3-step flow**

  - **Context:** PLAN.md: How It Works
  - **Action:**
    1. Build `/components/sections/HowItWorksSection.tsx` using StepCard components in horizontal/vertical layout per breakpoint
  - **Done‑when:**
    1. Steps flow horizontally (desktop), vertically (mobile), screenshots have 1px border
  - **Verification:**
    1. Visual test, tab order, and alt text for screenshots
  - **Depends‑on:** [T008], [T005]

- [ ] **T013 · Feature · P1: implement TestimonialsSection with quote and attribution**

  - **Context:** PLAN.md: Testimonials
  - **Action:**
    1. Create `/components/sections/TestimonialsSection.tsx` with large Bitcoin orange quotation marks, quote, author name/title
    2. Center all content
  - **Done‑when:**
    1. Section visually matches design
  - **Verification:**
    1. Color contrast and screen reader accessibility
  - **Depends‑on:** [T005]

- [ ] **T014 · Feature · P1: implement CTASection with headline and secondary button**

  - **Context:** PLAN.md: Final CTA
  - **Action:**
    1. Build `/components/sections/CTASection.tsx` with centered H2 and Button
  - **Done‑when:**
    1. Section spacing and alignment per design system
  - **Verification:**
    1. Button accessible and visible
  - **Depends‑on:** [T006], [T005]

- [ ] **T015 · Feature · P1: implement minimal Footer with copyright, GitHub, privacy**
  - **Context:** PLAN.md: Footer
  - **Action:**
    1. Create `/components/sections/Footer.tsx` as single-row, centered footer
    2. Add copyright, GitHub link, Privacy Policy
  - **Done‑when:**
    1. Footer is responsive and visually minimal
  - **Verification:**
    1. Links focusable and accessible
  - **Depends‑on:** [T005]

## page assembly and animation

- [ ] **T016 · Feature · P0: compose sections in home page**

  - **Context:** PLAN.md: Phase 4, `app/page.tsx`
  - **Action:**
    1. Import all section components into `app/page.tsx`
    2. Lay out in correct order with Container wrappers
  - **Done‑when:**
    1. Home page renders all sections in correct sequence
  - **Verification:**
    1. Full-page visual check, all sections appear
  - **Depends‑on:** [T010], [T011], [T012], [T013], [T014], [T015], [T009]

- [ ] **T017 · Feature · P1: implement scroll reveal animations with Framer Motion**

  - **Context:** PLAN.md: Animations, Page load/scroll
  - **Action:**
    1. Add fade-in on page load (300ms) to all sections
    2. Add simple scroll-based reveal where appropriate (no parallax)
  - **Done‑when:**
    1. Animations trigger on load/scroll, are subtle and performant
  - **Verification:**
    1. Manually verify animation on load and scroll, respect reduced motion preference
  - **Depends‑on:** [T016]

- [ ] **T018 · Feature · P1: implement price conversion typing animation in HeroSection**
  - **Context:** PLAN.md: Key Implementation Details, Hero Conversion Demo
  - **Action:**
    1. Animate "$99.99" converting to "0.00234584 BTC" via CSS typing effect (no JS libs)
  - **Done‑when:**
    1. Animation runs on load as described
  - **Verification:**
    1. Visually confirm type-and-convert effect
  - **Depends‑on:** [T010]

## polish and finishing

- [ ] **T019 · Feature · P0: make responsive adjustments for all breakpoints**

  - **Context:** PLAN.md: Polish, Responsive Grid, Responsive Design
  - **Action:**
    1. Ensure all sections/components adapt at mobile, tablet, desktop breakpoints
  - **Done‑when:**
    1. Layouts and UI scale and reposition correctly at all defined widths
  - **Verification:**
    1. Browser/device testing at breakpoints
  - **Depends‑on:** [T016]

- [ ] **T020 · Feature · P1: optimize typography scale and fluid sizing**

  - **Context:** PLAN.md: Typography Scale, Polish
  - **Action:**
    1. Apply fluid sizing to headings (clamp, rems), set line heights per spec
  - **Done‑when:**
    1. Typography is visually consistent and matches PLAN.md
  - **Verification:**
    1. Manual check—heading/body sizes and rhythm correct
  - **Depends‑on:** [T016]

- [ ] **T021 · Chore · P0: add meta tags and favicon for SEO and share**

  - **Context:** PLAN.md: Polish
  - **Action:**
    1. Add favicon, og-image, and meta tags to `app/layout.tsx` or head
  - **Done‑when:**
    1. Meta tags render correctly, favicon and og-image visible
  - **Verification:**
    1. Open page in browser, check head tags and favicon
  - **Depends‑on:** [T004]

- [ ] **T022 · Chore · P1: optimize performance for Core Web Vitals**
  - **Context:** PLAN.md: Performance Targets, Polish
  - **Action:**
    1. Audit LCP, FID, CLS and optimize images, fonts, bundle size
    2. Ensure bundle < 150KB
  - **Done‑when:**
    1. Lighthouse score 95+ and all metrics within targets
  - **Verification:**
    1. Run Lighthouse, confirm all criteria
  - **Depends‑on:** [T019], [T020]

## accessibility and testing

- [ ] **T023 · Feature · P0: ensure full accessibility and keyboard navigation**

  - **Context:** PLAN.md: Accessibility, Frontend Philosophy
  - **Action:**
    1. Verify color contrast (WCAG AA), tab order, semantic HTML, focus states, ARIA where needed
  - **Done‑when:**
    1. All UI is accessible to screen readers and keyboard users
  - **Verification:**
    1. Manual screen reader, keyboard, and axe-core checks
  - **Depends‑on:** [T019]

- [ ] **T024 · Test · P1: implement component and E2E tests for critical flows**
  - **Context:** PLAN.md: Performance Targets, Frontend Philosophy Testing
  - **Action:**
    1. Write unit and integration tests for all UI components
    2. Add E2E tests for "Add to Chrome" CTA and page render
  - **Done‑when:**
    1. Test coverage meets threshold; CTAs and user flows are tested
  - **Verification:**
    1. Tests run and pass; coverage report at/above target
  - **Depends‑on:** [T016]

## deployment and tracking

- [ ] **T025 · Chore · P0: deploy to Vercel with one-click workflow**

  - **Context:** PLAN.md: Deployment
  - **Action:**
    1. Set up Vercel project, connect repo, trigger deploy
  - **Done‑when:**
    1. Production URL live, builds pass, preview deploys enabled
  - **Verification:**
    1. Open site on Vercel URL, check all sections
  - **Depends‑on:** [T022]

- [ ] **T026 · Feature · P1: implement click tracking for "Add to Chrome" CTA**
  - **Context:** PLAN.md: Success Metrics
  - **Action:**
    1. Add click analytics to primary CTA button
    2. Ensure privacy-respecting, minimal tracking
  - **Done‑when:**
    1. Clicks on CTA are tracked and visible via analytics
  - **Verification:**
    1. Test click events and review analytics dashboard/log
  - **Depends‑on:** [T016]

## clarifications

- [ ] **Issue: clarify which analytics/tracking library or platform to use**

  - **Context:** PLAN.md: Success Metrics, click-through rate tracking
  - **Blocking?:** no

- [ ] **Issue: confirm testimonial content (quote, author, title) to display**

  - **Context:** PLAN.md: TestimonialsSection content not specified
  - **Blocking?:** no

- [ ] **Issue: provide final browser screenshots/images for HowItWorksSection**

  - **Context:** PLAN.md: "minimal, bordered" screenshots needed
  - **Blocking?:** no

- [ ] **Issue: confirm privacy policy link destination**
  - **Context:** PLAN.md: Footer privacy policy link
  - **Blocking?:** no
