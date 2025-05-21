```markdown
# Todo

## CR-01 Add Unit Tests for `useIntersectionObserver` Hook

- [x] **T001 · Chore · P0**: set up test file and mock `IntersectionObserver` for `useIntersectionObserver`
  - **Context:** Detailed Remedies -> cr-01 -> Steps 1, 2
  - **Action:**
    1. Create test file: `lib/utils/__tests__/use-intersection-observer.test.ts`.
    2. Implement a mock for the `IntersectionObserver` API to control callbacks and observe/unobserve/disconnect calls.
  - **Done‑when:**
    1. Test file is created and the `IntersectionObserver` mock is functional within it.
  - **Depends‑on:** none
- [x] **T002 · Test · P1**: test `useIntersectionObserver` initial state and ref handling
  - **Context:** Detailed Remedies -> cr-01 -> Step 3
  - **Action:**
    1. Write unit tests to verify `isIntersecting` is initially `false`.
    2. Write unit tests to verify the ref is correctly handled and `observe` is called.
  - **Done‑when:**
    1. Tests for initial state and ref handling pass.
  - **Depends‑on:** [T001]
- [x] **T003 · Test · P1**: test `useIntersectionObserver` intersection behavior
  - **Context:** Detailed Remedies -> cr-01 -> Step 4
  - **Action:**
    1. Write unit tests to verify `isIntersecting` becomes `true` when the mock observer triggers an intersection.
  - **Done‑when:**
    1. Tests for basic intersection behavior pass.
  - **Depends‑on:** [T001]
- [x] **T004 · Test · P1**: test `useIntersectionObserver` `triggerOnce: true` option
  - **Context:** Detailed Remedies -> cr-01 -> Step 5
  - **Action:**
    1. Write unit tests to verify that with `triggerOnce: true`, the observer unobserves and disconnects after the first intersection.
  - **Done‑when:**
    1. Tests for `triggerOnce: true` behavior pass.
  - **Depends‑on:** [T001]
- [x] **T005 · Test · P1**: test `useIntersectionObserver` `triggerOnce: false` option
  - **Context:** Detailed Remedies -> cr-01 -> Step 6
  - **Action:**
    1. Write unit tests to verify `isIntersecting` updates correctly on multiple intersections when `triggerOnce: false`.
  - **Done‑when:**
    1. Tests for `triggerOnce: false` behavior pass.
  - **Depends‑on:** [T001]
- [x] **T006 · Test · P1**: test `useIntersectionObserver` `respectReducedMotion: true` option
  - **Context:** Detailed Remedies -> cr-01 -> Step 7
  - **Action:**
    1. Mock `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
    2. Write unit tests to verify `isIntersecting` is `true` immediately if `respectReducedMotion: true` and reduced motion is preferred.
  - **Done‑when:**
    1. Tests for `respectReducedMotion: true` behavior pass.
  - **Depends‑on:** [T001]
- [x] **T007 · Test · P1**: test `useIntersectionObserver` unmount behavior
  - **Context:** Detailed Remedies -> cr-01 -> Step 8
  - **Action:**
    1. Write unit tests to verify the observer is disconnected when the component unmounts.
  - **Done‑when:**
    1. Tests for unmount behavior pass.
  - **Depends‑on:** [T001]
- [x] **T008 · Test · P1**: test `useIntersectionObserver` options passing
  - **Context:** Detailed Remedies -> cr-01 -> Step 9
  - **Action:**
    1. Write unit tests to verify correct options (`threshold`, `rootMargin`) are passed to the `IntersectionObserver` constructor.
  - **Done‑when:**
    1. Tests for options passing pass.
    2. All `useIntersectionObserver` tests collectively achieve >90% code coverage.
  - **Depends‑on:** [T001]

## CR-03 Remove Hardcoded Initial Styles from `AnimatedBackground`

