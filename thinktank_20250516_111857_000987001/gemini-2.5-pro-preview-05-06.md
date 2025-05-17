# Todo

## Project Setup & Configuration

- [ ] **T001 · Chore · P1: initialize next.js project with typescript and tailwind css**

  - **Context:** Phase 1: Setup, Step 1
  - **Action:**
    1. Run `npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app`.
    2. Verify basic project structure and ensure TypeScript and Tailwind CSS are configured.
  - **Done‑when:**
    1. Next.js project is initialized successfully.
    2. Project runs in development mode (`pnpm dev`).
  - **Verification:**
    1. Check `package.json` for Next.js, TypeScript, Tailwind CSS dependencies.
    2. Load the default Next.js page in a browser.
  - **Depends‑on:** none

- [ ] **T002 · Chore · P1: install project dependencies**

  - **Context:** Phase 1: Setup, Step 2
  - **Action:**
    1. Run `pnpm add @fontsource-variable/inter framer-motion lucide-react`.
  - **Done‑when:**
    1. Dependencies are added to `package.json`.
    2. `pnpm install` completes successfully.
  - **Verification:**
    1. Check `package.json` and `pnpm-lock.yaml` for the new dependencies.
  - **Depends‑on:** [T001]

- [ ] **T003 · Chore · P1: configure tailwind css theme**

  - **Context:** Phase 1: Setup, Step 3; Core Design System (Color Palette, Spacing)
  - **Action:**
    1. Update `tailwind.config.ts` to include project-specific colors (`bitcoin-orange`, grays).
    2. Extend `fontFamily` to include 'Inter Variable'.
    3. Extend `spacing` with custom values (`18`, `88`, `120`) and ensure 8-point spatial system can be easily applied.
    4. Configure Tailwind for 12-column grid with 24px gutters (this might involve custom CSS or plugins if not directly supported by core Tailwind for `display:grid` containers).
  - **Done‑when:**
    1. `tailwind.config.ts` is updated with all specified theme extensions.
    2. Custom colors, fonts, and spacing are usable via Tailwind utility classes.
  - **Verification:**
    1. Create a test component using new color classes (e.g., `bg-bitcoin-orange`).
    2. Verify Inter font is applied when `font-sans` is used.
    3. Test custom spacing utilities.
  - **Depends‑on:** [T001]

- [ ] **T004 · Chore · P1: setup inter font globally**
  - **Context:** Typography; Phase 1: Setup, Step 2 & 3
  - **Action:**
    1. Import `@fontsource-variable/inter` in `app/layout.tsx` or `app/globals.css`.
    2. Set Inter as the default sans-serif font in `tailwind.config.ts` (covered by T003) and ensure it's applied to the body in `globals.css`.
  - **Done‑when:**
    1. Inter font is loaded and applied globally to the application.
  - **Verification:**
    1. Inspect text elements in the browser to confirm Inter font is being used.
    2. Check network tab for font file loading.
  - **Depends‑on:** [T002, T003]

## Core UI Components

- [ ] **T005 · Feature · P1: create `Button.tsx` component**

  - **Context:** Visual Components (Buttons); Phase 2: Components, Step 2
  - **Action:**
    1. Create `components/ui/Button.tsx`.
    2. Implement primary button styles: Bitcoin Orange background, white text, 0px border-radius, 16px 32px padding, font-weight 500.
    3. Implement hover (darken 10%) and active (darken 20%) states.
    4. Add support for variants (e.g., primary, secondary/outline) via props.
  - **Done‑when:**
    1. `Button.tsx` component renders correctly with primary styles.
    2. Hover and active states are functional.
    3. Component accepts children for text and standard HTML button attributes.
    4. Secondary button variant is available (e.g., outline style with Bitcoin Orange border and text).
  - **Verification:**
    1. Render the button in Storybook or a test page with different states.
    2. Verify visual appearance against design specs.
    3. Check keyboard accessibility (focusable, operable with Enter/Space).
  - **Depends‑on:** [T003]

