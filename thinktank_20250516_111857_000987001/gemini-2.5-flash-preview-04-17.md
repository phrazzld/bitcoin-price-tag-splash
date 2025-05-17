```md
# Todo

## Setup

- [ ] **T001 · Chore · P1: Initialize Next.js project with TypeScript and Tailwind**

  - **Context:** Phase 1: Setup - 1. Initialize Next.js with TypeScript
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`.
  - **Done‑when:**
    1. New Next.js project directory `bitcoin-price-tag-splash` is created with specified options.
  - **Verification:**
    1. Navigate into the project directory.
    2. Check `package.json` for `typescript` and `tailwindcss` dependencies.
    3. Check `app/layout.tsx` or similar for basic structure.
  - **Depends‑on:** none

- [ ] **T002 · Chore · P1: Install core dependencies**

  - **Context:** Phase 1: Setup - 2. Install dependencies
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`.
  - **Done‑when:**
    1. Specified dependencies are added to `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** [T001]

- [ ] **T003 · Chore · P1: Configure Tailwind CSS for design system**

  - **Context:** Phase 1: Setup - 3. Configure Tailwind for Swiss grid, Core Design System (Grid, Typography, Color, Spacing)
  - **Action:**
    1. Modify `tailwind.config.ts` to include custom colors, font family, and spacing as defined in the plan.
  - **Done‑when:**
    1. `tailwind.config.ts` is updated with the specified theme extensions.
  - **Depends‑on:** [T002]

- [ ] **T004 · Chore · P2: Set up global CSS including font import and base styles**
  - **Context:** Code Structure - `globals.css`, Typography
  - **Action:**
    1. Import the Inter variable font in `globals.css`.
    2. Apply base styles (e.g., font family, body margin/padding) in `globals.css`.
  - **Done‑when:**
    1. Inter font is imported correctly.
    2. Basic global styles are applied.
  - **Depends‑on:** [T003]

## UI Components

- [ ] **T005 · Feature · P2: Create Container component**

  - **Context:** Phase 2: Components - 5. `Container.tsx`, Key Implementation Details - Responsive Grid
  - **Action:**
    1. Create `components/ui/Container.tsx`.
    2. Implement the component using Tailwind classes for the 12-column grid, 24px gap, 1200px max-width, and 24px horizontal padding.
  - **Done‑when:**
    1. `Container.tsx` exists and applies the specified grid/padding styles.
  - **Depends‑on:** [T003]

- [ ] **T006 · Feature · P2: Create Button component with primary styling**

  - **Context:** Phase 2: Components - 2. `Button.tsx`, Visual Components - Buttons
  - **Action:**
    1. Create `components/ui/Button.tsx`.
    2. Implement a reusable button component that accepts props like `onClick`, `children`.
    3. Apply primary button styling using Tailwind classes based on the visual components spec (background, color, border-radius, padding, font-weight).
    4. Implement hover and active states using Tailwind or CSS.
  - **Done‑when:**
    1. `Button.tsx` exists and renders a button with primary styling.
    2. Hover and active states are visually correct.
  - **Verification:**
    1. Render the button in isolation (e.g., in a temporary page or Storybook if used).
    2. Verify styling, padding, border-radius, and hover/active effects.
  - **Depends‑on:** [T003]

- [ ] **T007 · Feature · P2: Create FeatureCard component structure**

  - **Context:** Phase 2: Components - 3. `FeatureCard.tsx`, Page Structure - Feature Grid
  - **Action:**
    1. Create `components/ui/FeatureCard.tsx`.
    2. Implement the component structure to accept props for an icon, title (H3), and description (Body text).
  - **Done‑when:**
    1. `FeatureCard.tsx` exists and is structured to receive and display the required content.
  - **Depends‑on:** [T003]

- [ ] **T008 · Feature · P2: Create StepCard component structure**
  - **Context:** Phase 2: Components - 4. `StepCard.tsx`, Page Structure - How It Works
  - **Action:**
    1. Create `components/ui/StepCard.tsx`.
    2. Implement the component structure to accept props for a step number, screenshot, and description.
    3. Apply basic styling for number (large, gray) and screenshot border.
  - **Done‑when:**
    1. `StepCard.tsx` exists and is structured to receive and display the required content with basic styling.
  - **Depends‑on:** [T003]

## Navigation & Footer

- [ ] **T009 · Feature · P2: Create Navigation component**

  - **Context:** Phase 2: Components - 1. `Navigation.tsx`, Page Structure - Navigation (Fixed)
  - **Action:**
    1. Create `components/Navigation.tsx`.
    2. Implement the basic component structure.
  - **Done‑when:**
    1. `Navigation.tsx` exists.
  - **Depends‑on:** [T003]

