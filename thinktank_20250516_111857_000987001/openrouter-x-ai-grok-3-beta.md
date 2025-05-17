# Todo

## Project Setup

- [ ] **T001 · Chore · P1: initialize next.js project with typescript**

  - **Context:** Implementation Steps - Phase 1: Setup
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`.
    2. Set up project structure in `/app` and `/components`.
  - **Done-when:**
    1. Project is initialized with TypeScript and Tailwind CSS.
  - **Verification:**
    1. Verify project runs with `pnpm dev` and displays default Next.js page.
  - **Depends-on:** none

- [ ] **T002 · Chore · P1: install project dependencies**

  - **Context:** Implementation Steps - Phase 1: Setup
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`.
  - **Done-when:**
    1. Dependencies are listed in `package.json`.
  - **Verification:**
    1. Verify no installation errors in console output.
  - **Depends-on:** [T001]

- [ ] **T003 · Chore · P1: configure tailwind css for swiss grid system**
  - **Context:** Implementation Steps - Phase 1: Setup
  - **Action:**
    1. Update `tailwind.config.ts` with custom colors, fonts, and spacing as per PLAN.md.
  - **Done-when:**
    1. Tailwind configuration includes Bitcoin orange, gray scale, Inter font, and custom spacing.
  - **Verification:**
    1. Verify custom styles are available by testing a class like `text-bitcoin-orange` in a component.
  - **Depends-on:** [T002]

## UI Components

- [ ] **T004 · Feature · P2: create navigation component**

  - **Context:** Page Structure - Navigation
  - **Action:**
    1. Create `Navigation.tsx` in `/components` with fixed height, backdrop blur, logo, and CTA.
  - **Done-when:**
    1. Component renders with 64px height, white/black background, logo on left, and download CTA on right.
  - **Verification:**
    1. Verify component displays correctly on desktop and mobile viewports.
  - **Depends-on:** [T003]

- [ ] **T005 · Feature · P2: create button component**

  - **Context:** Visual Components - Buttons
  - **Action:**
    1. Create `Button.tsx` in `/components/ui` with Bitcoin orange background, white text, and hover/active states.
  - **Done-when:**
    1. Button renders with specified styles and responds to hover/active states with color darkening.
  - **Verification:**
    1. Verify button styling matches design specs and interactions work across devices.
  - **Depends-on:** [T003]

- [ ] **T006 · Feature · P2: create feature card component**

  - **Context:** Page Structure - Feature Grid
  - **Action:**
    1. Create `FeatureCard.tsx` in `/components/ui` with icon, title, and description layout.
  - **Done-when:**
    1. Component displays a 24px icon, H3 title, and 2-line description.
  - **Verification:**
    1. Verify card layout is consistent across breakpoints (mobile: span 12, desktop: span 4).
  - **Depends-on:** [T003]

- [ ] **T007 · Feature · P2: create step card component**

  - **Context:** Page Structure - How It Works
  - **Action:**
    1. Create `StepCard.tsx` in `/components/ui` with number, screenshot, and description.
  - **Done-when:**
    1. Component renders large gray number, bordered screenshot, and concise description.
  - **Verification:**
    1. Verify step card layout adapts correctly to mobile and desktop views.
  - **Depends-on:** [T003]

- [ ] **T008 · Feature · P2: create container component for grid wrapper**
  - **Context:** Core Design System - Grid System
  - **Action:**
    1. Create `Container.tsx` in `/components/ui` with 12-column grid and 24px gutters.
  - **Done-when:**
    1. Component applies max-width of 1200px and responsive grid layout.
  - **Verification:**
    1. Verify grid spacing and column spans work across breakpoints.
  - **Depends-on:** [T003]

## Page Sections

- [ ] **T009 · Feature · P2: build hero section with conversion demo**

  - **Context:** Page Structure - Hero Section
  - **Action:**
    1. Create `HeroSection.tsx` in `/components/sections` with centered content, H1, subheading, CTA, and demo animation.
    2. Implement CSS-based typing effect for price conversion.
  - **Done-when:**
    1. Section renders with specified text, CTA button, and animation showing "$99.99" to "0.00234584 BTC".
  - **Verification:**
    1. Verify content is centered, animation plays smoothly, and height adjusts to viewport minus nav.
  - **Depends-on:** [T005, T008]

- [ ] **T010 · Feature · P2: build features section with grid layout**

  - **Context:** Page Structure - Feature Grid
  - **Action:**
    1. Create `FeaturesSection.tsx` in `/components/sections` with 3-column grid for desktop, 1-column for mobile.
    2. Include 3 feature cards with icons and text.
  - **Done-when:**
    1. Section displays 3 features with correct responsive layout.
  - **Verification:**
    1. Verify grid transitions correctly between breakpoints and content is readable.
  - **Depends-on:** [T006, T008]

- [ ] **T011 · Feature · P2: build how it works section with steps**

  - **Context:** Page Structure - How It Works
  - **Action:**
    1. Create `HowItWorksSection.tsx` in `/components/sections` with 3-step horizontal flow.
    2. Use StepCard for each step.
  - **Done-when:**
    1. Section renders 3 steps with numbers, screenshots, and descriptions.
  - **Verification:**
    1. Verify steps are displayed horizontally on desktop and stack on mobile.
  - **Depends-on:** [T007, T008]

- [ ] **T012 · Feature · P2: build testimonials section with quote**

  - **Context:** Page Structure - Testimonials
  - **Action:**
    1. Create `TestimonialsSection.tsx` in `/components/sections` with centered quote, Bitcoin orange quotation marks, and author details.
  - **Done-when:**
    1. Section renders quote with styled quotation marks and author info below.
  - **Verification:**
    1. Verify text is centered and quotation marks are visible on all screen sizes.
  - **Depends-on:** [T008]