- [ ] **T006 · Feature · P1: create `Container.tsx` grid wrapper component**
  - **Context:** Grid System; Phase 2: Components, Step 5; Key Implementation Details (Responsive Grid)
  - **Action:**
    1. Create `components/ui/Container.tsx`.
    2. Implement CSS for a 12-column grid with 24px gutters, 1200px max-width, and auto margins.
    3. Ensure container has 24px horizontal padding.
    4. Use `display: grid` and `grid-template-columns: repeat(12, 1fr)`.
  - **Done‑when:**
    1. `Container.tsx` component correctly applies grid styles.
    2. Content within the container is constrained to max-width and centered.
  - **Verification:**
    1. Use browser developer tools to inspect the grid overlay.
    2. Test with child elements spanning various columns.
  - **Depends‑on:** [T003]

## Global Styles & Layout

- [ ] **T007 · Feature · P1: implement base typography styles**

  - **Context:** Typography (Font Sizes, Line Heights)
  - **Action:**
    1. Define H1, H2, H3, Body, Small text styles (font-size, font-weight) in `app/globals.css` or via Tailwind's `@layer base`.
    2. Apply specified line heights (1.2 for headers, 1.6 for body).
    3. Ensure font sizes are rem-based.
  - **Done‑when:**
    1. Base typographic elements are styled according to the design system.
  - **Verification:**
    1. Create a test page with H1-H3, p, and small elements.
    2. Inspect styles in the browser to confirm sizes, weights, and line heights.
  - **Depends‑on:** [T004]

- [ ] **T008 · Feature · P1: implement fluid typography for h1**

  - **Context:** Key Implementation Details (Typography Scale)
  - **Action:**
    1. Apply `clamp(2rem, 5vw, 3.5rem)` font-size to H1 elements using CSS in `app/globals.css`.
    2. Ensure H1 line-height is 1.2 and font-weight is 700 (Inter Bold).
  - **Done‑when:**
    1. H1 font size scales fluidly within the specified min, viewport-based, and max values.
  - **Verification:**
    1. Resize browser window and observe H1 font size changes.
    2. Inspect H1 element to verify clamp function and other styles.
  - **Depends‑on:** [T007]

- [ ] **T009 · Chore · P1: setup `app/layout.tsx` structure**

  - **Context:** Code Structure
  - **Action:**
    1. Define basic HTML structure (html, body) in `app/layout.tsx`.
    2. Include placeholders for metadata (title, description).
    3. Ensure `children` prop is rendered.
    4. Apply global font from T004.
  - **Done‑when:**
    1. `layout.tsx` provides the root structure for all pages.
  - **Verification:**
    1. View the application in browser, inspect page source for basic structure.
  - **Depends‑on:** [T004]

- [ ] **T010 · Feature · P2: implement page load fade-in animation**
  - **Context:** Animations (Page load)
  - **Action:**
    1. Use Framer Motion to apply a 300ms fade-in animation to page content on load.
    2. Implement this likely in `app/layout.tsx` or a wrapper component.
  - **Done‑when:**
    1. Page content fades in smoothly on initial load.
  - **Verification:**
    1. Hard refresh the page to observe the animation.
  - **Depends‑on:** [T002, T009]

## Navigation

- [ ] **T011 · Feature · P1: create `Navigation.tsx` component structure**

  - **Context:** Page Structure (1. Navigation); Phase 2: Components, Step 1
  - **Action:**
    1. Create `components/Navigation.tsx`.
    2. Add a placeholder for the Logo on the left.
    3. Add a placeholder for the "Download CTA" `Button` on the right.
  - **Done‑when:**
    1. `Navigation.tsx` renders with placeholders for logo and CTA.
  - **Verification:**
    1. Display `Navigation.tsx` on a test page.
  - **Depends‑on:** [T005]

- [ ] **T012 · Feature · P1: style `Navigation.tsx`**
  - **Context:** Page Structure (1. Navigation)
  - **Action:**
    1. Style `Navigation.tsx` to be fixed at the top.
    2. Set height to 64px.
    3. Apply a background (e.g., White) with 95% opacity and backdrop blur effect.
    4. Ensure content (logo, CTA) is aligned correctly within the fixed height.
  - **Done‑when:**
    1. Navigation bar is styled and positioned as per design specifications.
    2. Backdrop blur effect is visible on scroll if content is behind it.
  - **Verification:**
    1. Scroll a page with content to verify fixed position and backdrop blur.
    2. Inspect styles to confirm height, background, opacity.
  - **Depends‑on:** [T011]

## Hero Section