- [ ] **T010 · Feature · P2: Implement fixed position and backdrop blur for Navigation**

  - **Context:** Page Structure - Navigation (Fixed)
  - **Action:**
    1. Apply Tailwind classes or CSS to make the Navigation component fixed at the top.
    2. Set the background color to White/Black with 95% opacity.
    3. Apply a backdrop blur effect.
    4. Set the height to 64px.
  - **Done‑when:**
    1. Navigation bar is fixed at the top, 64px tall, with the specified background and blur.
  - **Verification:**
    1. Scroll the page to ensure the nav remains fixed.
    2. Verify height and visual style.
  - **Depends‑on:** [T009]

- [ ] **T011 · Feature · P2: Implement Navigation content (Logo, CTA)**

  - **Context:** Page Structure - Navigation (Fixed), Visual Components - Icons (for logo)
  - **Action:**
    1. Add a placeholder or actual logo component/image on the left.
    2. Add the Primary CTA button on the right using the `Button` component.
  - **Done‑when:**
    1. Navigation bar contains a logo on the left and the primary CTA button on the right.
  - **Verification:**
    1. Check layout of elements within the nav bar.
  - **Depends‑on:** [T010, T006]

- [ ] **T012 · Feature · P2: Create Footer component**

  - **Context:** Phase 3: Sections - 6. `Footer.tsx`, Page Structure - Footer
  - **Action:**
    1. Create `components/sections/Footer.tsx`.
    2. Implement the basic component structure.
  - **Done‑when:**
    1. `Footer.tsx` exists.
  - **Depends‑on:** [T003]

- [ ] **T013 · Feature · P2: Implement Footer content (Copyright, Links)**
  - **Context:** Page Structure - Footer
  - **Action:**
    1. Add minimal content: Copyright, GitHub link, Privacy Policy link.
    2. Apply styling for single row, centered layout.
  - **Done‑when:**
    1. Footer contains the specified text links, centered horizontally.
  - **Verification:**
    1. Check content and layout at the bottom of the page.
  - **Depends‑on:** [T012]

## Page Sections

- [ ] **T014 · Feature · P2: Create HeroSection component structure**

  - **Context:** Phase 3: Sections - 1. `HeroSection.tsx`, Page Structure - Hero Section
  - **Action:**
    1. Create `components/sections/HeroSection.tsx`.
    2. Implement the basic component structure, including wrapping content in the `Container` component.
    3. Set minimum height (`100vh - 64px`) and centered layout (`max-width 800px` for content).
  - **Done‑when:**
    1. `HeroSection.tsx` exists with correct height and layout container.
  - **Depends‑on:** [T005]

- [ ] **T015 · Feature · P2: Implement Hero content (H1, Subheading, Primary CTA)**

  - **Context:** Page Structure - Hero Section, Typography, Visual Components - Buttons
  - **Action:**
    1. Add H1: "See Bitcoin prices everywhere".
    2. Add Subheading: "Convert any price to Bitcoin automatically".
    3. Add Primary CTA using the `Button` component with text "Add to Chrome".
    4. Apply correct typography styles (font sizes, weights, line heights) and spacing.
  - **Done‑when:**
    1. Hero section displays the correct text elements and the CTA button with proper styling and spacing.
  - **Verification:**
    1. Visually inspect text styles, button style, and vertical spacing between elements.
  - **Depends‑on:** [T014, T006]

- [ ] **T016 · Feature · P2: Implement Hero conversion demo animation**

  - **Context:** Page Structure - Hero Section, Key Implementation Details - Hero Conversion Demo, Animations - Demo
  - **Action:**
    1. Add a simple text element below the CTA in the Hero section.
    2. Implement a CSS animation (typing/fade) to show "$99.99" transforming into "0.00234584 BTC".
  - **Done‑when:**
    1. A simple animation demonstrating price conversion plays in the Hero section.
  - **Verification:**
    1. Observe the animation sequence.
  - **Depends‑on:** [T015]

- [ ] **T017 · Feature · P2: Create FeaturesSection component structure**

  - **Context:** Phase 3: Sections - 2. `FeaturesSection.tsx`, Page Structure - Feature Grid
  - **Action:**
    1. Create `components/sections/FeaturesSection.tsx`.
    2. Implement the basic component structure, including wrapping content in the `Container` component.
    3. Apply section padding (desktop 120px, mobile 64px vertical).
  - **Done‑when:**
    1. `FeaturesSection.tsx` exists with correct padding and layout container.
  - **Depends‑on:** [T005]

- [ ] **T018 · Feature · P2: Implement FeaturesSection content (3 feature cards)**

  - **Context:** Page Structure - Feature Grid, Phase 3: Sections - 2. `FeaturesSection.tsx`, Visual Components - Icons
  - **Action:**
    1. Add a grid container (using Tailwind grid classes) within the section.
    2. Instantiate three `FeatureCard` components inside the grid.
    3. Provide content (icon placeholder, title, description) for each card: "Instant conversion", "Works everywhere", "Always current".
    4. Apply grid span classes for 3 columns desktop, 1 column mobile.
  - **Done‑when:**
    1. Features section displays three feature cards in a grid layout with correct content.
    2. Grid layout adapts correctly between mobile (1 column) and desktop (3 columns).
  - **Verification:**
    1. Visually inspect grid layout on different screen sizes.
    2. Check content of each feature card.
  - **Depends‑on:** [T017, T007]

