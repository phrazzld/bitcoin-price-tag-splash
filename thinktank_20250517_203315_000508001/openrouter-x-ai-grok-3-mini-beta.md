## Chosen Approach
Use a single @keyframes animation to sequence a typing effect for "$99.99" followed by a smooth transition to "0.00234584 BTC", looping infinitely for simplicity and performance.

## Rationale
- **Simplicity:** This option is the most straightforward, using one keyframe rule for the entire sequence, minimizing complexity and adhering to the philosophy's priority on avoiding unnecessary parts.
- **Modularity + strict separation:** It keeps concerns isolated within CSS by defining all logic in keyframes, but lacks deep reusability, trading off slightly against modularity for overall ease of maintenance.
- **Testability (minimal mocking):** The self-contained animation can be verified in-browser without mocks, aligning with minimal mocking by relying on native CSS behaviors.
- **Coding standards:** It follows standards by avoiding over-engineering (e.g., no JavaScript or multiple rules), using only essential CSS for a performant, precise implementation.
- **Documentation approach:** The approach is documented concisely in code comments and this analysis, prioritizing rationale over mechanics, as per the philosophy's emphasis on explaining "why" for future changes.

## Build Steps
1. In `HeroSection.tsx`, add HTML elements: a container `<div class="demo-container">` with child `<span class="typing-text">$99.99</span>` and `<span class="converted-text">0.00234584 BTC</span>`, styled initially to overlap or hide the second.
2. Define CSS keyframes in a global or component stylesheet: `@keyframes typeAndConvert { 0% { width: 0; } 50% { width: fit-content; } 60% { opacity: 0; } 100% { content: "0.00234584 BTC"; opacity: 1; } }`, using steps for typing simulation and transitions for conversion.
3. Apply the animation: `.typing-text { animation: typeAndConvert 4s steps(7) infinite; }`, adjusting timing and easing (e.g., `ease-in-out`) for smoothness, and ensure the second span is targeted in the keyframe for sequential reveal.
4. Optimize for performance: Use `will-change: transform, opacity;` on the elements and test on key browsers (Chrome, Firefox, Safari) to confirm 60fps, leveraging CSS's hardware acceleration.
5. Verify looping: Set `animation-iteration-count: infinite;` and test the full sequence in the Hero section to ensure it plays correctly without JavaScript dependency.
6. Add documentation: Include inline comments in CSS explaining keyframe timing and rationale, and update PLAN.md with a reference to this implementation for context.