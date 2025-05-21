# Remediation Plan – Sprint <N>

## Executive Summary

This plan outlines the remediation for critical and high-severity issues identified in the recent code review. The primary goals are to establish robust testing for core animation utilities (unblocking future development), improve code quality by adhering to simplicity and CSS best practices, enhance maintainability, and integrate automated accessibility checks. The strike order prioritizes the blocker, followed by quick wins and foundational improvements, culminating in comprehensive accessibility automation.

## Strike List

| Seq | CR‑ID | Title                                                     | Effort | Owner?   |
| --- | ----- | --------------------------------------------------------- | ------ | -------- |
| 1   | cr-01 | Add Unit Tests for `useIntersectionObserver` Hook         | m      | Frontend |
| 2   | cr-03 | Remove Hardcoded Initial Styles from `AnimatedBackground` | xs     | Frontend |
| 3   | cr-04 | Refactor CSS Class Composition in `ScrollReveal`          | xs     | Frontend |
| 4   | cr-02 | Implement Page Fade-In with Pure CSS                      | s      | Frontend |
| 5   | cr-05 | Add Explicit Return Types to Page Components              | s      | Frontend |
| 6   | cr-06 | Implement Automated Accessibility (a11y) Checks           | m      | Frontend |

## Detailed Remedies

### cr-01 Add Unit Tests for `useIntersectionObserver` Hook

