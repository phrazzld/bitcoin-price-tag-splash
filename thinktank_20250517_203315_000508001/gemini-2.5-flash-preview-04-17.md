```markdown
## Chosen Approach
Implement the price conversion animation using CSS `@keyframes`, animating element visibility, opacity, and width with the `steps()` timing function for the typing effect.

## Rationale
- **Simplicity:** This approach is the simplest CSS-only method to achieve both the typing effect (`steps()`) and the transition between values (`@keyframes` controlling opacity/visibility). It avoids complex JavaScript logic or non-standard CSS hacks.
- **Modularity + Strict Separation:** The animation logic is entirely contained within CSS, adhering to the principle of separating presentation from behavior. It can be scoped to the Hero section component's styles.
- **Testability:** While not unit-testable, the visual animation is the required outcome and is verified by observation in the browser as per the ticket requirements. Its purely declarative nature makes its behavior predictable based on the keyframe definition.
- **Coding Standards:** Relies on standard, widely supported CSS features (`@keyframes`, `animation`, `steps()`, `opacity`).
- **Documentation Approach:** The animation sequence and timing can be documented directly within the CSS using comments, explaining the purpose of different keyframe percentages.

## Build Steps
1.  **Define HTML Structure:** Inside the Hero section component, create a container `div` for the animation. Within this container, add two `span` elements: one for the "$99.99" value (e.g., `usd-value`) and one for the "0.00234584 BTC" value (e.g., `btc-value`). Add a third element (e.g., a `span` with the text '|') to serve as the typing cursor (e.g., `cursor`).
2.  **Apply Base Styles (Tailwind/CSS):** Style the container and value spans. Set the container to `position: relative`. Position the value spans and cursor absolutely within the container or use flexbox/grid depending on desired layout, ensuring they overlap or are positioned correctly. Initially hide the `btc-value` and `cursor` elements or set their opacity to 0. Style the `usd-value` span such that its text content is visible but its container's width can be controlled (e.g., using `overflow: hidden` and `white-space: nowrap`).
3.  **Define `@keyframes`:** Create a `@keyframes` rule (e.g., `price-conversion-animation`). This rule will orchestrate the entire sequence over a defined duration (e.g., 10-15 seconds per loop). The keyframes will control the `width` or `clip-path` of `usd-value`, the `opacity` of `usd-value` and `btc-value`, and the `position` and `opacity` of the `cursor`.
4.  **Implement Typing Effect:** Within the keyframes, during the initial phase (e.g., 0% to 30% of the animation duration), animate the `width` (or `clip-path: inset(0 <right> 0 0)`) of the `usd-value` span from `0` to `100%` of its content width. Use the `steps(<number_of_characters>, end)` timing function to reveal the text character by character. Simultaneously, animate the `left` or `transform` position of the `cursor` element to follow the expanding width of `usd-value`.
5.  **Implement Cursor Blinking:** After the typing is complete (e.g., 30% to 40%), keep the `usd-value` width at 100%. Animate the `opacity` of the `cursor` element between 0 and 1 multiple times to simulate blinking using intermediate keyframe percentages (e.g., 30%, 32%, 34%, 36%, 38%, 40%).
6.  **Implement Conversion Transition:** In the next phase (e.g., 40% to 50%), animate the `opacity` of `usd-value` from 1 to 0 and the `opacity` of `btc-value` from 0 to 1. Hide or move the `cursor` element.
7.  **Implement Display and Reset:** Keep `btc-value` visible for a duration (e.g., 50% to 90%). Then, fade out `btc-value` (e.g., 90% to 100%) and reset the state (hide both value spans, reset `usd-value` width to 0) at 100% to seamlessly loop.
8.  **Apply Animation:** Apply the `@keyframes` animation to the container element using the `animation` shorthand property, specifying the animation name, total duration, `infinite` iteration count, and `linear` or appropriate easing functions for different phases (though `steps` handles timing for typing).
9.  **Add Accessibility:** Include a `@media (prefers-reduced-motion: reduce)` query to disable or significantly simplify the animation for users who have this preference set in their OS.

```
## Chosen Approach
Implement the price conversion animation using CSS `@keyframes`, animating element visibility, opacity, and width with the `steps()` timing function for the typing effect.

