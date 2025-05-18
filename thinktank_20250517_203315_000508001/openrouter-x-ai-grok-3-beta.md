## Chosen Approach
Implement a CSS-based hero conversion demo animation using keyframes for a typing effect with pseudo-elements and transitions for smooth value conversion, ensuring a continuous loop and performance optimization.

## Rationale
- **Simplicity**: This approach uses pure CSS with minimal markup, avoiding unnecessary complexity and aligning with the "Simplicity First" principle by focusing on straightforward keyframe animations and transitions.
- **Modularity**: The solution encapsulates the animation within specific CSS classes, maintaining strict separation from other components and adhering to the "Strict Separation of Concerns" guideline.
- **Testability**: The CSS animation can be visually tested in isolation within the HeroSection component, supporting the "Design for Testability" principle without requiring complex mocking.
- **Coding Standards**: Adheres to project-specific CSS practices within Tailwind and custom styles, ensuring consistency with the defined standards in the Development Philosophy.
- **Documentation Approach**: The implementation includes comments explaining the animation logic, aligning with the "Document Decisions, Not Mechanics" principle by focusing on the rationale behind timing and effects.

## Build Steps
1. **Add Static Text Elements**: In `HeroSection.tsx`, insert a container `<div>` with two `<span>` elements for "$99.99" and "0.00234584 BTC" within the hero content area, styled with Tailwind for center alignment and appropriate typography (e.g., `text-2xl font-mono`).
2. **Define Typing Animation with Keyframes**: In a custom CSS file (e.g., `globals.css` or a dedicated `hero-animation.css`), create `@keyframes type` to simulate typing by adjusting the `width` of a pseudo-element (`::before`) from 0 to the full width of the text, using `ch` units for character-based stepping to mimic typing.
3. **Implement Typing Effect**: Apply the typing animation to the USD value `<span>` using CSS class (e.g., `.typing-usd`), with properties like `animation: type 1.5s steps(6) forwards` for "$99.99", ensuring a realistic typing speed and step count matching character length.
4. **Add Conversion Transition**: Style the BTC value `<span>` with an initial `opacity: 0` and use a CSS transition (e.g., `transition: opacity 0.5s ease-in-out`) triggered by a delayed keyframe or pseudo-class to fade in after the USD typing completes, simulating conversion.
5. **Create Continuous Loop**: Combine both animations into a single timeline using a wrapper class (e.g., `.conversion-loop`) with `animation: loop 5s infinite`, defining keyframes to sequence typing, a brief pause, conversion fade-in/out, and reset, ensuring a seamless cycle.
6. **Optimize Performance**: Use `will-change: opacity, width` on animated elements to hint at GPU acceleration, limit animations to opacity and width transforms for better rendering, and test across breakpoints to ensure responsiveness per the "Performance Optimization" guidelines.
7. **Ensure Browser Compatibility**: Include vendor prefixes for animations and transitions via Autoprefixer in the build process, and test in major browsers (Chrome, Firefox, Safari) to confirm consistent behavior as per accessibility and deployment standards.
8. **Verify Animation**: Run the site locally, observe the Hero section animation in the browser for smoothness and timing (typing ~1.5s, conversion ~0.5s, loop ~5s), and adjust durations or easing (e.g., `ease-in-out`) if needed to match the "type-and-convert" effect described in the ticket.