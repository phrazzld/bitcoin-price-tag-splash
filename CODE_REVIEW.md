## CRITICAL ISSUES

### [Missing Unit Tests for Core Animation Utility Hook] - BLOCKER

- **Location**: `lib/utils/use-intersection-observer.ts`
- **Violation**: Design for Testability (DEVELOPMENT_PHILOSOPHY.md §3), Testing Strategy (Frontend Appendix §4), Automate Everything. The `PLAN.md` (T004) mentions unit tests, but none are present in the PR.
- **Impact**: The `useIntersectionObserver` hook is central to the new CSS-only scroll-reveal animations, replacing Framer Motion's `useInView`. It contains non-trivial logic for observer setup, teardown, `triggerOnce`, and `respectReducedMotion`. Without unit tests, its correctness across various scenarios (initial render, intersection, unmount, reduced motion) is unverified, creating a high risk of regressions and making future refactoring perilous.
- **Fix**: Implement comprehensive unit tests for `useIntersectionObserver.ts` covering all its options, states, and lifecycle events. Ensure edge cases like `respectReducedMotion` behavior are explicitly tested.

## SIGNIFICANT CONCERNS

### [Non-Idiomatic JavaScript-Driven CSS Animation for Page Fade-In] - HIGH

- **Location**: `app/page.tsx` (lines 12-21), also replicated in `app/test-page-fade-in/page.tsx` and `app/test-all-animations/page.tsx`.
- **Violation**: Simplicity First, Coding Standards (avoiding unnecessary JS for CSS tasks).
- **Impact**: The page-level fade-in relies on `useState` and `useEffect` to toggle a CSS class (`fade-in`) after component mount. This introduces unnecessary JavaScript state and lifecycle management for a purely presentational, non-interactive animation. It can lead to a slight delay or flash of unstyled content (FOUC) and makes the animation dependent on JavaScript execution.
- **Fix**: Implement the page fade-in using pure CSS. Apply the `fade-in` animation class directly in the JSX or ensure CSS applies the animation on load without JavaScript intervention (e.g., `animation: fadeIn var(--animation-duration-short) var(--animation-easing-entrance) forwards;` on the root element).

### [Hardcoded Initial Transform Styles for Animated Background Orbs] - HIGH

- **Location**: `components/ui/AnimatedBackground.tsx` (lines 12-13, 17-18)
- **Violation**: Separation of Concerns, UI Library and Styling (Frontend Appendix §3.3 - avoid inline styles).
- **Impact**: The initial `transform` values for the floating orbs are hardcoded as inline `style` attributes. These values are intrinsically linked to the `0%` state of their respective CSS `@keyframes` (`floatOrbOne`, `floatOrbTwo` in `app/globals.css`). This creates redundancy and a hidden coupling; if the keyframe's starting point changes, the inline style must also be updated, otherwise, a visual jump/glitch will occur.
- **Fix**: Remove the inline `style` attributes for `transform`. Ensure the CSS keyframes define the complete animation from its initial (0%) state to its end state. The component should only apply the CSS class that triggers the animation.

### [Inconsistent and Brittle CSS Class Composition in ScrollReveal] - HIGH

- **Location**: `components/animation/ScrollReveal.tsx` (lines 33-39)
- **Violation**: Coding Standards, Maintainability, Modularity.
- **Impact**: The `combinedClassName` is constructed using direct string template concatenation with hardcoded prefixes like `delay-` and `duration-`. This is fragile: typos in class names won't be caught, and changes to the CSS utility class naming convention (e.g., `delay-short` to `d-short`) would break the component silently. It's also less readable than using a dedicated class-name utility.
- **Fix**: Utilize a utility like `clsx` (already a project dependency) for composing class names. Map prop values (e.g., `delay: 'short'`) to their full CSS class names (e.g., `delay-short`) more robustly within the component or ensure the props directly match the suffix. Example: `clsx(className, isIntersecting ? 'scroll-reveal-final' : 'scroll-reveal-initial', delay !== 'none' && \`delay-${delay}\`, duration !== 'medium' && \`duration-${duration}\`)`.

### [Missing Explicit Return Types for Page Components] - HIGH

- **Location**: All new `page.tsx` files under `app/test-*` (e.g., `app/test-all-animations/page.tsx`, `app/test-animated-background/page.tsx`, etc.) and `app/page.tsx`.
- **Violation**: Coding Standards (TypeScript Appendix §5 - Explicit Return Types for exported functions).
- **Impact**: Exported React functional components lack explicit return type annotations (e.g., `: React.ReactNode` or `: JSX.Element`). This reduces type safety, makes function signatures less clear, and can hide potential errors if the component inadvertently returns an invalid type.
- **Fix**: Add explicit return type annotations to all React functional components. For example, `export default function TestAllAnimationsPage(): React.ReactNode { ... }`.

### [No Automated Accessibility (a11y) Checks for New Animation System] - HIGH

- **Location**: Project-wide (no new a11y test configurations or Storybook stories with a11y addons for animation components/utilities).
- **Violation**: Accessibility (Core Philosophy & Frontend Appendix), Testing Strategy, Automate Everything. `PLAN.md` (Testing Strategy > Accessibility Testing) mentions manual checks, but automation is key.
- **Impact**: While `prefers-reduced-motion` is implemented, there's no automated verification that animations are truly non-disruptive, that content remains accessible during/after animation, or that focus management is handled correctly. This risks introducing a11y regressions.
- **Fix**: Integrate automated accessibility checks (e.g., `jest-axe` for unit/integration tests, Storybook a11y addon for visual components) for the new animation components (`ScrollReveal`, `AnimatedBackground`) and CSS utility classes. Create Storybook stories for these to facilitate a11y testing.
