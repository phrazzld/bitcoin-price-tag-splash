# Task ID: T015

# Title: implement CSS-based hero conversion demo animation

# Original Ticket Text:
- [ ] **T015 · Feature · P1: implement CSS-based hero conversion demo animation**

  - **Context:** PLAN.md > Page Structure > 2. Hero Section (Live demo); Key Implementation Details > Hero Conversion Demo
  - **Action:**
    1. Add static text elements for the demo (e.g., "$99.99" and "0.00234584 BTC").
    2. Implement a CSS animation to create a "type-and-convert" effect between these values.
  - **Done‑when:**
    1. The price conversion animation plays correctly in the Hero section using only CSS.
  - **Verification:**
    1. Observe the animation sequence in the browser. Ensure it's smooth and matches the "type-and-convert" description.
  - **Depends‑on:** [T014]

# Implementation Approach Analysis Prompt:
You are tasked with implementing a CSS-based animation for a hero section that demonstrates a price conversion from USD to Bitcoin. The animation should show a "type-and-convert" effect between "$99.99" and "0.00234584 BTC".

Key requirements:
1. Use only CSS animations (no JavaScript)
2. Create a smooth typing effect that simulates someone typing the USD price
3. Transition to show the Bitcoin conversion
4. Make it continuously loop
5. Ensure it's performant and smooth

Consider:
- The best CSS animation approach (keyframes, transitions, etc.)
- How to create a realistic typing effect
- How to handle the transition between USD and BTC values
- Timing and easing functions for natural feel
- Browser compatibility considerations
- Performance implications of the chosen approach

Please provide a detailed implementation plan that addresses these considerations and outlines the specific CSS techniques you'll use.