# Todo

## CSS-Only Animations Refactoring

- [x] **T001 · Chore · P2: create feature branch for css-only animations**

  - **Context:** PLAN.md > Branch Strategy
  - **Action:**
    1. Execute `git checkout -b feature/css-only-animations`.
  - **Done‑when:**
    1. Feature branch `feature/css-only-animations` is created locally and pushed to the remote repository.
  - **Verification:**
    1. Verify the new branch exists on the remote repository.
  - **Depends‑on:** none

- [x] **T002 · Chore · P1: measure current bundle size and capture animation baselines**

  - **Context:** PLAN.md > Implementation Steps > 1. Measure Current Bundle Size
  - **Action:**
    1. Use Next.js built-in tools to measure and document the current JavaScript bundle size.
    2. Take screenshots and/or video recordings of all current Framer Motion animations to establish a visual baseline.
  - **Done‑when:**
    1. Current bundle size metrics are recorded (e.g., in project documentation or a dedicated file).
    2. Visual baselines (screenshots/recordings) of all affected animations are saved in a designated project folder (e.g., `docs/animation_baselines/before`).
  - **Verification:**
    1. Confirm bundle size report is clear and comprehensive.
    2. Verify visual baselines clearly capture the behavior of current animations.
  - **Depends‑on:** none

- [x] **T003 · Feature · P1: implement css animation utilities with reduced motion support**

  - **Context:** PLAN.md > Implementation Steps > 2. Create CSS Animation Utilities; Architecture Approach > New Components/Files to Create > 2; Risk Mitigation > Visual Differences, Accessibility
  - **Action:**
    1. Add CSS animation classes (e.g., `.fade-in`, `.slide-up`) and associated `@keyframes` to `app/globals.css`.
    2. Utilize CSS variables for animation parameters (timing, easing, etc.) for consistency.
    3. Implement `@media (prefers-reduced-motion: reduce)` overrides to disable or significantly reduce these animations.
  - **Code Area:** `app/globals.css`
  - **Done‑when:**
    1. A set of reusable CSS animation utility classes and keyframes are defined in `app/globals.css`.
    2. CSS variables are used for animation parameters.
    3. Animations correctly respect the `prefers-reduced-motion` media query.
  - **Verification:**
    1. Create a test page or use Storybook to visually verify each animation utility class.
    2. Toggle the `prefers-reduced-motion` setting in browser/OS to confirm animations are disabled/reduced.
  - **Depends‑on:** none

- [x] **T004 · Feature · P1: implement `useIntersectionObserver` react hook**

  - **Context:** PLAN.md > Implementation Steps > 3. Create Intersection Observer Hook; Architecture Approach > New Components/Files to Create > 1
  - **Action:**
    1. Create the custom React hook `useIntersectionObserver` in `lib/utils/use-intersection-observer.ts`.
    2. Implement logic to handle the `triggerOnce` behavior (unobserve after the first intersection).
    3. Ensure proper cleanup (disconnecting the observer) in `useEffect` return statement.
  - **Code Area:** `lib/utils/use-intersection-observer.ts`
  - **Done‑when:**
    1. The `useIntersectionObserver` hook is implemented, exported, and includes `triggerOnce` functionality.
    2. The hook correctly cleans up the IntersectionObserver instance on component unmount.
    3. Hook is unit tested for its core functionalities.
  - **Verification:**
    1. Test the hook in a sample component to confirm it correctly detects intersection and respects `triggerOnce`.
    2. Verify via browser dev tools or logs that the observer is disconnected on unmount.
  - **Depends‑on:** none

- [ ] **T005 · Refactor · P1: refactor `AnimatedBackground` component to use css animations**

  - **Context:** PLAN.md > Implementation Steps > 4. Refactor AnimatedBackground Component; Architecture Approach > Components Affected > 3; Risk Mitigation > Visual Differences
  - **Action:**
    1. Remove Framer Motion dependencies and usage from `components/ui/AnimatedBackground.tsx`.
    2. Replace existing animations with pure CSS `@keyframes` animations, utilizing utilities from T003 if applicable.
  - **Code Area:** `components/ui/AnimatedBackground.tsx`
  - **Done‑when:**
    1. `AnimatedBackground.tsx` uses only CSS for its animations.
    2. The visual appearance and behavior of the background animation closely match the original baseline (from T002).
    3. Animation respects `prefers-reduced-motion` settings (as implemented in T003).
  - **Verification:**
    1. Visually compare the refactored component's animation against the baseline recordings/screenshots.
    2. Test with `prefers-reduced-motion` enabled.
  - **Depends‑on:** [T002, T003]

