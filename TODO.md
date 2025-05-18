# Todo

## Phase 1: Setup

- [x] **T001 · Chore · P0: initialize Next.js project with TypeScript and Tailwind**

  - **Context:** PLAN.md > Implementation Steps > Phase 1: Setup (1)
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`.
  - **Done‑when:**
    1. Project directory `bitcoin-price-tag-splash` is created.
    2. Basic Next.js app structure with TypeScript and Tailwind CSS is present.
    3. Project runs successfully with `pnpm dev`.
  - **Verification:**
    1. Open `http://localhost:3000` (or assigned port) in a browser and see the default Next.js page.
  - **Depends‑on:** none

- [x] **T002 · Chore · P0: install project dependencies**

  - **Context:** PLAN.md > Implementation Steps > Phase 1: Setup (2)
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`.
  - **Done‑when:**
    1. Dependencies `@fontsource-variable/inter`, `framer-motion`, `lucide-react` are listed in `package.json`.
    2. `pnpm-lock.yaml` is updated.
  - **Depends‑on:** [T001]

- [x] **T003 · Chore · P1: configure Tailwind CSS theme**

  - **Context:** PLAN.md > Implementation Steps > Phase 1: Setup (3); Core Design System (Color Palette, Typography, Spacing)
  - **Action:**
    1. Modify `tailwind.config.ts` to include the specified `colors` (bitcoin-orange, gray scale), `fontFamily` (Inter Variable), and `spacing` extensions.
  - **Done‑when:**
    1. `tailwind.config.ts` reflects the design system's color, font, and spacing values.
    2. Custom utility classes (e.g., `bg-bitcoin-orange`, `font-sans`, `space-x-18`) are usable.
  - **Verification:**
    1. Create a temporary element with a custom color (e.g., `bg-bitcoin-orange`) and verify it renders correctly.
  - **Depends‑on:** [T001]

- [x] **T004 · Chore · P1: set up global CSS and Inter font**
  - **Context:** PLAN.md > Core Design System > Typography; Code Structure > `globals.css`
  - **Action:**
    1. Import `@fontsource-variable/inter` in `app/globals.css` or `app/layout.tsx`.
    2. Apply `Inter Variable` as the base `font-sans` in `globals.css` or `tailwind.config.ts` (if not fully covered by T003).
    3. Ensure base HTML/body styles are minimal and allow Tailwind to control styling.
  - **Done‑when:**
    1. The Inter font is loaded and applied as the default sans-serif font for the application.
  - **Verification:**
    1. Inspect text elements in the browser; they should use the Inter font.
    2. Check browser network tab to confirm font files are loaded.
  - **Depends‑on:** [T002, T003]

## Phase 2: Components

- [x] **T005 · Feature · P1: create `Container.tsx` grid wrapper**

  - **Context:** PLAN.md > Core Design System > Grid System; Phase 2: Components (5)
  - **Action:**
    1. Create `components/ui/Container.tsx`.
    2. Implement the component to provide a 12-column grid with 24px gutters, a `max-width` of 1200px, and centered layout.
    3. Ensure it uses an 8-point spatial system for padding (e.g., 24px horizontal padding).
  - **Done‑when:**
    1. `Container.tsx` component correctly applies grid, max-width, and padding styles.
  - **Verification:**
    1. Wrap sample content in `<Container>` and inspect layout using browser developer tools, checking grid overlay and dimensions.
  - **Depends‑on:** [T003]

- [x] **T006 · Feature · P1: create `Button.tsx` component**

  - **Context:** PLAN.md > Visual Components > Buttons; Phase 2: Components (2)
  - **Action:**
    1. Create `components/ui/Button.tsx`.
    2. Implement primary button styles: `background: #F7931A`, `color: white`, `border-radius: 0px`, `padding: 16px 32px`, `font-weight: 500`.
    3. Implement hover (darken 10%) and active (darken 20%) states.
  - **Done‑when:**
    1. `Button.tsx` renders correctly with primary styles.
    2. Hover and active states are functional and visually distinct.
  - **Verification:**
    1. Render the button with text.
    2. Visually inspect styling, padding, and font weight.
    3. Test hover and active states in the browser.
  - **Depends‑on:** [T003]

