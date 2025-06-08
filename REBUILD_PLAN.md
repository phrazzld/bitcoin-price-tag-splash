# Bitcoin Price Tag Splash Page - Complete Rebuild Plan

## Vision

Create a clean, minimal, and elegant Bitcoin Price Tag splash page that focuses on the core value proposition: seeing prices in Bitcoin instantly. Remove all clutter and complexity, focusing only on Next.js and shadcn/ui components.

## Current Problems Identified

- Overly complex component structure with too many test pages
- Excessive CSS custom properties and complex styling system
- Cluttered hero section with too many elements competing for attention
- Poor visual hierarchy - everything screams for attention
- Complex logging system unnecessary for a simple splash page
- Overwhelming amount of features and trust signals
- Poor color contrast and readability in many areas

## Design Philosophy

- **Swiss Minimalism**: Clean lines, plenty of whitespace, clear hierarchy
- **Bitcoin Orange**: Use sparingly as accent color only (#F7931A)
- **Typography**: Simple, readable, purposeful
- **Functionality**: One clear action - install the extension
- **Performance**: Fast, lightweight, accessible

## Technical Approach

- Keep only essential Next.js structure
- Use only shadcn/ui components
- Remove all custom CSS utilities and complex systems
- Minimal JavaScript - no complex state management
- Clean, semantic HTML structure

## Page Structure

### 1. Header/Navigation (Simple)

- Logo/Brand name on left
- Single CTA button on right
- Clean, minimal design

### 2. Hero Section (Focused)

- Clear headline: What it does
- Subheadline: Why it matters
- Single primary CTA button
- Simple visual demonstration

### 3. How It Works (3 Steps)

- Install extension
- Shop anywhere
- See Bitcoin prices instantly

### 4. Features (Maximum 3)

- Real-time Bitcoin prices
- Works on all shopping sites
- Privacy focused (no data collection)

### 5. Footer (Minimal)

- Secondary CTA
- Privacy statement
- Links (minimal)

## Component Strategy

### Keep From Existing

- Next.js app structure
- shadcn/ui configuration
- Basic TypeScript setup
- Bitcoin price fetching logic

### Remove Completely

- All test pages and directories
- Complex logging system
- Excessive CSS variables and utilities
- Multiple component variations
- Complex animation system
- Storybook setup
- All the sophisticated visual details

### Build From Scratch

- Simplified page layout
- Clean hero section
- Minimal price demo
- Simple feature cards
- Clean footer

## File Structure (Simplified)

```
/app
  layout.tsx (minimal)
  page.tsx (single page)
  globals.css (reset + shadcn)

/components
  /ui (shadcn components only)
  Header.tsx
  Hero.tsx
  HowItWorks.tsx
  Features.tsx
  Footer.tsx

/lib
  utils.ts (shadcn utils)
  bitcoin-price.ts (simple API call)
```

## Implementation Steps

### Phase 1: Clean Slate

1. Remove all test directories and pages
2. Strip globals.css to basics + shadcn
3. Simplify app/layout.tsx and app/page.tsx
4. Remove complex logging system

### Phase 2: Core Components

1. Build simple Header component
2. Create focused Hero section
3. Build How It Works section (3 steps)
4. Create Features section (3 features max)
5. Build minimal Footer

### Phase 3: Content & Polish

1. Write clear, concise copy
2. Implement clean Bitcoin price demo
3. Add subtle hover states and transitions
4. Optimize for mobile responsiveness

### Phase 4: Testing & Launch

1. Test across devices and browsers
2. Optimize performance
3. Final accessibility check
4. Deploy

## Content Strategy

### Headlines

- Primary: "See Any Price in Bitcoin Instantly"
- Secondary: "Transform your shopping experience with real-time Bitcoin conversions"

### Key Messages

1. **Instant**: See Bitcoin prices without thinking
2. **Universal**: Works on every shopping website
3. **Private**: Zero data collection, completely private

### Call-to-Action

- Primary: "Add to Chrome - Free"
- Secondary: "Learn More"

## Visual Design Principles

### Colors

- Background: Clean white (#FFFFFF)
- Text: Dark gray (#1F2937)
- Accent: Bitcoin Orange (#F7931A) - use sparingly
- Borders: Light gray (#E5E7EB)

### Typography

- Headlines: Inter, 600 weight, large scale
- Body: Inter, 400 weight, readable size
- Demo prices: Mono font for Bitcoin amounts

### Layout

- Single column, centered content
- Maximum width: 1200px
- Generous whitespace between sections
- Mobile-first responsive design

### Interactive Elements

- Subtle hover states
- Clean button styling
- Minimal loading states
- Smooth transitions (0.2s duration)

## Success Metrics

- Page load time < 2 seconds
- Single conversion goal: extension installs
- Clean, professional appearance
- Excellent mobile experience
- WCAG AA accessibility compliance

## Next Steps

1. Execute Phase 1: Clean slate
2. Build core components
3. Implement content strategy
4. Test and optimize
5. Launch refined experience

This rebuild will transform the cluttered, complex page into a clean, focused, and conversion-optimized landing page that clearly communicates the value of the Bitcoin Price Tag extension.
