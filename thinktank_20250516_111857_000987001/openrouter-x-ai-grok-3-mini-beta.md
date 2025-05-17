# Todo

## Setup

- [ ] **T001 · Chore · P0: initialize next.js project**

  - **Context:** Phase 1: Setup, Step 1
  - **Action:**
    1. Run command to create Next.js project
  - **Done-when:**
    1. Project files generated in root directory
  - **Verification:**
    1. Verify `app/page.tsx` exists
  - **Depends-on:** none

- [ ] **T002 · Chore · P1: install dependencies**

  - **Context:** Phase 1: Setup, Step 2
  - **Action:**
    1. Run pnpm command to add packages
  - **Done-when:**
    1. Dependencies listed in package.json
  - **Verification:**
    1. Check package.json for @fontsource-variable/inter, framer-motion, lucide-react
  - **Depends-on:** T001

- [ ] **T003 · Chore · P2: configure tailwind for grid**
  - **Context:** Phase 1: Setup, Step 3
  - **Action:**
    1. Update tailwind.config.ts with provided theme extensions
  - **Done-when:**
    1. Tailwind config file matches plan
  - **Verification:**
    1. Run Tailwind build and inspect output CSS
  - **Depends-on:** T002

## Components

- [ ] **T004 · Feature · P2: create navigation component**

  - **Context:** Phase 2: Components, Item 1
  - **Action:**
    1. Implement Navigation.tsx with fixed height and content
  - **Done-when:**
    1. Component renders logo and CTA button
  - **Verification:**
    1. Render component in isolation and check layout
  - **Depends-on:** T003

- [ ] **T005 · Feature · P2: create button component**

  - **Context:** Phase 2: Components, Item 2
  - **Action:**
    1. Implement Button.tsx with specified styles
  - **Done-when:**
    1. Button matches CSS properties
  - **Verification:**
    1. Test hover and active states in browser
  - **Depends-on:** T003

- [ ] **T006 · Feature · P2: create feature card component**

  - **Context:** Phase 2: Components, Item 3
  - **Action:**
    1. Implement FeatureCard.tsx with icon, title, and description
  - **Done-when:**
    1. Component displays all elements
  - **Verification:**
    1. Render with sample data and verify responsiveness
  - **Depends-on:** T003

- [ ] **T007 · Feature · P2: create step card component**

  - **Context:** Phase 2: Components, Item 4
  - **Action:**
    1. Implement StepCard.tsx with number, screenshot, and description
  - **Done-when:**
    1. Component renders all parts correctly
  - **Verification:**
    1. Check screenshot borders and layout
  - **Depends-on:** T003

- [ ] **T008 · Feature · P2: create container component**
  - **Context:** Phase 2: Components, Item 5
  - **Action:**
    1. Implement Container.tsx as grid wrapper
  - **Done-when:**
    1. Component applies 12-column grid
  - **Verification:**
    1. Test with child elements in different breakpoints
  - **Depends-on:** T003

## Sections

- [ ] **T009 · Feature · P2: build hero section**

  - **Context:** Phase 3: Sections, Item 1
  - **Action:**
    1. Implement HeroSection.tsx with elements and demo
  - **Done-when:**
    1. Section includes H1, subheading, CTA, and animation
  - **Verification:**
    1. Verify animation triggers and CTA click
  - **Depends-on:** T004, T005, T008

- [ ] **T010 · Feature · P2: build features section**

  - **Context:** Phase 3: Sections, Item 2
  - **Action:**
    1. Implement FeaturesSection.tsx with grid layout
  - **Done-when:**
    1. Section displays three feature cards
  - **Verification:**
    1. Check responsiveness on mobile and desktop
  - **Depends-on:** T006, T008

- [ ] **T011 · Feature · P2: build how it works section**

  - **Context:** Phase 3: Sections, Item 3
  - **Action:**
    1. Implement HowItWorksSection.tsx with steps
  - **Done-when:**
    1. Section renders three-step flow
  - **Verification:**
    1. Verify step components display correctly
  - **Depends-on:** T007, T008

- [ ] **T012 · Feature · P2: build testimonials section**

  - **Context:** Phase 3: Sections, Item 4
  - **Action:**
    1. Implement TestimonialsSection.tsx with quote
  - **Done-when:**
    1. Section centers quote and author
  - **Verification:**
    1. Check quotation marks color and styling
  - **Depends-on:** T008

- [ ] **T013 · Feature · P2: build cta section**

  - **Context:** Phase 3: Sections, Item 5
  - **Action:**
    1. Implement CTASection.tsx with button
  - **Done-when:**
    1. Section renders H2 and secondary CTA
  - **Verification:**
    1. Verify button interaction
  - **Depends-on:** T005, T008

- [ ] **T014 · Feature · P2: build footer section**
  - **Context:** Phase 3: Sections, Item 6
  - **Action:**
    1. Implement Footer.tsx with links
  - **Done-when:**
    1. Section displays minimal content
  - **Verification:**
    1. Check link accessibility
  - **Depends-on:** T008

## Assembly

- [ ] **T015 · Feature · P2: compose sections in page**

  - **Context:** Phase 4: Assembly, Step 1
  - **Action:**
    1. Assemble sections in app/page.tsx
  - **Done-when:**
    1. Page renders all sections sequentially
  - **Verification:**
    1. Navigate through the page and verify layout
  - **Depends-on:** T009, T010, T011, T012, T013, T014

- [ ] **T016 · Feature · P2: add scroll animations**

  - **Context:** Phase 4: Assembly, Step 2
  - **Action:**
    1. Integrate Framer Motion for reveals
  - **Done-when:**
    1. Sections animate on scroll
  - **Verification:**
    1. Scroll page and observe animations
  - **Depends-on:** T015

- [ ] **T017 · Feature · P2: implement hero conversion demo**
  - **Context:** Phase 4: Assembly, Step 3
  - **Action:**
    1. Add typing effect in HeroSection.tsx
  - **Done-when:**
    1. Demo animates price conversion
  - **Verification:**
    1. Verify animation sequence
  - **Depends-on:** T009

## Polish

- [ ] **T018 · Refactor · P2: make responsive adjustments**

  - **Context:** Phase 5: Polish, Step 1
  - **Action:**
    1. Update components for breakpoints
  - **Done-when:**
    1. Layout adapts to mobile/tablet/desktop
  - **Verification:**
    1. Test on different screen sizes
  - **Depends-on:** T015

- [ ] **T019 · Refactor · P2: optimize typography scale**

  - **Context:** Phase 5: Polish, Step 2
  - **Action:**
    1. Apply fluid typography in global styles
  - **Done-when:**
    1. Font sizes scale fluidly
  - **Verification:**
    1. Check font sizes on resize
  - **Depends-on:** T015

- [ ] **T020 · Chore · P2: add meta tags and favicon**

  - **Context:** Phase 5: Polish, Step 3
  - **Action:**
    1. Update layout.tsx and public directory
  - **Done-when:**
    1. Head includes meta tags and favicon
  - **Verification:**
    1. Inspect page source
  - **Depends-on:** T015

- [ ] **T021 · Chore · P2: perform performance optimization**
  - **Context:** Phase 5: Polish, Step 4
  - **Action:**
    1. Optimize assets and code
  - **Done-when:**
    1. Meets performance targets
  - **Verification:**
    1. Run Lighthouse audit
  - **Depends-on:** T015
