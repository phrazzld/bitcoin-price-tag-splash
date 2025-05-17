```markdown
# Todo

## Setup

- [ ] **T001 · Chore · P0: Initialize Next.js project with TypeScript and Tailwind**

  - **Context:** Phase 1: Setup (30 mins), Step 1
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
  - **Done-when:**
    1. Next.js project is created with TypeScript and Tailwind support
  - **Depends-on:** none

- [ ] **T002 · Chore · P0: Install required dependencies**

  - **Context:** Phase 1: Setup (30 mins), Step 2
  - **Action:**
    1. Install `@fontsource-variable/inter`, `framer-motion`, and `lucide-react` using `pnpm add @fontsource-variable/inter framer-motion lucide-react`
  - **Done-when:**
    1. Dependencies are installed and `package.json` is updated
  - **Depends-on:** T001

- [ ] **T003 · Chore · P0: Configure Tailwind CSS with Swiss grid settings**
  - **Context:** Phase 1: Setup (30 mins), Step 3
  - **Action:**
    1. Create `tailwind.config.ts` with specified theme extensions
  - **Done-when:**
    1. `tailwind.config.ts` is correctly configured with grid and color settings
  - **Depends-on:** T001, T002

## Components

- [ ] **T004 · Feature · P1: Create Navigation component**

  - **Context:** Phase 2: Components (1 hour), Step 1
  - **Action:**
    1. Create `Navigation.tsx` with fixed navigation bar
  - **Done-when:**
    1. Navigation bar is fixed, styled, and has logo and CTA
  - **Depends-on:** T003

- [ ] **T005 · Feature · P1: Create Button component**

  - **Context:** Phase 2: Components (1 hour), Step 2
  - **Action:**
    1. Create `Button.tsx` with primary button styles
  - **Done-when:**
    1. Primary button is styled correctly and reusable
  - **Depends-on:** T003

- [ ] **T006 · Feature · P1: Create FeatureCard component**

  - **Context:** Phase 2: Components (1 hour), Step 3
  - **Action:**
    1. Create `FeatureCard.tsx` with icon, title, and description
  - **Done-when:**
    1. Feature card is responsive and follows design
  - **Depends-on:** T003

- [ ] **T007 · Feature · P1: Create StepCard component**

  - **Context:** Phase 2: Components (1 hour), Step 4
  - **Action:**
    1. Create `StepCard.tsx` with number, screenshot, and description
  - **Done-when:**
    1. Step card is responsive and follows design
  - **Depends-on:** T003

- [ ] **T008 · Feature · P1: Create Container component**
  - **Context:** Phase 2: Components (1 hour), Step 5
  - **Action:**
    1. Create `Container.tsx` with 12-column grid wrapper
  - **Done-when:**
    1. Container correctly wraps content with responsive grid
  - **Depends-on:** T003

## Sections

- [ ] **T009 · Feature · P1: Create HeroSection with conversion demo**

  - **Context:** Phase 3: Sections (1 hour), Step 1
  - **Action:**
    1. Create `HeroSection.tsx` with H1, subheading, CTA, and demo
    2. Implement typing effect for demo
  - **Done-when:**
    1. Hero section is responsive and demo works as expected
  - **Depends-on:** T003, T004, T005

- [ ] **T010 · Feature · P1: Create FeaturesSection with FeatureCards**

  - **Context:** Phase 3: Sections (1 hour), Step 2
  - **Action:**
    1. Create `FeaturesSection.tsx` with grid of FeatureCards
  - **Done-when:**
    1. Features are displayed in a responsive grid
  - **Depends-on:** T003, T006

- [ ] **T011 · Feature · P1: Create HowItWorksSection with StepCards**

  - **Context:** Phase 3: Sections (1 hour), Step 3
  - **Action:**
    1. Create `HowItWorksSection.tsx` with horizontal flow of StepCards
  - **Done-when:**
    1. Steps are displayed horizontally on desktop and vertically on mobile
  - **Depends-on:** T003, T007

- [ ] **T012 · Feature · P1: Create TestimonialsSection with quote**

  - **Context:** Phase 3: Sections (1 hour), Step 4
  - **Action:**
    1. Create `TestimonialsSection.tsx` with centered quote and author
  - **Done-when:**
    1. Testimonial is styled and centered
  - **Depends-on:** T003

- [ ] **T013 · Feature · P1: Create CTASection with H2 and secondary button**

  - **Context:** Phase 3: Sections (1 hour), Step 5
  - **Action:**
    1. Create `CTASection.tsx` with H2 and secondary CTA button
  - **Done-when:**
    1. CTA section is centered and styled
  - **Depends-on:** T003, T005

- [ ] **T014 · Feature · P1: Create Footer with minimal links**
  - **Context:** Phase 3: Sections (1 hour), Step 6
  - **Action:**
    1. Create `Footer.tsx` with copyright, GitHub, and privacy policy links
  - **Done-when:**
    1. Footer is minimal and centered
  - **Depends-on:** T003

## Assembly

- [ ] **T015 · Feature · P1: Compose sections in app/page.tsx**

  - **Context:** Phase 4: Assembly (30 mins), Step 1
  - **Action:**
    1. Import and compose all sections in `app/page.tsx`
  - **Done-when:**
    1. Page renders all sections in correct order
  - **Depends-on:** T009, T010, T011, T012, T013, T014

- [ ] **T016 · Feature · P1: Add scroll animations with Framer Motion**

  - **Context:** Phase 4: Assembly (30 mins), Step 2
  - **Action:**
    1. Add Framer Motion animations for scroll effects
  - **Done-when:**
    1. Scroll animations work as intended
  - **Depends-on:** T015

- [ ] **T017 · Feature · P1: Implement conversion demo animation in HeroSection**
  - **Context:** Phase 4: Assembly (30 mins), Step 3
  - **Action:**
    1. Implement typing effect for conversion demo
  - **Done-when:**
    1. Typing effect works correctly in HeroSection
  - **Depends-on:** T009

## Polish

- [ ] **T018 · Refactor · P2: Make responsive adjustments**

  - **Context:** Phase 5: Polish (30 mins), Step 1
  - **Action:**
    1. Ensure all sections are responsive and look good on mobile
  - **Done-when:**
    1. All sections pass responsive checks
  - **Depends-on:** T015

- [ ] **T019 · Refactor · P2: Optimize typography scale**

  - **Context:** Phase 5: Polish (30 mins), Step 2
  - **Action:**
    1. Adjust typography to be fluid and responsive
  - **Done-when:**
    1. Typography scales correctly across breakpoints
  - **Depends-on:** T003, T015

- [ ] **T020 · Chore · P2: Add meta tags and favicon**

  - **Context:** Phase 5: Polish (30 mins), Step 3
  - **Action:**
    1. Add necessary meta tags and favicon to the project
  - **Done-when:**
    1. Meta tags and favicon are set up correctly
  - **Depends-on:** T015

- [ ] **T021 · Refactor · P2: Optimize performance**
  - **Context:** Phase 5: Polish (30 mins), Step 4
  - **Action:**
    1. Optimize images, fonts, and assets for performance
  - **Done-when:**
    1. Lighthouse score is 95+ and performance targets are met
  - **Depends-on:** T015, T016, T017
```
