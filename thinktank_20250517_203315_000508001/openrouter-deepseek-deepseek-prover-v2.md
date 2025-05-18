## Chosen Approach

**Implement a CSS-based hero conversion demo animation using `@keyframes` and `::before` pseudo-elements to simulate typing and conversion effects.**

## Rationale

- **Simplicity:** Uses pure CSS with no JavaScript, aligning with the requirement of simplicity and maintainability.
- **Modularity:** The animation is self-contained within CSS, making it easy to integrate into any component or project.
- **Testability:** Easily verifiable by visual inspection and browser tools, with no complex logic to test.
- **Performance:** CSS animations are hardware-accelerated, ensuring smooth performance.
- **Compatibility:** Uses widely supported CSS features (`@keyframes`, `::before`), ensuring broad browser compatibility.

## Build Steps

1. **Add static text elements for the demo:**
   - Add the text `$99.99` and `0.00234584 BTC` to the hero section in the React component.

2. **Implement CSS animation:**
   - Use `@keyframes` to define a typing effect for `$99.99` and a conversion effect to `0.00234584 BTC`.
   - Use `::before` pseudo-elements with `content` property to simulate typing and conversion.
   - Set `overflow: hidden` and adjust `width` or `max-width` to control the visible portion of the text.
   - Use `steps()` in the animation timing function to create a typewriter effect.

3. **Ensure smooth transitions:**
   - Use `opacity` and `transform` properties to create smooth transitions between the two values.
   - Adjust timing and easing functions (`ease-in-out`) to ensure a natural feel.

4. **Make it loop continuously:**
   - Set `animation-iteration-count: infinite` to make the animation loop indefinitely.

5. **Handle browser compatibility:**
   - Use vendor prefixes (`-webkit-`, `-moz-`) if necessary for older browsers.

6. **Optimize performance:**
   - Use `will-change` to hint the browser about the animated properties (`transform`, `opacity`).
   - Ensure the animation does not cause layout thrashing by animating `opacity` and `transform` only.