- [ ] **T013 · Feature · P1: create `HeroSection.tsx` component structure**

  - **Context:** Page Structure (2. Hero Section); Phase 3: Sections, Step 1
  - **Action:**
    1. Create `components/sections/HeroSection.tsx`.
    2. Add H1: "See Bitcoin prices everywhere".
    3. Add Subheading: "Convert any price to Bitcoin automatically".
    4. Include a primary CTA button placeholder.
  - **Done‑when:**
    1. `HeroSection.tsx` renders with specified text elements and CTA placeholder.
  - **Verification:**
    1. Display `HeroSection.tsx` on a test page.
  - **Depends‑on:** none

- [ ] **T014 · Feature · P1: style `HeroSection.tsx`**

  - **Context:** Page Structure (2. Hero Section)
  - **Action:**
    1. Style `HeroSection.tsx` to have a height of `100vh - 64px` (nav height).
    2. Center content vertically and horizontally.
    3. Apply a `max-width` of 800px to the content container within the hero.
  - **Done‑when:**
    1. Hero section fills the viewport below the navigation.
    2. Content is centered and constrained by max-width.
  - **Verification:**
    1. View on different screen sizes.
    2. Inspect layout and dimensions.
  - **Depends‑on:** [T013]

- [ ] **T015 · Feature · P1: implement hero section primary cta button**

  - **Context:** Page Structure (2. Hero Section)
  - **Action:**
    1. Integrate `Button.tsx` component for the primary CTA.
    2. Set button text to "Add to Chrome".
    3. Ensure it uses the primary Bitcoin Orange style.
  - **Done‑when:**
    1. Primary CTA button is correctly rendered and styled in `HeroSection.tsx`.
  - **Verification:**
    1. Visually check button appearance and text.
  - **Depends‑on:** [T005, T013]

- [ ] **T016 · Feature · P1: implement hero section conversion demo static ui**

  - **Context:** Page Structure (2. Hero Section - Live demo)
  - **Action:**
    1. Add static UI elements for the price conversion demo within `HeroSection.tsx`.
    2. Display initial price (e.g., "$99.99") and target currency (e.g., "BTC") placeholders.
  - **Done‑when:**
    1. Static elements for the conversion demo are present.
  - **Verification:**
    1. Visually check the demo area in `HeroSection.tsx`.
  - **Depends‑on:** [T013]

- [ ] **T017 · Feature · P1: implement hero section conversion demo css animation**
  - **Context:** Page Structure (2. Hero Section - Live demo); Key Implementation Details (Hero Conversion Demo); Animations (Demo)
  - **Action:**
    1. Create CSS animations for the type-and-convert effect.
    2. Animate "$99.99" transforming into "0.00234584 BTC".
    3. Ensure animation is purely CSS-based as specified.
  - **Done‑when:**
    1. Conversion demo animation plays correctly.
  - **Verification:**
    1. Observe the animation in `HeroSection.tsx`.
    2. Ensure it's smooth and matches the description.
  - **Depends‑on:** [T016]

## Feature Grid Section

- [ ] **T018 · Feature · P2: create `FeatureCard.tsx` component structure**

  - **Context:** Page Structure (3. Feature Grid); Phase 2: Components, Step 3
  - **Action:**
    1. Create `components/FeatureCard.tsx`.
    2. Include a placeholder for a simple line icon (24px).
    3. Add H3 for feature title.
    4. Add body text element for a 2-line description.
  - **Done‑when:**
    1. `FeatureCard.tsx` renders with placeholders for icon, title, and description.
  - **Verification:**
    1. Display `FeatureCard.tsx` on a test page.
  - **Depends‑on:** none

- [ ] **T019 · Feature · P2: style `FeatureCard.tsx`**

  - **Context:** Page Structure (3. Feature Grid); Icons (Style, Size)
  - **Action:**
    1. Style the `FeatureCard.tsx` elements according to Swiss Minimalism.
    2. Ensure icon placeholder area is 24px.
    3. Apply typography styles for H3 and body text.
  - **Done‑when:**
    1. `FeatureCard.tsx` is styled cleanly.
  - **Verification:**
    1. Visually inspect the card.
  - **Depends‑on:** [T018, T007]