- [x] **T007 · Feature · P2: create `FeatureCard.tsx` component**

  - **Context:** PLAN.md > Page Structure > Feature Grid; Phase 2: Components (3)
  - **Action:**
    1. Create `components/FeatureCard.tsx`.
    2. Implement structure for a 24px icon, H3 title, and 2-line body text description.
  - **Done‑when:**
    1. `FeatureCard.tsx` component renders with placeholders or props for icon, title, and description.
    2. Basic styling for typography and spacing within the card is applied.
  - **Verification:**
    1. Render the component with sample data and verify layout and typography.
  - **Depends‑on:** [T003, T009]

- [x] **T008 · Feature · P2: create `StepCard.tsx` component**

  - **Context:** PLAN.md > Page Structure > How It Works; Phase 2: Components (4)
  - **Action:**
    1. Create `components/StepCard.tsx`.
    2. Implement structure for a large gray number, a bordered screenshot (1px solid Gray 300), and a concise description.
  - **Done‑when:**
    1. `StepCard.tsx` component renders with placeholders/props for number, screenshot, and description.
    2. Styling for number, screenshot border, and description typography is applied.
  - **Verification:**
    1. Render the component with sample data and verify layout, number styling, and border.
  - **Depends‑on:** [T003]

- [x] **T009 · Chore · P2: set up Lucide Icons**
  - **Context:** PLAN.md > Visual Components > Icons
  - **Action:**
    1. Ensure `lucide-react` is correctly installed and importable.
    2. Optionally, create a wrapper or utility for consistent icon usage if needed.
  - **Done‑when:**
    1. Lucide icons can be easily imported and used in components (e.g., `FeatureCard.tsx`).
    2. Icons render with default 2px stroke and 24px size unless overridden.
  - **Verification:**
    1. Import and render a sample Lucide icon in a test component.
  - **Depends‑on:** [T002]

## Phase 3: Sections

- [x] **T010 · Feature · P1: create `Navigation.tsx` structure**

  - **Context:** PLAN.md > Page Structure > 1. Navigation; Phase 2: Components (1)
  - **Action:**
    1. Create `components/Navigation.tsx`.
    2. Implement basic structure for logo (left) and Download CTA (right).
  - **Done‑when:**
    1. `Navigation.tsx` component exists and can render child elements for logo and CTA.
  - **Depends‑on:** [T005]

- [~] **T011 · Feature · P1: style `Navigation.tsx` (fixed, height, background, blur)**

  - **Context:** PLAN.md > Page Structure > 1. Navigation
  - **Action:**
    1. Apply fixed positioning to `Navigation.tsx`.
    2. Set height to 64px.
    3. Implement `White/Black with 95% opacity backdrop blur` background.
  - **Done‑when:**
    1. Navigation bar is fixed at the top, 64px high, with the specified background and blur effect.
  - **Verification:**
    1. Scroll a page with content behind the navigation to verify fixed position and backdrop blur.
    2. Inspect height and background styles.
  - **Depends‑on:** [T010]

- [ ] **T012 · Feature · P1: add content to `Navigation.tsx` (logo, CTA)**

  - **Context:** PLAN.md > Page Structure > 1. Navigation
  - **Action:**
    1. Integrate a placeholder or SVG for the logo on the left side of `Navigation.tsx`.
    2. Integrate the `Button.tsx` component as the "Download CTA" on the right side.
  - **Done‑when:**
    1. `Navigation.tsx` displays the logo and the primary CTA button in their correct positions.
  - **Verification:**
    1. Visually inspect the alignment and appearance of the logo and CTA button within the navigation bar.
  - **Depends‑on:** [T006, T011]

