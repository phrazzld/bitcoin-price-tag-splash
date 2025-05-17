# Todo

## Setup Project Structure

- [ ] **T001 · Chore · P1: Initialize Next.js project with TypeScript and Tailwind CSS**
  - **Context:** Implementation Steps, Phase 1: Setup
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
  - **Done‑when:**
    1. Next.js project initialized
    2. TypeScript configured
    3. Tailwind CSS configured
  - **Depends‑on:** none

## Install Dependencies

- [ ] **T002 · Chore · P1: Install required dependencies**
  - **Context:** Implementation Steps, Phase 1: Setup
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`
  - **Done‑when:**
    1. Dependencies installed
    2. `pnpm-lock.yaml` updated
  - **Depends‑on:** T001

## Configure Tailwind CSS

- [ ] **T003 · Chore · P1: Configure Tailwind CSS for Swiss grid system**
  - **Context:** Implementation Steps, Phase 1: Setup
  - **Action:**
    1. Update `tailwind.config.ts` with grid and color configurations
  - **Done‑when:**
    1. Tailwind CSS configured for grid system
    2. Color palette configured
  - **Depends‑on:** T001

## Create Atomic Components

- [ ] **T004 · Feature · P2: Create Navigation component**

  - **Context:** Phase 2: Components
  - **Action:**
    1. Create `Navigation.tsx` component
    2. Implement fixed navigation with logo and Download CTA
  - **Done‑when:**
    1. Navigation component created
    2. Logo and CTA properly aligned
  - **Depends‑on:** T002

- [ ] **T005 · Feature · P2: Create Button component**

  - **Context:** Phase 2: Components
  - **Action:**
    1. Create `Button.tsx` component
    2. Implement primary button styles
  - **Done‑when:**
    1. Button component created
    2. Primary button styles applied
  - **Depends‑on:** T002

- [ ] **T006 · Feature · P2: Create FeatureCard component**

  - **Context:** Phase 2: Components
  - **Action:**
    1. Create `FeatureCard.tsx` component
    2. Implement feature card layout
  - **Done‑when:**
    1. FeatureCard component created
    2. Proper layout with icon, title, and description
  - **Depends‑on:** T002

- [ ] **T007 · Feature · P2: Create StepCard component**

  - **Context:** Phase 2: Components
  - **Action:**
    1. Create `StepCard.tsx` component
    2. Implement step card layout
  - **Done‑when:**
    1. StepCard component created
    2. Proper layout with number, screenshot, and description
  - **Depends‑on:** T002

- [ ] **T008 · Feature · P2: Create Container component**
  - **Context:** Phase 2: Components
  - **Action:**
    1. Create `Container.tsx` component
    2. Implement grid wrapper with max-width and spacing
  - **Done‑when:**
    1. Container component created
    2. Proper grid layout with max-width
  - **Depends‑on:** T002

## Build Page Sections

- [ ] **T009 · Feature · P2: Create HeroSection component with conversion demo**

  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `HeroSection.tsx` component
    2. Implement hero content with H1, subheading, and CTA
    3. Add conversion demo animation
  - **Done‑when:**
    1. HeroSection component created
    2. Conversion demo animation implemented
  - **Depends‑on:** T005

- [ ] **T010 · Feature · P2: Create FeaturesSection component**

  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `FeaturesSection.tsx` component
    2. Implement feature grid with FeatureCard components
  - **Done‑when:**
    1. FeaturesSection component created
    2. Feature grid properly laid out
  - **Depends‑on:** T006

- [ ] **T011 · Feature · P2: Create HowItWorksSection component**

  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `HowItWorksSection.tsx` component
    2. Implement 3-step horizontal flow with StepCard components
  - **Done‑when:**
    1. HowItWorksSection component created
    2. Steps properly laid out
  - **Depends‑on:** T007

- [ ] **T012 · Feature · P2: Create TestimonialsSection component**

  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `TestimonialsSection.tsx` component
    2. Implement centered quote with author
  - **Done‑when:**
    1. TestimonialsSection component created
    2. Quote and author properly formatted
  - **Depends‑on:** T002

- [ ] **T013 · Feature · P2: Create CTASection component**

  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `CTASection.tsx` component
    2. Implement centered section with H2 and secondary CTA
  - **Done‑when:**
    1. CTASection component created
    2. Proper layout with H2 and CTA
  - **Depends‑on:** T005

- [ ] **T014 · Feature · P2: Create Footer component**
  - **Context:** Phase 3: Sections
  - **Action:**
    1. Create `Footer.tsx` component
    2. Implement minimal footer with copyright and links
  - **Done‑when:**
    1. Footer component created
    2. Proper layout with copyright and links
  - **Depends‑on:** T002

## Assemble Page

- [ ] **T015 · Feature · P2: Compose sections in app/page.tsx**

  - **Context:** Phase 4: Assembly
  - **Action:**
    1. Import and compose all section components
  - **Done‑when:**
    1. All sections properly composed
    2. Page layout complete
  - **Depends‑on:** T009, T010, T011, T012, T013, T014

- [ ] **T016 · Feature · P2: Add scroll animations with Framer Motion**
  - **Context:** Phase 4: Assembly
  - **Action:**
    1. Implement scroll animations using Framer Motion
  - **Done‑when:**
    1. Scroll animations implemented
    2. Animations are smooth and functional
  - **Depends‑on:** T015

## Polish and Optimize

- [ ] **T017 · Chore · P2: Make responsive adjustments**

  - **Context:** Phase 5: Polish
  - **Action:**
    1. Test and adjust layout for mobile and tablet breakpoints
  - **Done‑when:**
    1. Layout is responsive
    2. All sections adjust properly to different screen sizes
  - **Depends‑on:** T015

- [ ] **T018 · Chore · P2: Optimize typography scale**

  - **Context:** Phase 5: Polish
  - **Action:**
    1. Review and adjust typography for optimal scale and readability
  - **Done‑when:**
    1. Typography is optimized
    2. Text is readable across all sections
  - **Depends‑on:** T015

- [ ] **T019 · Chore · P2: Add meta tags and favicon**

  - **Context:** Phase 5: Polish
  - **Action:**
    1. Add appropriate meta tags for SEO
    2. Add favicon to the project
  - **Done‑when:**
    1. Meta tags are added
    2. Favicon is properly displayed
  - **Depends‑on:** T015

- [ ] **T020 · Chore · P2: Optimize performance**
  - **Context:** Phase 5: Polish
  - **Action:**
    1. Review and optimize performance metrics (LCP, FID, CLS)
    2. Ensure bundle size is within target
  - **Done‑when:**
    1. Performance metrics are within target
    2. Bundle size is optimized
  - **Depends‑on:** T015

## Clarifications & Assumptions

- [ ] **Issue:** Clarify if there are specific requirements for the conversion demo animation

  - **Context:** Hero Conversion Demo
  - **Blocking?:** yes

- [ ] **Issue:** Confirm if there are any specific icons required for features and steps
  - **Context:** Feature Grid and How It Works
  - **Blocking?:** no