- [ ] **T006 · Refactor · P1: refactor page-level fade-in on `app/page.tsx` to css**

  - **Context:** PLAN.md > Implementation Steps > 5. Refactor Page-Level Fade-in; Architecture Approach > Components Affected > 1; Risk Mitigation > Visual Differences
  - **Action:**
    1. Remove the `motion.div` wrapper and any associated Framer Motion logic from `app/page.tsx`.
    2. Apply a CSS class (e.g., `.fade-in` from T003) to the main content container to achieve the fade-in effect.
  - **Code Area:** `app/page.tsx`
  - **Done‑when:**
    1. The page-level fade-in animation in `app/page.tsx` is implemented using only CSS.
    2. The visual appearance and timing of the fade-in match the original baseline (from T002).
    3. Animation respects `prefers-reduced-motion` settings (as implemented in T003).
  - **Verification:**
    1. Load `app/page.tsx` and visually compare the fade-in animation against the baseline.
    2. Test with `prefers-reduced-motion` enabled.
  - **Depends‑on:** [T002, T003]

- [ ] **T007 · Refactor · P1: refactor `ScrollReveal` component to use css and intersectionobserver**

  - **Context:** PLAN.md > Implementation Steps > 6. Refactor ScrollReveal Component; Architecture Approach > Components Affected > 2; Risk Mitigation > Visual Differences
  - **Action:**
    1. Remove Framer Motion dependencies and usage from `components/animation/ScrollReveal.tsx`.
    2. Integrate the `useIntersectionObserver` hook (T004) to toggle CSS classes (from T003) that trigger animations.
    3. Ensure the component's props API (timing, delay, thresholds) is maintained and mapped to CSS/hook options.
  - **Code Area:** `components/animation/ScrollReveal.tsx`
  - **Done‑when:**
    1. `ScrollReveal.tsx` uses CSS transitions/animations triggered by class changes via `useIntersectionObserver`.
    2. The component maintains its props API for custom animation timing, delay, and thresholds.
    3. The visual appearance and behavior of scroll-triggered animations match the original baseline (from T002).
    4. Animations respect `prefers-reduced-motion` settings (as implemented in T003).
  - **Verification:**
    1. Test the `ScrollReveal` component on a page with scrollable content.
    2. Verify that animations trigger correctly based on intersection and props.
    3. Visually compare against baselines and test with `prefers-reduced-motion` enabled.
  - **Depends‑on:** [T002, T003, T004]

- [ ] **T008 · Test · P1: perform visual testing of all refactored animations**

  - **Context:** PLAN.md > Testing Strategy > 1. Visual Testing
  - **Action:**
    1. Test all refactored animations (page fade-in, background, scroll reveal) on designated test pages (e.g., `/test-*` routes) or relevant application pages.
    2. Compare the visual appearance and behavior with the original animation baselines (from T002).
    3. Test responsive behavior of animations on different screen sizes.
  - **Done‑when:**
    1. Visual appearance and animation quality remain consistent with the original animations, or deviations are documented and accepted.
    2. Animations behave correctly across different screen sizes.
  - **Verification:**
    1. Conduct side-by-side visual comparisons with baselines from T002.
    2. Use browser developer tools to simulate various screen sizes.
  - **Depends‑on:** [T002, T005, T006, T007]