- [ ] **T019 · Feature · P2: Create HowItWorksSection component structure**

  - **Context:** Phase 3: Sections - 3. `HowItWorksSection.tsx`, Page Structure - How It Works
  - **Action:**
    1. Create `components/sections/HowItWorksSection.tsx`.
    2. Implement the basic component structure, including wrapping content in the `Container` component.
    3. Apply section padding (desktop 120px, mobile 64px vertical).
  - **Done‑when:**
    1. `HowItWorksSection.tsx` exists with correct padding and layout container.
  - **Depends‑on:** [T005]

- [ ] **T020 · Feature · P2: Implement HowItWorksSection content (3 step cards)**

  - **Context:** Page Structure - How It Works, Phase 3: Sections - 3. `HowItWorksSection.tsx`, Visual Components - Images (Screenshots)
  - **Action:**
    1. Add a flex or grid container for the 3-step horizontal flow.
    2. Instantiate three `StepCard` components.
    3. Provide content (number, screenshot placeholder, description) for each step.
    4. Ensure screenshots have the specified minimal border.
  - **Done‑when:**
    1. How It Works section displays three step cards in a horizontal flow (desktop) with correct content and styling.
  - **Verification:**
    1. Visually inspect layout and content.
  - **Depends‑on:** [T019, T008]

- [ ] **T021 · Feature · P2: Create TestimonialsSection component structure**

  - **Context:** Phase 3: Sections - 4. `TestimonialsSection.tsx`, Page Structure - Testimonials
  - **Action:**
    1. Create `components/sections/TestimonialsSection.tsx`.
    2. Implement the basic component structure, including wrapping content in the `Container` component.
    3. Apply section padding (desktop 120px, mobile 64px vertical).
    4. Implement centered layout for content.
  - **Done‑when:**
    1. `TestimonialsSection.tsx` exists with correct padding and centered layout container.
  - **Depends‑on:** [T005]

- [ ] **T022 · Feature · P2: Implement TestimonialsSection content (Quote, Author, Marks)**

  - **Context:** Page Structure - Testimonials, Typography
  - **Action:**
    1. Add placeholder content for a single centered quote, author name, and title.
    2. Add large quotation marks styled with Bitcoin orange color.
    3. Apply correct typography styles and spacing.
  - **Done‑when:**
    1. Testimonials section displays the quote, author, and orange quotation marks with proper styling and spacing.
  - **Verification:**
    1. Visually inspect content, styling, and centering.
  - **Depends‑on:** [T021]

- [ ] **T023 · Feature · P2: Create CTASection component structure**

  - **Context:** Phase 3: Sections - 5. `CTASection.tsx`, Page Structure - Final CTA
  - **Action:**
    1. Create `components/sections/CTASection.tsx`.
    2. Implement the basic component structure, including wrapping content in the `Container` component.
    3. Apply section padding (desktop 120px, mobile 64px vertical).
    4. Implement centered layout for content.
  - **Done‑when:**
    1. `CTASection.tsx` exists with correct padding and centered layout container.
  - **Depends‑on:** [T005]

- [ ] **T024 · Feature · P2: Implement CTASection content (H2, Secondary CTA)**
  - **Context:** Page Structure - Final CTA, Typography, Visual Components - Buttons
  - **Action:**
    1. Add H2: "Start seeing Bitcoin prices".
    2. Add a secondary CTA button using the `Button` component (assume default styling is secondary, or add a variant prop).
    3. Apply correct typography styles and spacing.
  - **Done‑when:**
    1. Final CTA section displays the H2 text and the secondary CTA button with proper styling and spacing.
  - **Verification:**
    1. Visually inspect text styles, button style, and spacing.
  - **Depends‑on:** [T023, T006]

## Assembly & Polish

- [ ] **T025 · Feature · P1: Assemble page layout in app/page.tsx**

  - **Context:** Phase 4: Assembly - 1. Compose sections in `app/page.tsx`
  - **Action:**
    1. Import all created section and navigation/footer components.
    2. Arrange them in the correct order within `app/page.tsx`.
  - **Done‑when:**
    1. The full page structure is rendered with all sections and navigation/footer visible.
  - **Verification:**
    1. Load the page in a browser and visually check the order of sections.
  - **Depends‑on:** [T011, T013, T016, T018, T020, T022, T024]

- [ ] **T026 · Chore · P2: Add global page load fade-in animation**
  - **Context:** Animations - Page load
  - **Action:**
    1. Implement a simple
```