- [x] **T013 · Feature · P1: create `HeroSection.tsx` structure and layout**

  - **Context:** PLAN.md > Page Structure > 2. Hero Section; Phase 3: Sections (1)
  - **Action:**
    1. Create `components/sections/HeroSection.tsx`.
    2. Implement layout: height `100vh - 64px`, centered content, `max-width 800px` for content.
  - **Done‑when:**
    1. `HeroSection.tsx` renders occupying the correct viewport height below the navigation.
    2. Content area within the hero is centered and respects `max-width`.
  - **Verification:**
    1. Inspect dimensions and content alignment using browser developer tools.
  - **Depends‑on:** [T005]

- [x] **T014 · Feature · P1: add content to `HeroSection.tsx` (H1, Subheading, CTA)**

  - **Context:** PLAN.md > Page Structure > 2. Hero Section
  - **Action:**
    1. Add H1: "See Bitcoin prices everywhere".
    2. Add Subheading: "Convert any price to Bitcoin automatically".
    3. Integrate `Button.tsx` as "Add to Chrome" (Bitcoin orange).
    4. Apply typography (H1, Body for subheading) and spacing (24px paragraph, 48px component).
  - **Done‑when:**
    1. `HeroSection.tsx` displays the H1, subheading, and primary CTA button with correct styling and spacing.
  - **Verification:**
    1. Visually inspect text styles, button appearance, and spacing between elements.
  - **Depends‑on:** [T006, T013]

- [x] **T015 · Feature · P1: implement CSS-based hero conversion demo animation**

  - **Context:** PLAN.md > Page Structure > 2. Hero Section (Live demo); Key Implementation Details > Hero Conversion Demo
  - **Action:**
    1. Add static text elements for the demo (e.g., "$99.99" and "0.00234584 BTC").
    2. Implement a CSS animation to create a "type-and-convert" effect between these values.
  - **Done‑when:**
    1. The price conversion animation plays correctly in the Hero section using only CSS.
  - **Verification:**
    1. Observe the animation sequence in the browser. Ensure it's smooth and matches the "type-and-convert" description.
  - **Depends‑on:** [T014]

- [x] **T016 · Feature · P2: create `FeaturesSection.tsx` structure**

  - **Context:** PLAN.md > Page Structure > 3. Feature Grid; Phase 3: Sections (2)
  - **Action:**
    1. Create `components/sections/FeaturesSection.tsx`.
    2. Apply section padding: 120px vertical (desktop), 64px (mobile).
  - **Done‑when:**
    1. `FeaturesSection.tsx` exists and applies the correct vertical padding.
  - **Verification:**
    1. Inspect section padding using browser developer tools.
  - **Depends‑on:** [T005]

- [x] **T017 · Feature · P2: implement content and grid for `FeaturesSection.tsx`**

  - **Context:** PLAN.md > Page Structure > 3. Feature Grid; Key Implementation Details > Responsive Grid
  - **Action:**
    1. Use `Container.tsx` to wrap content.
    2. Implement a grid displaying three `FeatureCard.tsx` components.
    3. Configure grid: 3 columns on desktop (`grid-column: span 4`), 1 column on mobile (`grid-column: span 12`).
    4. Populate feature cards with content: "Instant conversion", "Works everywhere", "Always current".
  - **Done‑when:**
    1. `FeaturesSection.tsx` displays three feature cards in the specified responsive grid layout.
  - **Verification:**
    1. Resize browser window to verify column changes at mobile and desktop breakpoints.
    2. Check content within each feature card.
  - **Depends‑on:** [T007, T016]

- [ ] **T018 · Feature · P2: create `HowItWorksSection.tsx` structure**

  - **Context:** PLAN.md > Page Structure > 4. How It Works; Phase 3: Sections (3)
  - **Action:**
    1. Create `components/sections/HowItWorksSection.tsx`.
    2. Apply section padding: 120px vertical (desktop), 64px (mobile).
  - **Done‑when:**
    1. `HowItWorksSection.tsx` exists and applies the correct vertical padding.
  - **Verification:**
    1. Inspect section padding using browser developer tools.
  - **Depends‑on:** [T005]

