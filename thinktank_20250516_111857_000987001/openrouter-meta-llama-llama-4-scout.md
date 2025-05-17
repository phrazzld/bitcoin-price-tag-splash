# Todo

## 1 Initialization and Setup

- [ ] **T001 · Feature · P2**: Initialize Next.js project with TypeScript, Tailwind CSS, and App Router.
  - **Context:** PLAN.md > Phase 1: Setup
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`
    2. Configure Tailwind CSS for Swiss grid system
  - **Done‑when:** Project initialized with `git init`, `package.json` created
  - **Verification:** Verify project structure, dependencies installed

## 2 Components

- [ ] **T002 · Feature · P2**: Create atomic component for navigation.
  - **Context:** PLAN.md > Core Design System > 1. Navigation
  - **Action:**
    1. Design `Navigation.tsx` with logo and download CTA
    2. Implement backdrop blur effect
  - **Done‑when:** Component renders correctly, backdrop blur applied
  - **Depends‑on:** none

## 3 Hero Section

- [ ] **T003 · Feature · P2**: Develop HeroSection with conversion demo.
  - **Context:** PLAN.md > Page Structure > 2. Hero Section
  - **Action:**
    1. Implement centered content layout
    2. Add H1, subheading, and primary CTA
    3. Create simple price conversion animation
  - **Done‑when:** Demo animation works, layout correct
  - **Depends‑on:** T002

## 4 Feature Grid

- [ ] **T004 · Feature · P2**: Build FeatureGrid section.
  - **Context:** PLAN.md > Page Structure > 3. Feature Grid
  - **Action:**
    1. Design feature card layout
    2. Implement 3 feature cards (instant conversion, works everywhere, always current)
  - **Done‑when:** Feature cards render correctly, content correct
  - **Depends‑on:** T002

## 5 How It Works Section

- [ ] **T005 · Feature · P2**: Develop HowItWorksSection with 3-step flow.
  - **Context:** PLAN.md > Page Structure > 4. How It Works
  - **Action:**
    1. Design step card layout
    2. Implement 3-step horizontal flow
  - **Done‑when:** Steps render correctly, descriptions accurate
  - **Depends‑on:** T002

## 6 Testimonials Section

- [ ] **T006 · Feature · P2**: Create TestimonialsSection with centered quote.
  - **Context:** PLAN.md > Page Structure > 5. Testimonials
  - **Action:**
    1. Design large quotation marks
    2. Implement author name and title display
  - **Done‑when:** Quote displays correctly, centered
  - **Depends‑on:** T002

## 7 Final CTA and Footer

- [ ] **T007 · Feature · P2**: Develop Final CTA section.
  - **Context:** PLAN.md > Page Structure > 6. Final CTA
  - **Action:**
    1. Design centered section layout
    2. Implement secondary CTA button
  - **Done‑when:** CTA section renders correctly
  - **Depends‑on:** T002
- [ ] **T008 · Feature · P2**: Implement Footer section.
  - **Context:** PLAN.md > Page Structure > 7. Footer
  - **Action:**
    1. Design minimal layout with copyright and links
    2. Implement GitHub link and privacy policy
  - **Done‑when:** Footer renders correctly, links functional
  - **Depends‑on:** T002

## 8 Polish and Performance

- [ ] **T009 · Refactor · P2**: Perform responsive adjustments.
  - **Context:** PLAN.md > Phase 5: Polish
  - **Action:**
    1. Test and adjust layouts for mobile, tablet, desktop
    2. Optimize typography scale
  - **Done‑when:** Layouts responsive, typography optimized
  - **Depends‑on:** T001-T008

## 9 Type Checking and Linting

- [ ] **T010 · Chore · P2**: Set up type checking and linting.
  - **Context:** PLAN.md > Implementation Steps > Phase 1
  - **Action:**
    1. Install dependencies (e.g., `eslint`, `typescript`)
    2. Configure linting and type checking for project
  - **Done‑when:** Type checking and linting pass without errors
  - **Depends‑on:** T001

## 10 Deployment

- [ ] **T011 · Feature · P1**: Deploy to Vercel.
  - **Context:** PLAN.md > Deployment
  - **Action:**
    1. Create Vercel account and project
    2. Configure deployment settings
  - **Done‑when:** Project deployed successfully
  - **Verification:** Verify site works on Vercel, Lighthouse score > 95+
