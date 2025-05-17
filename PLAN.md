# Bitcoin Price Tag - Swiss Minimalism Splash Page Plan

## Design Philosophy

Swiss Minimalism applied to Bitcoin Price Tag: absolute clarity, mathematical precision, and zero decorative elements. Every pixel serves a purpose.

## Core Design System

### Grid System

- **12-column grid** with 24px gutters
- **8-point spatial system** (all spacing multiples of 8px)
- **Container max-width**: 1200px
- **Breakpoints**:
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

### Typography

- **Primary Font**: Inter (variable font)
  - Headers: Inter 700 (Bold)
  - Body: Inter 400 (Regular)
  - Small text: Inter 500 (Medium)
- **Font Sizes** (rem-based):
  - H1: 3.5rem (56px)
  - H2: 2.25rem (36px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
- **Line Heights**:
  - Headers: 1.2
  - Body: 1.6

### Color Palette

- **Primary**: Bitcoin Orange #F7931A
- **Black**: #000000
- **White**: #FFFFFF
- **Gray Scale**:
  - Gray 100: #F8F8F8
  - Gray 300: #E0E0E0
  - Gray 500: #9E9E9E
  - Gray 700: #616161
  - Gray 900: #212121

### Spacing

- **Section padding**: 120px vertical (desktop), 64px (mobile)
- **Component spacing**: 48px between major elements
- **Paragraph spacing**: 24px
- **Button padding**: 16px 32px

## Page Structure

### 1. Navigation (Fixed)

```
Height: 64px
Background: White/Black with 95% opacity backdrop blur
Content: Logo (left), Download CTA (right)
```

### 2. Hero Section

```
Height: 100vh - 64px (nav height)
Layout: Centered content, max-width 800px
Elements:
- H1: "See Bitcoin prices everywhere"
- Subheading: "Convert any price to Bitcoin automatically"
- Primary CTA: "Add to Chrome" (Bitcoin orange)
- Live demo: Simple price conversion animation
```

### 3. Feature Grid

```
3 columns (desktop), 1 column (mobile)
Each feature:
- Simple line icon (24px)
- H3: Feature title
- Body: 2-line description
Features:
1. Instant conversion
2. Works everywhere
3. Always current
```

### 4. How It Works

```
3-step horizontal flow
Each step:
- Number (large, gray)
- Screenshot (minimal, bordered)
- Description (concise)
```

### 5. Testimonials

```
Single centered quote
Large quotation marks (Bitcoin orange)
Author name and title below
```

### 6. Final CTA

```
Centered section
H2: "Start seeing Bitcoin prices"
Secondary CTA button
```

### 7. Footer

```
Minimal: Copyright, GitHub link, Privacy Policy
Single row, centered
```

## Visual Components

### Buttons

```css
Primary Button:
- Background: #F7931A
- Color: white
- Border-radius: 0px
- Padding: 16px 32px
- Font-weight: 500
- Hover: darken 10%
- Active: darken 20%
```

### Icons

- **Style**: Outline, 2px stroke
- **Size**: 24px standard
- **Source**: Lucide Icons or custom SVG

### Images

- **Screenshots**: Clean browser mockups
- **Borders**: 1px solid Gray 300
- **No shadows or effects**

## Animations

- **Philosophy**: Subtle, functional only
- **Page load**: Fade in (300ms)
- **Scroll**: No parallax, simple reveal
- **Hover states**: Color transitions (200ms)
- **Demo**: Type-and-convert effect (hero only)

## Implementation Steps

### Phase 1: Setup (30 mins)

1. Initialize Next.js with TypeScript

```bash
npx create-next-app@latest bitcoin-price-tag-splash --typescript --tailwind --app
```

2. Install dependencies

```bash
pnpm add @fontsource-variable/inter framer-motion lucide-react
```

3. Configure Tailwind for Swiss grid

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        "bitcoin-orange": "#F7931A",
        gray: {
          100: "#F8F8F8",
          300: "#E0E0E0",
          500: "#9E9E9E",
          700: "#616161",
          900: "#212121",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        120: "30rem",
      },
    },
  },
};
```

### Phase 2: Components (1 hour)

Create atomic components:

1. `Navigation.tsx`
2. `Button.tsx`
3. `FeatureCard.tsx`
4. `StepCard.tsx`
5. `Container.tsx` (grid wrapper)

### Phase 3: Sections (1 hour)

Build page sections:

1. `HeroSection.tsx` (with conversion demo)
2. `FeaturesSection.tsx`
3. `HowItWorksSection.tsx`
4. `TestimonialsSection.tsx`
5. `CTASection.tsx`
6. `Footer.tsx`

### Phase 4: Assembly (30 mins)

1. Compose sections in `app/page.tsx`
2. Add scroll animations with Framer Motion
3. Implement conversion demo animation

### Phase 5: Polish (30 mins)

1. Responsive adjustments
2. Optimize typography scale
3. Add meta tags and favicon
4. Performance optimization

## Code Structure

```
/app
  layout.tsx       (global layout)
  page.tsx         (home page)
  globals.css      (base styles)
/components
  /ui
    Button.tsx
    Container.tsx
  /sections
    HeroSection.tsx
    FeaturesSection.tsx
    ...
  Navigation.tsx
/public
  icon.svg
  og-image.png
/lib
  utils.ts
```

## Key Implementation Details

### Hero Conversion Demo

```typescript
// Simple typing effect showing:
// "$99.99" → "0.00234584 BTC"
// Use CSS animations, no JS libraries
```

### Responsive Grid

```css
/* Mobile-first approach */
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Feature card spans */
.feature-card {
  grid-column: span 12; /* mobile */
}

@media (min-width: 768px) {
  .feature-card {
    grid-column: span 4; /* desktop */
  }
}
```

### Typography Scale

```css
/* Fluid typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  font-weight: 700;
}
```

## Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle size**: < 150KB

## Accessibility

- **Color contrast**: WCAG AA compliant
- **Keyboard navigation**: Full support
- **Screen readers**: Semantic HTML
- **Focus states**: Visible outlines

## Quick Start Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Deployment

Deploy to Vercel with one click:

```bash
vercel
```

## Success Metrics

- **Time to implement**: 3-4 hours
- **Lighthouse score**: 95+
- **Click-through rate**: Track "Add to Chrome" clicks
- **Bounce rate**: < 30%

This plan prioritizes speed and simplicity while maintaining Swiss design principles. Every decision serves the goal: drive Chrome extension downloads through clear, minimal design.
