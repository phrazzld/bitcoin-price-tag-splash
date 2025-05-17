# Todo

## Project Setup

- [ ] **T001 · Chore · P0: Initialize Next.js project with TypeScript and Tailwind**

  - **Context:** Phase 1: Setup step 1
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
    2. Verify project structure creation
  - **Done‑when:**
    1. Basic Next.js app structure exists with TypeScript and Tailwind configured
  - **Depends‑on:** none

- [ ] **T002 · Chore · P0: Install required dependencies**

  - **Context:** Phase 1: Setup step 2
  - **Action:**
    1. Install @fontsource-variable/inter, framer-motion, and lucide-react
  - **Done‑when:**
    1. package.json includes all dependencies
  - **Depends‑on:** T001

- [ ] **T003 · Chore · P1: Configure Tailwind for Swiss grid system**
  - **Context:** Phase 1: Setup step 3
  - **Action:**
    1. Create tailwind.config.ts with specified color palette
    2. Implement 12-column grid and 8pt spacing system
  - **Done‑when:**
    1. Tailwind config matches design system specifications
  - **Verification:**
    1. Test grid layout with sample content
  - **Depends‑on:** T001

## Core Components

- [ ] **T004 · Feature · P1: Create Navigation component**

  - **Context:** Phase 2: Components 1
  - **Action:**
    1. Implement fixed 64px height navigation
    2. Add logo placeholder and CTA button
  - **Done‑when:**
    1. Navigation works on all screen sizes with backdrop blur
  - **Verification:**
    1. Test sticky behavior and mobile menu
  - **Depends‑on:** T005

- [ ] **T005 · Feature · P1: Implement Button component**

  - **Context:** Visual Components/Buttons
  - **Action:**
    1. Create primary button with Bitcoin Orange styling
    2. Implement hover/active states
  - **Done‑when:**
    1. Button matches design specs in all states
  - **Verification:**
    1. Check contrast ratios and touch targets

- [ ] **T006 · Feature · P1: Build FeatureCard component**

  - **Context:** Phase 2: Components 3
  - **Action:**
    1. Create card layout with icon slot
    2. Implement responsive grid behavior
  - **Done‑when:**
    1. Cards display 3-column desktop/1-column mobile
  - **Depends‑on:** T003

- [ ] **T007 · Feature · P1: Develop StepCard component**
  - **Context:** Phase 2: Components 4
  - **Action:**
    1. Create numbered step component
    2. Add screenshot container and description
  - **Done‑when:**
    1. Steps display horizontally on desktop
  - **Depends‑on:** T003

## Page Sections

- [ ] **T008 · Feature · P2: Implement HeroSection with conversion demo**

  - **Context:** Phase 3: Sections 1
  - **Action:**
    1. Create 100vh hero section
    2. Add price conversion animation
  - **Done‑when:**
    1. Demo shows "$X.XX → X.XXXXXX BTC" transition
  - **Verification:**
    1. Test animation smoothness
  - **Depends‑on:** T005

- [ ] **T009 · Feature · P2: Build FeaturesSection grid**

  - **Context:** Phase 3: Sections 2
  - **Action:**
    1. Map features array to FeatureCard components
    2. Implement responsive grid layout
  - **Done‑when:**
    1. All features display correctly on mobile/desktop
  - **Depends‑on:** T006

- [ ] **T010 · Feature · P2: Create HowItWorksSection**

  - **Context:** Phase 3: Sections 3
  - **Action:**
    1. Layout three StepCards in horizontal flow
    2. Add responsive behavior
  - **Done‑when:**
    1. Steps stack vertically on mobile
  - **Depends‑on:** T007

- [ ] **T011 · Feature · P2: Implement TestimonialsSection**

  - **Context:** Phase 3: Sections 4
  - **Action:**
    1. Create centered quote layout
    2. Style Bitcoin Orange quotation marks
  - **Done‑when:**
    1. Testimonial displays author credentials

- [ ] **T012 · Feature · P2: Build Final CTASection**
  - **Context:** Phase 3: Sections 5
  - **Action:**
    1. Create centered CTA section
    2. Add secondary button variant
  - **Done‑when:**
    1. Section has proper vertical spacing
  - **Depends‑on:** T005

## Assembly & Polish

- [ ] **T013 · Feature · P2: Compose page layout**

  - **Context:** Phase 4: Assembly 1
  - **Action:**
    1. Arrange all sections in page.tsx
    2. Implement global container
  - **Done‑when:**
    1. Page shows complete content flow
  - **Depends‑on:** T008-T012

- [ ] **T014 · Feature · P2: Add scroll animations**

  - **Context:** Phase 4: Assembly 2
  - **Action:**
    1. Integrate Framer Motion
    2. Implement on-scroll reveal effects
  - **Done‑when:**
    1. Sections animate on viewport entry

- [ ] **T015 · Chore · P2: Optimize responsive typography**

  - **Context:** Phase 5: Polish 2
  - **Action:**
    1. Implement fluid type scaling
    2. Verify line heights
  - **Done‑when:**
    1. Text remains readable on all viewports

- [ ] **T016 · Chore · P2: Add meta tags and favicon**
  - **Context:** Phase 5: Polish 3
  - **Action:**
    1. Implement SEO metadata
    2. Add Bitcoin-themed favicon
  - **Done‑when:**
    1. Page passes basic SEO checks

## Verification

- [ ] **T017 · Test · P2: Conduct Lighthouse audit**
  - **Context:** Performance Targets
  - **Action:**
    1. Run Lighthouse performance test
    2. Optimize CLS and LCP
  - **Done‑when:**
    1. Scores meet 95+ threshold
  - **Depends‑on:** T013-T016

## Clarifications & Assumptions

- [ ] **Issue: Missing screenshot assets for StepCard**

  - **Context:** How It Works section
  - **Blocking?:** No
  - **Resolution:** Use placeholder images initially, track as separate content task

- [ ] **Issue: Bitcoin price API not specified**
  - **Context:** Hero conversion demo
  - **Blocking?:** Yes
  - **Resolution:** Use static demo values initially, implement API integration later