- [ ] **T009 · Test · P1: perform accessibility testing for animations**

  - **Context:** PLAN.md > Testing Strategy > 2. Accessibility Testing; Risk Mitigation > Accessibility
  - **Action:**
    1. Verify that all refactored animations correctly respect the `prefers-reduced-motion` setting (as implemented in T003).
    2. Ensure that content remains fully accessible and usable if animations fail or are disabled.
  - **Done‑when:**
    1. Animations are disabled or reduced appropriately when `prefers-reduced-motion` is active.
    2. Content is accessible and readable even if CSS animations do not run.
  - **Verification:**
    1. Enable `prefers-reduced-motion` in OS/browser settings and observe animation behavior.
    2. Temporarily disable CSS animations (e.g., via browser dev tools) and verify content accessibility.
  - **Depends‑on:** [T003, T005, T006, T007]

- [ ] **T010 · Test · P1: perform browser compatibility testing for animations**

  - **Context:** PLAN.md > Testing Strategy > 3. Browser Compatibility Testing; Risk Mitigation > Browser Compatibility
  - **Action:**
    1. Test all refactored animations on all supported browsers (Chrome, Firefox, Safari, Edge).
    2. Verify graceful degradation of animations where CSS features might have limited support.
    3. Check for any console errors or significant performance issues related to animations.
  - **Done‑when:**
    1. Animations work correctly and consistently across all supported browsers.
    2. Graceful degradation is confirmed where applicable.
    3. No new console errors or performance regressions are introduced by the CSS animations.
  - **Verification:**
    1. Manually test each animation on the latest stable versions of Chrome, Firefox, Safari, and Edge.
  - **Depends‑on:** [T005, T006, T007]

- [ ] **T011 · Chore · P1: remove framer motion dependency from project**

  - **Context:** PLAN.md > Implementation Steps > 8. Remove Framer Motion Dependency
  - **Action:**
    1. Execute `pnpm remove framer-motion`.
    2. Verify that `framer-motion` is removed from `package.json` and the project's lock file.
    3. Perform a codebase search to ensure no remaining Framer Motion imports or usages
  - **Done‑when:**
    1. Framer Motion is completely removed from the project's dependencies.
    2. No import statements or usage of Framer Motion remain in the codebase.
  - **Verification:**
    1. Verify the package.json does not contain `framer-motion`.
    2. Run a project-wide search for `framer-motion` and `import { motion }` to ensure all references are removed.
  - **Depends‑on:** [T005, T006, T007]

- [ ] **T012 · Chore · P1: measure new bundle size and document improvements**

  - **Context:** PLAN.md > Implementation Steps > 9. Measure New Bundle Size
  - **Action:**
    1. Use the same tools from T002 to measure the new JavaScript bundle size.
    2. Calculate and document the bundle size reduction achieved.
  - **Done‑when:**
    1. New bundle size metrics are recorded in the same format as in T002.
    2. The size reduction is documented (absolute and percentage).
  - **Verification:**
    1. Confirm the comparison between the original and new bundle sizes is accurate and clear.
  - **Depends‑on:** [T011]

- [ ] **T013 · Cleanup · P1: perform final code cleanup and documentation**

  - **Context:** PLAN.md > Implementation Steps > 10. Code Cleanup and Documentation
  - **Action:**
    1. Ensure all code is properly formatted and linted.
    2. Add appropriate comments explaining the CSS animation approach where needed.
    3. Update documentation (e.g., README, CLAUDE.md) regarding animation approach if necessary.
  - **Done‑when:**
    1. Code is clean, well-commented, and follows project standards.
    2. Documentation accurately reflects the new approach to animations (CSS-only).
  - **Verification:**
    1. Verify code passes linting and type checking (`pnpm lint`, `pnpm type-check`).
    2. Review documentation for accuracy and clarity.
  - **Depends‑on:** [T011]

- [ ] **T014 · Pull Request · P1: create pull request linking to issue #8**
  - **Context:** PLAN.md > Acceptance Criteria
  - **Action:**
    1. Push all changes to the feature branch.
    2. Create a pull request on GitHub.
    3. Include "Fixes #8" in the PR description to link it to issue #8.
    4. Fill out the PR template with details of the changes made.
  - **Done‑when:**
    1. Pull request is created and linked to issue #8.
    2. PR description includes details about the CSS animation approach, bundle size reduction, and testing performed.
  - **Verification:**
    1. Verify the PR links correctly to issue #8.
    2. Ensure PR passes CI checks and is ready for review.
  - **Depends‑on:** [T012, T013]