- [ ] **T019 · Feature · P2: implement content and flow for `HowItWorksSection.tsx`**

  - **Context:** PLAN.md > Page Structure > 4. How It Works
  - **Action:**
    1. Use `Container.tsx` to wrap content.
    2. Implement a 3-step horizontal flow using `StepCard.tsx` components.
    3. Populate step cards with placeholder numbers, screenshots, and descriptions.
  - **Done‑when:**
    1. `HowItWorksSection.tsx` displays three step cards in a horizontal flow on desktop (stacking on mobile if necessary).
  - **Verification:**
    1. Visually inspect the layout and content of the steps.
    2. Check responsiveness of the horizontal flow.
  - **Depends‑on:** [T008, T018]

- [ ] **T020 · Feature · P2: create `TestimonialsSection.tsx` structure**

  - **Context:** PLAN.md > Page Structure > 5. Testimonials; Phase 3: Sections (4)
  - **Action:**
    1. Create `components/sections/TestimonialsSection.tsx`.
    2. Apply section padding: 120px vertical (desktop), 64px (mobile).
    3. Ensure content within this section is centered.
  - **Done‑when:**
    1. `TestimonialsSection.tsx` exists, applies correct padding, and centers its content.
  - **Verification:**
    1. Inspect padding and content centering using browser developer tools.
  - **Depends‑on:** [T005]

- [ ] **T021 · Feature · P2: implement content for `TestimonialsSection.tsx`**

  - **Context:** PLAN.md > Page Structure > 5. Testimonials
  - **Action:**
    1. Add a single centered quote (placeholder text).
    2. Implement large quotation marks styled with `Primary: Bitcoin Orange #F7931A`.
    3. Add author name and title below the quote.
  - **Done‑when:**
    1. `TestimonialsSection.tsx` displays the quote, orange quotation marks, and author details as specified.
  - **Verification:**
    1. Visually inspect the styling, color of quotation marks, and text alignment.
  - **Depends‑on:** [T020]

- [ ] **T022 · Feature · P2: create `CTASection.tsx` (Final CTA) structure**

  - **Context:** PLAN.md > Page Structure > 6. Final CTA; Phase 3: Sections (5)
  - **Action:**
    1. Create `components/sections/CTASection.tsx`.
    2. Apply section padding: 120px vertical (desktop), 64px (mobile).
    3. Ensure content within this section is centered.
  - **Done‑when:**
    1. `CTASection.tsx` exists, applies correct padding, and centers its content.
  - **Verification:**
    1. Inspect padding and content centering using browser developer tools.
  - **Depends‑on:** [T005]

- [ ] **T023 · Feature · P2: implement content for `CTASection.tsx`**

  - **Context:** PLAN.md > Page Structure > 6. Final CTA
  - **Action:**
    1. Add H2: "Start seeing Bitcoin prices".
    2. Integrate `Button.tsx` as a secondary CTA button (may require a variant or different styling).
  - **Done‑when:**
    1. `CTASection.tsx` displays the H2 and the secondary CTA button.
  - **Verification:**
    1. Visually inspect text styles and button appearance.
  - **Depends‑on:** [T006, T022]

- [ ] **T024 · Feature · P2: create `Footer.tsx` structure**

  - **Context:** PLAN.md > Page Structure > 7. Footer; Phase 3: Sections (6)
  - **Action:**
    1. Create `components/sections/Footer.tsx`.
  - **Done‑when:**
    1. `Footer.tsx` component exists.
  - **Verification:**
    1. The component can be rendered.
  - **Depends‑on:** [T005]

- [ ] **T025 · Feature · P2: implement content for `Footer.tsx`**
  - **Context:** PLAN.md > Page Structure > 7. Footer
  - **Action:**
    1. Add minimal content: Copyright, GitHub link, Privacy Policy link.
    2. Style as a single row, with content centered.
  - **Done‑when:**
    1. `Footer.tsx` displays the specified links and text, centered.
  - **Verification:**
    1. Visually inspect the footer content and alignment. Check if links are placeholders or functional.
  - **Depends‑on:** [T024]