- [ ] **T013 · Feature · P2: build final cta section**

  - **Context:** Page Structure - Final CTA
  - **Action:**
    1. Create `CTASection.tsx` in `/components/sections` with centered H2 and secondary CTA button.
  - **Done-when:**
    1. Section renders centered text and button with correct styling.
  - **Verification:**
    1. Verify alignment and button functionality across devices.
  - **Depends-on:** [T005, T008]

- [ ] **T014 · Feature · P2: build footer section**
  - **Context:** Page Structure - Footer
  - **Action:**
    1. Create `Footer.tsx` in `/components/sections` with copyright, GitHub link, and Privacy Policy.
  - **Done-when:**
    1. Footer renders as a single centered row with all required links.
  - **Verification:**
    1. Verify links are clickable and content is centered.
  - **Depends-on:** [T008]

## Assembly and Animations

- [ ] **T015 · Feature · P1: assemble page sections in main layout**

  - **Context:** Implementation Steps - Phase 4: Assembly
  - **Action:**
    1. Update `app/page.tsx` to include all sections in order with Navigation at top.
  - **Done-when:**
    1. All sections render in correct sequence on the home page.
  - **Verification:**
    1. Verify page structure matches PLAN.md layout on load.
  - **Depends-on:** [T004, T009, T010, T011, T012, T013, T014]

- [ ] **T016 · Feature · P2: add scroll animations with framer motion**

  - **Context:** Animations - Philosophy
  - **Action:**
    1. Implement subtle fade-in animations for sections using Framer Motion.
  - **Done-when:**
    1. Sections animate on scroll with 300ms fade-in effect.
  - **Verification:**
    1. Verify animations trigger on scroll without performance lag.
  - **Depends-on:** [T015]

- [ ] **T017 · Feature · P2: implement hero conversion demo animation**
  - **Context:** Key Implementation Details - Hero Conversion Demo
  - **Action:**
    1. Refine CSS animation in `HeroSection.tsx` for type-and-convert effect.
  - **Done-when:**
    1. Animation completes cycle from "$99.99" to "0.00234584 BTC" smoothly.
  - **Verification:**
    1. Verify animation timing and visibility on various devices.
  - **Depends-on:** [T009]

## Polish and Optimization

- [ ] **T018 · Feature · P2: adjust responsive layouts for all breakpoints**

  - **Context:** Implementation Steps - Phase 5: Polish
  - **Action:**
    1. Test and tweak CSS for mobile (320-768px), tablet (768-1024px), and desktop (1024px+).
  - **Done-when:**
    1. All sections render correctly across specified breakpoints.
  - **Verification:**
    1. Verify layout integrity using browser dev tools for each breakpoint.
  - **Depends-on:** [T015]

- [ ] **T019 · Refactor · P2: optimize typography scale for readability**

  - **Context:** Implementation Steps - Phase 5: Polish
  - **Action:**
    1. Implement fluid typography with `clamp` as per PLAN.md.
  - **Done-when:**
    1. Typography scales smoothly across devices with correct line heights.
  - **Verification:**
    1. Verify text sizes match design specs at various viewport widths.
  - **Depends-on:** [T018]

- [ ] **T020 · Chore · P2: add meta tags and favicon for branding**

  - **Context:** Implementation Steps - Phase 5: Polish
  - **Action:**
    1. Update `app/layout.tsx` with meta tags and add favicon in `/public`.
  - **Done-when:**
    1. Meta tags are present in HTML head and favicon displays in browser tab.
  - **Verification:**
    1. Verify favicon loads and meta tags are visible in page source.
  - **Depends-on:** [T015]

- [ ] **T021 · Refactor · P2: optimize performance for web vitals**
  - **Context:** Performance Targets
  - **Action:**
    1. Optimize images, minimize JS bundle, and ensure LCP < 2.5s, FID < 100ms, CLS < 0.1.
  - **Done-when:**
    1. Lighthouse score is 95+ and bundle size is under 150KB.
  - **Verification:**
    1. Run Lighthouse test and confirm metrics meet targets.
  - **Depends-on:** [T018]

## Accessibility and Metrics

- [ ] **T022 · Feature · P2: ensure accessibility compliance**

  - **Context:** Accessibility
  - **Action:**
    1. Implement semantic HTML, keyboard navigation, and WCAG AA color contrast.
  - **Done-when:**
    1. Page passes automated accessibility checks with no major violations.
  - **Verification:**
    1. Test with axe-core tool and verify keyboard navigation works for all interactive elements.
  - **Depends-on:** [T015]

- [ ] **T023 · Feature · P2: track success metrics for cta clicks**
  - **Context:** Success Metrics
  - **Action:**
    1. Add event tracking for "Add to Chrome" button clicks.
  - **Done-when:**
    1. Click events are logged for analytics.
  - **Verification:**
    1. Verify click events are captured in console or analytics tool.
  - **Depends-on:** [T015]

## Clarifications & Assumptions

- [ ] **Issue:** ambiguity in navigation background color toggle\*\*

  - **Context:** Page Structure - Navigation (White/Black background)
  - **Blocking?:** no

- [ ] **Issue:** lack of specific content for testimonials quote\*\*

  - **Context:** Page Structure - Testimonials
  - **Blocking?:** no

- [ ] **Issue:** unclear source for screenshot assets in how it works section\*\*
  - **Context:** Page Structure - How It Works
  - **Blocking?:** no