- [ ] **T009 · Refactor · P2**: remove inline `transform` styles from `AnimatedBackground` orbs
  - **Context:** Detailed Remedies -> cr-03 -> Step 1
  - **Action:**
    1. In `components/ui/AnimatedBackground.tsx`, remove the inline `style` attributes for `transform` from the orb `div` elements.
  - **Done‑when:**
    1. Inline `transform` styles are removed.
  - **Depends‑on:** none
- [ ] **T010 · Refactor · P2**: verify/update CSS keyframes for `AnimatedBackground` initial orb state
  - **Context:** Detailed Remedies -> cr-03 -> Steps 2, 3
  - **Action:**
    1. In `app/globals.css`, verify/update that the `0%` state of `@keyframes floatOrbOne` and `@keyframes floatOrbTwo` correctly defines their intended initial `transform` values.
  - **Done‑when:**
    1. CSS keyframes correctly define the initial `transform` for orbs.
  - **Verification:**
    1. Visually inspect `AnimatedBackground` component to ensure orbs start in the correct position and animate smoothly without jumps.
  - **Depends‑on:** [T009]

## CR-04 Refactor CSS Class Composition in `ScrollReveal`

- [ ] **T011 · Refactor · P2**: refactor `ScrollReveal` class composition to use `clsx`
  - **Context:** Detailed Remedies -> cr-04 -> Steps 1, 2, 3
  - **Action:**
    1. In `components/animation/ScrollReveal.tsx`, import `clsx`.
    2. Refactor the `combinedClassName` logic to use `clsx`.
  - **Done‑when:**
    1. Class names in `ScrollReveal.tsx` are composed using `clsx`.
  - **Verification:**
    1. Test the `ScrollReveal` component with various `delay` and `duration` props to ensure correct classes are applied.
  - **Depends‑on:** none

## CR-02 Implement Page Fade-In with Pure CSS

- [ ] **T012 · Refactor · P2**: remove JS fade-in logic from specified page components
  - **Context:** Detailed Remedies -> cr-02 -> Step 1
  - **Action:**
    1. In `app/page.tsx`, `app/test-page-fade-in/page.tsx`, and `app/test-all-animations/page.tsx`, remove the `useState` and `useEffect` hooks used for the fade-in effect.
  - **Done‑when:**
    1. JavaScript-based fade-in logic is removed from the specified page components.
  - **Depends‑on:** none
- [ ] **T013 · Refactor · P2**: apply CSS animation class directly to page containers for fade-in
  - **Context:** Detailed Remedies -> cr-02 -> Step 2
  - **Action:**
    1. In the JSX of `app/page.tsx`, `app/test-page-fade-in/page.tsx`, and `app/test-all-animations/page.tsx`, apply the `fade-in` CSS class (or equivalent) directly to the main page container element.
  - **Done‑when:**
    1. The animation-triggering CSS class is applied directly in the JSX of specified page components.
  - **Depends‑on:** [T012]
- [ ] **T014 · Refactor · P2**: ensure CSS correctly defines pure CSS page fade-in animation
  - **Context:** Detailed Remedies -> cr-02 -> Steps 3, 4
  - **Action:**
    1. Ensure the corresponding CSS animation (e.g., in `app/globals.css`) defines the initial state (e.g., `opacity: 0`), animates to the final state (`opacity: 1`), and uses `animation-fill-mode: forwards;`.
  - **Done‑when:**
    1. CSS for page fade-in is correctly implemented.
  - **Verification:**
    1. Visually verify the fade-in effect on page load for `app/page.tsx`, `app/test-page-fade-in/page.tsx`, and `app/test-all-animations/page.tsx`, ensuring no FOUC.
  - **Depends‑on:** [T013]

## CR-05 Add Explicit Return Types to Page Components

