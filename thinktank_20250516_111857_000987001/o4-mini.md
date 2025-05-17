# Todo

## Setup

- [ ] **T001 · Chore · P1: initialize Next.js project**

  - **Context:** Phase 1 Setup step 1 (PLAN.md)
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app` in repo root
    2. Verify project folder structure (`app/`, `components/`, `public/`, `tailwind.config.ts`)
  - **Done-when:**
    1. `pnpm dev` starts Next.js dev server without errors
    2. Default Next.js welcome page loads in browser
  - **Verification:**
    1. Open `http://localhost:3000` and confirm Next.js welcome page
  - **Depends-on:** none

- [ ] **T002 · Chore · P1: install required dependencies**

  - **Context:** Phase 1 Setup step 2 (PLAN.md)
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`
    2. Confirm entries in `package.json` under dependencies
  - **Done-when:**
    1. Dependencies appear in `pnpm list` output
    2. Importing each in code (e.g., `import { motion } from 'framer-motion'`) does not error
  - **Depends-on:** [T001]

- [ ] **T003 · Chore · P1: configure Tailwind theme**
  - **Context:** Phase 1 Setup step 3 (PLAN.md)
  - **Action:**
    1. Update `tailwind.config.ts` to extend colors (`bitcoin-orange`, `gray`), fontFamily, spacing as per spec
    2. Ensure Tailwind directives are imported in `globals.css`
  - **Done-when:**
    1. Custom colors and spacing utilities are available (e.g., `bg-bitcoin-orange`, `space-y-120`)
    2. Running `pnpm dev` shows no Tailwind config errors
  - **Verification:**
    1. Use a test element with `className="text-bitcoin-orange"` and confirm color in browser dev tools
  - **Depends-on:** [T001]

## Components / UI

- [ ] **T004 · Feature · P2: create Navigation component**

  - **Context:** Phase 2 Components item 1 (PLAN.md Navigation)
  - **Action:**
    1. Add `components/Navigation.tsx` with fixed height 64px, backdrop blur, logo slot left, download CTA slot right
    2. Apply responsive container and grid classes
  - **Done-when:**
    1. Navigation renders at top on all pages and remains fixed on scroll
    2. Logo and CTA button placeholders appear in correct positions
  - **Verification:**
    1. Manually scroll page to verify nav is fixed and blurred background
  - **Depends-on:** [T003]

- [ ] **T005 · Feature · P2: create Button component**

  - **Context:** Phase 2 Components item 2 (PLAN.md Buttons)
  - **Action:**
    1. Add `components/ui/Button.tsx` implementing primary button styles (btc orange bg, no border-radius, padding 16x32)
    2. Add hover and active darken states (10%, 20%)
  - **Done-when:**
    1. `<Button>` renders with correct styles and state transitions
  - **Verification:**
    1. Hover and click interactions show color darkening in browser
  - **Depends-on:** [T003]

- [ ] **T006 · Feature · P2: create FeatureCard component**

  - **Context:** Phase 2 Components item 3 (PLAN.md FeatureCard)
  - **Action:**
    1. Add `components/FeatureCard.tsx` with icon slot, H3 title, 2-line description
    2. Style with 24px icon, typography and spacing per design
  - **Done-when:**
    1. Rendering three `<FeatureCard>` instances in a grid yields correct layout
  - **Verification:**
    1. Manually supply dummy props and verify layout in Storybook or page
  - **Depends-on:** [T003]

- [ ] **T007 · Feature · P2: create StepCard component**

  - **Context:** Phase 2 Components item 4 (PLAN.md StepCard)
  - **Action:**
    1. Add `components/StepCard.tsx` showing large number, screenshot image slot with border, description text
    2. Apply typography and spacing rules
  - **Done-when:**
    1. Three `<StepCard>` instances display correctly in a horizontal flow
  - **Verification:**
    1. Use placeholder images and verify border and numbering style
  - **Depends-on:** [T003]

- [ ] **T008 · Feature · P2: create Container component**
  - **Context:** Phase 2 Components item 5 (PLAN.md Container)
  - **Action:**
    1. Add `components/ui/Container.tsx` implementing 12-column grid, 24px gutters, max-width 1200px, padding 24px
    2. Export for use in sections
  - **Done-when:**
    1. Wrapping content in `<Container>` applies correct grid and spacing
  - **Verification:**
    1. Inspect in browser that grid columns and gutters match spec
  - **Depends-on:** [T003]

## Sections

- [ ] **T009 · Feature · P2: implement HeroSection layout**

  - **Context:** Phase 3 Sections item 1 (PLAN.md Hero Section)
  - **Action:**
    1. Add `components/sections/HeroSection.tsx` with centered max-width 800px, H1, subheading, primary CTA
    2. Reserve area for live demo placeholder
  - **Done-when:**
    1. Hero renders full viewport minus nav and matches design structure
  - **Verification:**
    1. Confirm responsive sizing on mobile and desktop via dev tools
  - **Depends-on:** [T004, T005, T008]

- [ ] **T010 · Feature · P2: implement conversion demo animation**

  - **Context:** Phase 4 Assembly step 3 & Hero Conversion Demo (PLAN.md)
  - **Action:**
    1. Within `HeroSection`, implement CSS-based typing effect: `$99.99` → `0.00234584 BTC` cycling or one shot
    2. Ensure animation duration and timing match spec (no JS libraries)
  - **Done-when:**
    1. Demo animates typed price conversion on page load
  - **Verification:**
    1. Reload page and observe correct value transition in Hero demo
  - **Depends-on:** [T009]

- [ ] **T011 · Feature · P2: implement FeaturesSection with FeatureCards**

  - **Context:** Phase 3 Sections item 2 (PLAN.md Feature Grid)
  - **Action:**
    1. Add `components/sections/FeaturesSection.tsx`, use `<Container>` and `<FeatureCard>` for three features
    2. Configure 1-column mobile, 3-column desktop grid via Tailwind
  - **Done-when:**
    1. FeaturesSection displays three cards per design responsively
  - **Verification:**
    1. Resize window to test grid spans (span 12 on mobile, 4 on desktop)
  - **Depends-on:** [T006, T008]

- [ ] **T012 · Feature · P2: implement HowItWorksSection with StepCards**

  - **Context:** Phase 3 Sections item 3 (PLAN.md How It Works)
  - **Action:**
    1. Add `components/sections/HowItWorksSection.tsx`, horizontal flow of three `<StepCard>`
    2. Include number, screenshot, description per step
  - **Done-when:**
    1. Section displays three steps side by side on desktop, stacked on mobile
  - **Verification:**
    1. Manual check in browser for layout at breakpoints
  - **Depends-on:** [T007, T008]

- [ ] **T013 · Feature · P2: implement TestimonialsSection**

  - **Context:** Phase 3 Sections item 4 (PLAN.md Testimonials)
  - **Action:**
    1. Add `components/sections/TestimonialsSection.tsx` with centered quote, orange quotation marks, author line
  - **Done-when:**
    1. Single testimonial renders centered with correct styles
  - **Verification:**
    1. Validate text, color, and spacing via dev tools
  - **Depends-on:** [T008]

- [ ] **T014 · Feature · P2: implement CTASection**

  - **Context:** Phase 3 Sections item 5 (PLAN.md Final CTA)
  - **Action:**
    1. Add `components/sections/CTASection.tsx` with H2 and secondary CTA button
  - **Done-when:**
    1. CTASection appears correctly with centered heading and button
  - **Verification:**
    1. Click CTA to ensure placeholder action or link
  - **Depends-on:** [T005, T008]

- [ ] **T015 · Feature · P2: implement Footer**
  - **Context:** Phase 3 Sections item 6 (PLAN.md Footer)
  - **Action:**
    1. Add `components/sections/Footer.tsx` with centered row containing copyright, GitHub link, Privacy
    2. Apply minimal styling per spec
  - **Done-when:**
    1. Footer renders at bottom with correct links and text
  - **Verification:**
    1. Inspect links and text for correctness
  - **Depends-on:** [T008]

## Assembly & Animations

- [ ] **T016 · Feature · P2: compose home page in app/page.tsx**

  - **Context:** Phase 4 Assembly step 1 (PLAN.md)
  - **Action:**
    1. Import and render `Navigation`, all section components in order inside `app/page.tsx`
    2. Ensure correct wrapper hierarchy and containers
  - **Done-when:**
    1. Home page displays all sections in correct sequence
  - **Verification:**
    1. Navigate to `/` and scroll through complete layout
  - **Depends-on:** [T004–T015]

- [ ] **T017 · Feature · P2: add scroll reveal animations**

  - **Context:** Phase 4 Assembly step 2 & Animations (PLAN.md)
  - **Action:**
    1. Use `framer-motion` to add simple reveal on scroll for each section (200ms)
    2. Ensure no parallax, just fade/slide-in
  - **Done-when:**
    1. Sections animate into view on scroll in dev
  - **Verification:**
    1. Scroll page and observe animations trigger once per section
  - **Depends-on:** [T016, T002]

- [ ] **T018 · Feature · P2: add page load fade-in animation**
  - **Context:** Animations section (PLAN.md)
  - **Action:**
    1. Apply 300ms fade-in to the root page or container using CSS or Framer Motion
  - **Done-when:**
    1. Entire page fades in on initial load
  - **Verification:**
    1. Hard reload page and observe fade duration
  - **Depends-on:** [T016, T002]

## Polish & Deployment

- [ ] **T019 · Refactor · P2: apply responsive breakpoints**

  - **Context:** Phase 5 Polish step 1 (PLAN.md)
  - **Action:**
    1. Audit all sections/components at mobile, tablet, desktop breakpoints
    2. Adjust Tailwind classes or layout where needed for 320–768px, 768–1024px, 1024px+
  - **Done-when:**
    1. Layout looks as designed at all breakpoints without overflow
  - **Verification:**
    1. Manual QA on device emulators or Chrome dev tools
  - **Depends-on:** [T016]

- [ ] **T020 · Refactor · P2: implement fluid typography scale**

  - **Context:** Key Implementation Details (PLAN.md Typography Scale)
  - **Action:**
    1. Update global CSS or Tailwind config to use `clamp` for H1, H2, H3 as specified
  - **Done-when:**
    1. Headings scale between defined min/max across viewports
  - **Verification:**
    1. Inspect computed font-size at various viewport widths
  - **Depends-on:** [T003, T016]

- [ ] **T021 · Chore · P2: add meta tags and favicon**

  - **Context:** Phase 5 Polish step 3 (PLAN.md)
  - **Action:**
    1. Update `app/layout.tsx` `<head>` with meta description, Open Graph tags, link to favicon in `public/`
  - **Done-when:**
    1. Page source includes proper `<meta>` and `<link rel="icon">` entries
  - **Verification:**
    1. Use browser dev tools to inspect head elements
  - **Depends-on:** [T016]

- [ ] **T022 · Chore · P2: optimize performance metrics**

  - **Context:** Phase 5 Polish step 4 & Performance Targets (PLAN.md)
  - **Action:**
    1. Run Lighthouse audit, address high CLS, LCP, FID issues, remove unused code/styles
  - **Done-when:**
    1. Lighthouse scores meet targets: LCP <2.5s, FID <100ms, CLS <0.1
  - **Verification:**
    1. Submit report from Lighthouse CI or Chrome DevTools
  - **Depends-on:** [T016]

- [ ] **T023 · Chore · P2: deploy site to Vercel**
  - **Context:** Deployment section (PLAN.md)
  - **Action:**
    1. Connect GitHub repo to Vercel, configure build command `pnpm build` and output path
    2. Verify environment variables if any
  - **Done-when:**
    1. Production site live at provided Vercel URL, all pages render correctly
  - **Verification:**
    1. Visit live URL and confirm hero, features, conversion demo, animations
  - **Depends-on:** [T022, T021]

---

### Clarifications & Assumptions

- [ ] **Issue:** conversion demo design details ambiguous
  - **Context:** PLAN.md Hero Conversion Demo
  - **Blocking?:** no
- [ ] **Issue:** thumbnail images for How It Works unspecified
  - **Context:** PLAN.md How It Works step screenshots
  - **Blocking?:** no