- [ ] **T020 · Feature · P2: create `FeaturesSection.tsx` component structure**

  - **Context:** Page Structure (3. Feature Grid); Phase 3: Sections, Step 2
  - **Action:**
    1. Create `components/sections/FeaturesSection.tsx`.
    2. Prepare to map over feature data to render multiple `FeatureCard.tsx` components.
    3. Use placeholder data for 3 features: "Instant conversion", "Works everywhere", "Always current".
  - **Done‑when:**
    1. `FeaturesSection.tsx` renders multiple instances of `FeatureCard.tsx` with placeholder data.
  - **Verification:**
    1. Display `FeaturesSection.tsx` on a test page.
  - **Depends‑on:** [T018]

- [ ] **T021 · Feature · P2: implement responsive grid layout for `FeaturesSection.tsx`**
  - **Context:** Page Structure (3. Feature Grid); Key Implementation Details (Responsive Grid)
  - **Action:**
    1. Use `Container.tsx` to wrap the feature cards in `FeaturesSection.tsx`.
    2. Apply grid column spans to `FeatureCard.tsx` instances: `span 12` for mobile, `span 4` for desktop (to achieve 3 columns).
    3. Ensure 24px gutters are respected from the `Container.tsx`.
    4. Apply section padding: 120px vertical (desktop), 64px (mobile).
    5. Ensure 48px spacing between major elements (if applicable within section, or between sections).
  - **Done‑when:**
    1. Features display in a single column on mobile.
    2. Features display in three columns on desktop.
    3. Section padding and component spacing are correct.
  - **Verification:**
    1. Test layout on mobile, tablet, and desktop breakpoints.
    2. Inspect grid and spacing.
  - **Depends‑on:** [T006, T019, T020]

## How It Works Section

- [ ] **T022 · Feature · P2: create `StepCard.tsx` component structure**

  - **Context:** Page Structure (4. How It Works); Phase 2: Components, Step 4
  - **Action:**
    1. Create `components/StepCard.tsx`.
    2. Add element for a large gray number.
    3. Add placeholder for a minimal, bordered screenshot.
    4. Add element for a concise description.
  - **Done‑when:**
    1. `StepCard.tsx` renders with placeholders for number, screenshot, and description.
  - **Verification:**
    1. Display `StepCard.tsx` on a test page.
  - **Depends‑on:** none

- [ ] **T023 · Feature · P2: style `StepCard.tsx`**

  - **Context:** Page Structure (4. How It Works); Images (Borders)
  - **Action:**
    1. Style the number element to be large and use `Gray-500` (or similar gray).
    2. Style the screenshot placeholder to have a 1px solid `Gray-300` border.
    3. Ensure no shadows or effects are applied to images.
  - **Done‑when:**
    1. `StepCard.tsx` elements are styled as per design.
  - **Verification:**
    1. Visually inspect the card.
  - **Depends‑on:** [T022, T003]

- [ ] **T024 · Feature · P2: create `HowItWorksSection.tsx` component structure**

  - **Context:** Page Structure (4. How It Works); Phase 3: Sections, Step 3
  - **Action:**
    1. Create `components/sections/HowItWorksSection.tsx`.
    2. Prepare to render 3 `StepCard.tsx` components with placeholder data.
  - **Done‑when:**
    1. `HowItWorksSection.tsx` renders three `StepCard.tsx` instances.
  - **Verification:**
    1. Display `HowItWorksSection.tsx` on a test page.
  - **Depends‑on:** [T022]

- [ ] **T025 · Feature · P2: implement layout for `HowItWorksSection.tsx`**
  - **Context:** Page Structure (4. How It Works)
  - **Action:**
    1. Implement a 3-step horizontal flow for `StepCard.tsx` components on desktop.
    2. Ensure the layout adapts responsively (e.g., stacks vertically on mobile).
    3. Apply section padding: 120px vertical (desktop), 64px (mobile).
  - **Done‑when:**
    1. Steps are displayed in a horizontal flow on desktop and stack on mobile.
    2. Section padding is correct.
  - **Verification:**
    1. Test layout on mobile, tablet, and desktop breakpoints.
  - **Depends‑on:** [T023, T024, T006]

## Testimonials Section

- [ ] **T026 · Feature · P2: create `TestimonialsSection.tsx` component structure**
  - **Context:** Page Structure (5. Testimonials); Phase 3: Sections, Step 4
  - **Action:**
    1. Create `components/sections/TestimonialsSection.tsx`.
    2. Add elements for a single centered quote, author name, and title (using placeholder