- [ ] **T015 · Chore · P2**: add explicit return types to specified page components
  - **Context:** Detailed Remedies -> cr-05 -> Steps 1, 2, 3
  - **Action:**
    1. Identify all new `page.tsx` files under `app/test-*` and `app/page.tsx`.
    2. For each exported functional component, add an explicit return type (e.g., `: React.ReactNode` or `: JSX.Element`).
  - **Done‑when:**
    1. All specified page components have explicit return types.
    2. `pnpm type-check` (or equivalent) passes without new type errors.
  - **Depends‑on:** none

## CR-06 Implement Automated Accessibility (a11y) Checks

- [ ] **T016 · Chore · P1**: install and configure `jest-axe`
  - **Context:** Detailed Remedies -> cr-06 -> Step 1
  - **Action:**
    1. Install `jest-axe` as a dev dependency.
    2. Configure `jest-axe` with the existing test runner (Jest/Vitest).
  - **Done‑when:**
    1. `jest-axe` is installed and configured for use in tests.
  - **Depends‑on:** none
- [ ] **T017 · Test · P1**: add `jest-axe` checks to animation components and page tests
  - **Context:** Detailed Remedies -> cr-06 -> Step 2
  - **Action:**
    1. Add `axe` checks to new or existing unit/integration tests for `ScrollReveal`, `AnimatedBackground`.
    2. Add `axe` checks to tests for pages utilizing these animations (e.g., `app/test-all-animations/page.tsx`).
  - **Done‑when:**
    1. `jest-axe` checks are implemented for specified components and pages, and these tests pass.
  - **Depends‑on:** [T016]
- [ ] **T018 · Chore · P1**: create/update Storybook stories for `ScrollReveal` and `AnimatedBackground`
  - **Context:** Detailed Remedies -> cr-06 -> Step 3
  - **Action:**
    1. Create or update Storybook stories for `ScrollReveal` and `AnimatedBackground` components, covering various states and props.
  - **Done‑when:**
    1. Storybook stories for `ScrollReveal` and `AnimatedBackground` are complete and accurately represent component usage.
  - **Depends‑on:** none
- [ ] **T019 · Chore · P1**: install and configure Storybook a11y addon
  - **Context:** Detailed Remedies -> cr-06 -> Step 4
  - **Action:**
    1. Install the Storybook a11y addon.
    2. Configure the addon in the Storybook setup.
  - **Done‑when:**
    1. Storybook a11y addon is installed and configured.
  - **Verification:**
    1. The a11y panel/tab is visible and functional in Storybook.
  - **Depends‑on:** none
- [ ] **T020 · Test · P1**: verify `ScrollReveal` & `AnimatedBackground` pass Storybook a11y checks
  - **Context:** Detailed Remedies -> cr-06 -> Step 5 (Storybook part)
  - **Action:**
    1. Using the Storybook a11y addon, verify that `ScrollReveal` and `AnimatedBackground` stories pass accessibility checks.
  - **Done‑when:**
    1. `ScrollReveal` and `AnimatedBackground` components pass a11y checks in Storybook.
  - **Depends‑on:** [T018, T019]
- [ ] **T021 · Chore · P1**: integrate automated a11y checks into CI pipeline
  - **Context:** Detailed Remedies -> cr-06 -> Step 6 (and CI part of Step 5)
  - **Action:**
    1. Integrate `jest-axe` checks (as part of the test suite run) into the CI pipeline.
    2. If feasible, integrate Storybook a11y addon checks into the CI pipeline.
  - **Done‑when:**
    1. Automated a11y checks are part of the CI pipeline.
    2. The CI pipeline passes these checks.
  - **Depends‑on:** [T017, T020]

### Clarifications & Assumptions

- [ ] **Issue:** Confirm specific list of "pages utilizing these animations" for `jest-axe` checks in T017 beyond `ScrollReveal` and `AnimatedBackground` components themselves.
  - **Context:** cr-06, Step 2. Assumed to include pages like `app/test-all-animations/page.tsx` as an example.
  - **Blocking?:** no
```