## Phase 4: Assembly & Animations

- [ ] **T026 · Feature · P1: compose all sections in `app/page.tsx`**

  - **Context:** PLAN.md > Implementation Steps > Phase 4: Assembly (1)
  - **Action:**
    1. Import `Navigation.tsx`, all created section components, and `Footer.tsx` into `app/page.tsx`.
    2. Arrange them in the correct order as per "Page Structure".
  - **Done‑when:**
    1. The main page (`/`) renders all sections in the specified sequence.
  - **Verification:**
    1. Load the home page in the browser and scroll to verify all sections are present and in order.
  - **Depends‑on:** [T012, T015, T017, T019, T021, T023, T025]

- [ ] **T027 · Feature · P2: implement page load fade-in animation**

  - **Context:** PLAN.md > Animations > Page load
  - **Action:**
    1. Apply a 300ms fade-in animation to the main page content on initial load, likely using Framer Motion on a root layout element.
  - **Done‑when:**
    1. Page content fades in smoothly over 300ms when the page is first loaded.
  - **Verification:**
    1. Hard refresh the page to observe the fade-in animation.
  - **Depends‑on:** [T002, T026]

- [ ] **T028 · Feature · P2: implement scroll reveal animations for sections**
  - **Context:** PLAN.md > Animations > Scroll; Phase 4: Assembly (2)
  - **Action:**
    1. Use Framer Motion to apply simple reveal animations (e.g., fade in, slight upward move) to sections as they scroll into view.
    2. Animation duration should be around 200ms.
  - **Done‑when:**
    1. Sections animate into view subtly as the user scrolls down the page.
  - **Verification:**
    1. Scroll up and down the page to observe reveal animations on sections.
  - **Depends‑on:** [T002, T026]

## Phase 5: Polish

- [ ] **T029 · Refactor · P1: perform responsive adjustments across all breakpoints**

  - **Context:** PLAN.md > Implementation Steps > Phase 5: Polish (1); Core Design System > Breakpoints
  - **Action:**
    1. Thoroughly test the entire page on Mobile (320px - 768px), Tablet (768px - 1024px), and Desktop (1024px+) breakpoints.
    2. Adjust Tailwind classes or component styles as needed to ensure optimal layout and readability.
  - **Done‑when:**
    1. The page is fully responsive and visually polished on all specified breakpoints.
    2. No layout issues (e.g., overflows, misalignments) are present.
  - **Verification:**
    1. Use browser developer tools to simulate different device sizes.
    2. Test on physical devices if available.
  - **Depends‑on:** [T026]

- [ ] **T030 · Refactor · P1: implement and optimize fluid typography scale**

  - **Context:** PLAN.md > Typography > Font Sizes; Key Implementation Details > Typography Scale; Phase 5: Polish (2)
  - **Action:**
    1. Apply `clamp()` for fluid font sizing on H1 as specified: `font-size: clamp(2rem, 5vw, 3.5rem);`.
    2. Review and ensure all other typographic elements (H2, H3, Body, Small) use rem-based sizes and adhere to the specified line heights.
  - **Done‑when:**
    1. H1 font size scales fluidly with viewport width.
    2. All text elements are correctly sized and spaced according to the design system.
  - **Verification:**
    1. Resize browser window and inspect H1 font size to confirm `clamp()` behavior.
    2. Verify computed font sizes and line heights for other text elements.
  - **Depends‑on:** [T004, T029]

- [ ] **T031 · Chore · P1: add meta tags and favicon**
  - **Context:** PLAN.md > Implementation Steps > Phase 5: Polish (3); Code Structure > `/public`
  - **Action:**
    1. Add appropriate meta tags (e.g., `title`, `description`, Open Graph tags) to `app/layout.tsx`.
    2. Add `icon.svg` (or `favicon.ico`) to the `/public` directory and link it in `app/layout.tsx`.
    3. Add