- **Problem:** The core `useIntersectionObserver` hook, essential for new animations, has no unit tests.
- **Impact:** Unverified correctness across various scenarios (initial render, intersection, unmount, `triggerOnce`, `respectReducedMotion`) creates high regression risk and makes refactoring perilous. This is a **BLOCKER**.
- **Chosen Fix:** Implement comprehensive unit tests using Jest/Vitest and React Testing Library, with mocks for the `IntersectionObserver` API.
- **Steps:**
  1. Set up test file: `lib/utils/__tests__/use-intersection-observer.test.ts`.
  2. Implement a mock for the `IntersectionObserver` API to control callbacks and observe/unobserve calls.
  3. Test initial state: `isIntersecting` is false, ref is correctly handled.
  4. Test intersection: `isIntersecting` becomes true when the mock observer triggers.
  5. Test `triggerOnce: true` option: observer unobserves and disconnects after the first intersection.
  6. Test `triggerOnce: false` option: `isIntersecting` updates on multiple intersections.
  7. Test `respectReducedMotion: true`: `isIntersecting` is true immediately if `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
  8. Test component unmount: observer is disconnected.
  9. Verify correct options (`threshold`, `rootMargin`) are passed to the `IntersectionObserver` constructor.
- **Done‑When:** Unit tests cover all options, states, and lifecycle events of the hook, achieving >90% code coverage. CI pipeline passes.

### cr-03 Remove Hardcoded Initial Styles from `AnimatedBackground`

- **Problem:** Initial `transform` values for animated orbs are hardcoded as inline styles, duplicating the `0%` state of CSS keyframes.
- **Impact:** Redundancy and hidden coupling; if CSS keyframes' starting points change, inline styles must also be updated, risking visual glitches. Violates Separation of Concerns.
- **Chosen Fix:** Remove inline `transform` styles and ensure CSS keyframes define the complete animation from its initial (0%) state.
- **Steps:**
  1. In `components/ui/AnimatedBackground.tsx`, remove the inline `style` attributes for `transform` from the orb `div` elements.
  2. In `app/globals.css`, verify that the `0%` state of `@keyframes floatOrbOne` and `@keyframes floatOrbTwo` correctly defines their intended initial `transform` values.
  3. Visually inspect `AnimatedBackground` component to ensure orbs start in the correct position and animate smoothly without jumps.
- **Done‑When:** Inline `transform` styles are removed. Animations start correctly based purely on CSS keyframes.

### cr-04 Refactor CSS Class Composition in `ScrollReveal`

- **Problem:** `ScrollReveal.tsx` constructs `combinedClassName` using direct string template concatenation with hardcoded prefixes, which is fragile.
- **Impact:** Prone to typos, silent breakage if CSS utility class names change, less readable, and harder to maintain.
- **Chosen Fix:** Utilize the `clsx` utility (already a project dependency) for robust and readable class name composition.
- **Steps:**
  1. In `components/animation/ScrollReveal.tsx`, import `clsx`.
  2. Refactor the `combinedClassName` logic to use `clsx`. Example: `clsx(className, isIntersecting ? 'scroll-reveal-final' : 'scroll-reveal-initial', delay !== 'none' && \`delay-${delay}\`, duration !== 'medium' && \`duration-${duration}\`)`.
  3. Test the `ScrollReveal` component with various `delay` and `duration` props to ensure correct classes are applied.
- **Done‑When:** Class names are composed using `clsx`. Component correctly applies dynamic classes based on props.

### cr-02 Implement Page Fade-In with Pure CSS

- **Problem:** Page-level fade-in relies on `useState` and `useEffect` to toggle a CSS class, introducing unnecessary JavaScript.
- **Impact:** Can lead to a slight delay or Flash of Unstyled Content (FOUC) and makes the animation dependent on JavaScript execution. Violates Simplicity First.
- **Chosen Fix:** Implement the page fade-in using pure CSS by applying the animation class directly or ensuring CSS applies the animation on load.
- **Steps:**
  1. In `app/page.tsx`, `app/test-page-fade-in/page.tsx`, and `app/test-all-animations/page.tsx`, remove the `useState` and `useEffect` hooks used for the fade-in effect.
  2. Apply the `fade-in` CSS class (or equivalent animation-triggering class) directly to the main page container element in the JSX.
  3. Ensure the corresponding CSS animation (e.g., in `app/globals.css`) defines the initial state (e.g., `opacity: 0`) and animates to the final state (`opacity: 1`) with `animation-fill-mode: forwards;`.
  4. Visually verify the fade-in effect on page load, ensuring no FOUC.
- **Done‑When:** Page fade-in occurs via pure CSS without JavaScript intervention. Unnecessary state and effects are removed.

### cr-05 Add Explicit Return Types to Page Components

- **Problem:** Exported React functional page components lack explicit return type annotations.
- **Impact:** Reduces type safety, makes function signatures less clear, and can hide potential errors. Violates Coding Standards (TypeScript Appendix §5).
- **Chosen Fix:** Add explicit return type annotations (e.g., `: React.ReactNode` or `: JSX.Element`) to all React functional page components.
- **Steps:**
  1. Identify all new `page.tsx` files under `app/test-*` and `app/page.tsx`.
  2. For each exported functional component, add an explicit return type, e.g., `export default function MyPage(): React.ReactNode { ... }`.
  3. Run `pnpm type-check` (or equivalent) to ensure all additions are correct and no new type errors are introduced.
- **Done‑When:** All specified page components have explicit return types. TypeScript compilation passes without errors.

### cr-06 Implement Automated Accessibility (a11y) Checks

- **Problem:** No automated accessibility checks are in place for the new animation system.
- **Impact:** Risks introducing a11y regressions, despite `prefers-reduced-motion` implementation. Violates Accessibility, Testing Strategy, and Automate Everything.
- **Chosen Fix:** Integrate automated accessibility checks using `jest-axe` for unit/integration tests and the Storybook a11y addon for visual components.
- **Steps:**
  1. Install `jest-axe` and configure it with the existing test runner (Jest/Vitest).
  2. Add `axe` checks to new or existing unit/integration tests for `ScrollReveal`, `AnimatedBackground`, and pages utilizing these animations.
  3. Create/update Storybook stories for `ScrollReveal` and `AnimatedBackground` components.
  4. Install and configure the Storybook a11y addon.
  5. Verify that these components pass a11y checks in both testing environments (Jest and Storybook).
  6. Integrate these checks into the CI pipeline.
- **Done‑When:** Automated a11y checks are implemented for animation components. CI pipeline includes and passes these checks. Storybook provides a11y feedback.

## Standards Alignment

- **Testability & Automate Everything:** CR-01 and CR-06 directly address these by mandating unit tests for a core hook and integrating automated a11y checks, aligning with `DEVELOPMENT_PHILOSOPHY.md §3`, `Frontend Appendix §4`, and `PLAN.md` (T004, Accessibility Testing).
- **Simplicity First & Coding Standards:** CR-02 simplifies page animations by removing unnecessary JavaScript, adhering to "avoiding unnecessary JS for CSS tasks."
- **Separation of Concerns & UI Library and Styling:** CR-03 enforces this by moving animation start states entirely to CSS, avoiding inline styles as per `Frontend Appendix §3.3`.
- **Maintainability, Modularity & Coding Standards:** CR-04 improves class composition robustness using `clsx`, enhancing code clarity and resilience to change.
- **Coding Standards (TypeScript):** CR-05 mandates explicit return types for exported functions as per `TypeScript Appendix §5`.
- **Accessibility:** CR-06 establishes automated checks, reinforcing the commitment to accessibility outlined in `Core Philosophy & Frontend Appendix`.

## Validation Checklist

- Automated tests (including new unit tests for `useIntersectionObserver` and a11y tests) are green.
- Static analyzers (TypeScript, ESLint) are clear, with no new warnings or errors.
- Manual verification of animations (page fade-in, background orbs, scroll-reveal) confirms correct behavior and no visual regressions or FOUC.
- `prefers-reduced-motion` behavior is confirmed manually and covered by tests where applicable.
- No new lint or audit warnings are present in the CI build.