## Rationale
- Simplicity: This approach is the simplest CSS-only method to achieve both the typing effect (`steps()`) and the transition between values (`@keyframes` controlling opacity/visibility). It avoids complex JavaScript logic or non-standard CSS hacks.
- Modularity + Strict Separation: The animation logic is entirely contained within CSS, adhering to the principle of separating presentation from behavior. It can be scoped to the Hero section component's styles.
- Testability: While not unit-testable, the visual animation is the required outcome and is verified by observation in the browser as per the ticket requirements. Its purely declarative nature makes its behavior predictable based on the keyframe definition.
- Coding Standards: Relies on standard, widely supported CSS features (`@keyframes`, `animation`, `steps()`, `opacity`).
- Documentation Approach: The animation sequence and timing can be documented directly within the CSS using comments, explaining the purpose of different keyframe percentages.

## Build Steps
1.  **Define HTML Structure:** Inside the Hero section component, create a container `div` for the animation. Within this container, add two `span` elements: one for the "$99.99" value (e.g., `usd-value`) and one for the "0.00234584 BTC" value (e.g., `btc-value`). Add a third element (e.g., a `span` with the text '|') to serve as the typing cursor (e.g., `cursor`).
2.  **Apply Base Styles (Tailwind/CSS):** Style the container and value spans. Set the container to `position: relative`. Position the value spans and cursor absolutely within the container or use flexbox/grid depending on desired layout, ensuring they overlap or are positioned correctly. Initially hide the `btc-value` and `cursor` elements or set their opacity to 0. Style the `usd-value` span such that its text content is visible but its container's width can be controlled (e.g., using `overflow: hidden` and `white-space: nowrap`).
3.  **Define `@keyframes`:** Create a `@keyframes` rule (e.g., `price-conversion-animation`). This rule will orchestrate the entire sequence over a defined duration (e.g., 10-15 seconds per loop). The keyframes will control the `width` or `clip-path` of `usd-value`, the `opacity` of `usd-value` and `btc-value`, and the `position` and `opacity` of the `cursor`.
4.  **Implement Typing Effect:** Within the keyframes, during the initial phase (e.g., 0% to 30% of the animation duration), animate the `width` (or `clip-path: inset(0 <right> 0 0)`) of the `usd-value` span from `0` to `100%` of its content width. Use the `steps(<number_of_characters>, end)` timing function to reveal the text character by character. Simultaneously, animate the `left` or `transform` position of the `cursor` element to follow the expanding width of `usd-value`.
5.  **Implement Cursor Blinking:** After the typing is complete (e.g., 30% to 40%), keep the `usd-value` width at 100%. Animate the `opacity` of the `cursor` element between 0 and 1 multiple times to simulate blinking using intermediate keyframe percentages (e.g., 30%, 32%, 34%, 36%, 38%, 40%).
6.  **Implement Conversion Transition:** In the next phase (e.g., 40% to 50%), animate the `opacity` of `usd-value` from 1 to 0 and the `opacity` of `btc-value` from 0 to 1. Hide or move the `cursor` element.
7.  **Implement Display and Reset:** Keep `btc-value` visible for a duration (e.g., 50% to 90%). Then, fade out `btc-value` (e.g., 90% to 100%) and reset the state (hide both value spans, reset `usd-value` width to 0) at 100% to seamlessly loop.
8.  **Apply Animation:** Apply the `@keyframes` animation to the container element using the `animation` shorthand property, specifying the animation name, total duration, `infinite` iteration count, and `linear` or appropriate easing functions for different phases (though `steps` handles timing for typing).
9.  **Add Accessibility:** Include a `@media (prefers-reduced-motion: reduce)` query to disable or significantly simplify the animation for users who have this preference set in their OS.
```