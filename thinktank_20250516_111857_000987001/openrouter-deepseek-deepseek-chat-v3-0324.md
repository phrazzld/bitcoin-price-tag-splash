# Todo

## Project Setup

- [ ] **T001 · Chore · P0: Initialize Next.js project with TypeScript and Tailwind**

  - **Context:** Phase 1: Setup
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
    2. Verify project structure and configuration
  - **Done-when:**
    1. Next.js project is created with TypeScript and Tailwind configured
  - **Depends-on:** none

- [ ] **T002 · Chore · P0: Install required dependencies**

  - **Context:** Phase 1: Setup
  - **Action:**
    1. Install `@fontsource-variable/inter`, `framer-motion`, and `lucide-react`
  - **Done-when:**
    1. Dependencies are installed and listed in package.json
  - **Depends-on:** T001

- [ ] **T003 · Chore · P0: Configure Tailwind with design system values**
  - **Context:** Phase 1: Setup, Core Design System
  - **Action:**
    1. Update tailwind.config.ts with color palette, font family, and spacing values
  - **Done-when:**
    1. Tailwind config matches design system specifications
  - **Depends-on:** T001

## Atomic Components

- [ ] **T004 · Feature · P1: Create Container component**

  - **Context:** Phase 2: Components, Grid System
  - **Action:**
    1. Implement 12-column grid container with 24px gutters
    2. Add responsive breakpoints
  - **Done-when:**
    1. Container component passes visual and responsive tests
  - **Depends-on:** T003

- [ ] **T005 · Feature · P1: Create Button component**

  - **Context:** Visual Components - Buttons
  - **Action:**
    1. Implement primary button with Bitcoin orange color
    2. Add hover and active states
  - **Done-when:**
    1. Button matches design specs and passes accessibility checks
  - **Depends-on:** T003

- [ ] **T006 · Feature · P1: Create FeatureCard component**

  - **Context:** Feature Grid section
  - **Action:**
    1. Implement card with icon, title, and description
    2. Make responsive (1 col mobile, 3 col desktop)
  - **Done-when:**
    1. Card renders correctly at all breakpoints
  - **Depends-on:** T004, T005

- [ ] **T007 · Feature · P1: Create StepCard component**
  - **Context:** How It Works section
  - **Action:**
    1. Implement step component with number, screenshot, and description
  - **Done-when:**
    1. Step component matches design specs
  - **Depends-on:** T004

## Page Sections

- [ ] **T008 · Feature · P1: Implement Navigation component**

  - **Context:** Navigation section
  - **Action:**
    1. Create fixed 64px height navigation
    2. Add logo and CTA button
  - **Done-when:**
    1. Navigation is fixed and matches design
  - **Depends-on:** T005

- [ ] **T009 · Feature · P1: Implement HeroSection**

  - **Context:** Hero Section
  - **Action:**
    1. Create centered hero with title, subtitle, and CTA
    2. Implement price conversion animation
  - **Done-when:**
    1. Hero section renders correctly with working demo
  - **Depends-on:** T005, T008

- [ ] **T010 · Feature · P1: Implement FeaturesSection**

  - **Context:** Feature Grid section
  - **Action:**
    1. Create 3-feature grid using FeatureCard
  - **Done-when:**
    1. Feature grid is responsive and matches design
  - **Depends-on:** T006

- [ ] **T011 · Feature · P1: Implement HowItWorksSection**

  - **Context:** How It Works section
  - **Action:**
    1. Create 3-step horizontal flow using StepCard
  - **Done-when:**
    1. Steps display correctly at all breakpoints
  - **Depends-on:** T007

- [ ] **T012 · Feature · P1: Implement TestimonialsSection**

  - **Context:** Testimonials section
  - **Action:**
    1. Create centered quote component with Bitcoin orange quotation marks
  - **Done-when:**
    1. Testimonial matches design specs
  - **Depends-on:** T004

- [ ] **T013 · Feature · P1: Implement CTASection**

  - **Context:** Final CTA section
  - **Action:**
    1. Create centered CTA with heading and button
  - **Done-when:**
    1. CTA section matches design
  - **Depends-on:** T005

- [ ] **T014 · Feature · P1: Implement Footer**
  - **Context:** Footer section
  - **Action:**
    1. Create minimal footer with copyright and links
  - **Done-when:**
    1. Footer matches design specs
  - **Depends-on:** T004

## Page Assembly

- [ ] **T015 · Feature · P1: Assemble page sections**

  - **Context:** Phase 4: Assembly
  - **Action:**
    1. Compose all sections in app/page.tsx
    2. Add proper spacing between sections
  - **Done-when:**
    1. All sections are properly ordered and spaced
  - **Depends-on:** T008-T014

- [ ] **T016 · Feature · P1: Add scroll animations**
  - **Context:** Phase 4: Assembly, Animations
  - **Action:**
    1. Implement subtle scroll reveal animations with Framer Motion
  - **Done-when:**
    1. Animations work as specified
  - **Depends-on:** T015

## Polish

- [ ] **T017 · Refactor · P2: Optimize typography scale**

  - **Context:** Phase 5: Polish, Typography
  - **Action:**
    1. Implement fluid typography with clamp()
  - **Done-when:**
    1. Text scales properly across viewport sizes
  - **Depends-on:** T015

- [ ] **T018 · Chore · P2: Add meta tags and favicon**

  - **Context:** Phase 5: Polish
  - **Action:**
    1. Add SEO meta tags
    2. Add favicon
  - **Done-when:**
    1. Metadata is complete and favicon displays
  - **Depends-on:** none

- [ ] **T019 · Chore · P2: Performance optimization**
  - **Context:** Phase 5: Polish, Performance Targets
  - **Action:**
    1. Optimize images
    2. Implement code splitting
  - **Done-when:**
    1. Lighthouse score meets targets
  - **Depends-on:** T015

## Verification

- [ ] **T020 · Test · P1: Implement responsive tests**

  - **Context:** Core Design System - Breakpoints
  - **Action:**
    1. Test all components at mobile, tablet, and desktop breakpoints
  - **Done-when:**
    1. All components pass responsive tests
  - **Depends-on:** T015

- [ ] **T021 · Test · P1: Implement accessibility tests**
  - **Context:** Accessibility requirements
  - **Action:**
    1. Run axe-core tests
    2. Verify keyboard navigation
  - **Done-when:**
    1. All accessibility checks pass
  - **Depends-on:** T015
