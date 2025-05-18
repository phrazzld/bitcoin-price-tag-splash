## Chosen Approach
Implement a CSS-based animation for the hero section's "type-and-convert" effect using CSS keyframes and pseudo-elements.

## Rationale
- Utilizes CSS animations for performance and simplicity
- Creates a realistic typing effect using keyframes and `content` property
- Smoothly transitions between USD and BTC values
- Implements continuous looping using `animation-iteration-count: infinite`
- Ensures browser compatibility by avoiding complex CSS properties

## Build Steps
1. Create a container element for the demo text with a fixed width to prevent layout shift.
2. Use CSS `:after` pseudo-element to display the typing effect.
3. Define keyframe animations for the typing effect:
   - First animation types out "$99.99"
   - Second animation replaces "$99.99" with "0.00234584 BTC"
4. Chain the animations using `animation-delay` to create a sequence.
5. Apply `animation-iteration-count: infinite` to loop the animation.
6. Style the container and pseudo-element with appropriate fonts and colors from the design system.
7. Ensure proper responsiveness by adjusting font sizes using `clamp()`.

```css
.demo-container {
  width: 200px; /* Adjust based on design */
  font-family: 'Inter Variable', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  height: 1.2em; /* Match line-height */
  display: flex;
  align-items: center;
}

.demo-container::after {
  content: '';
  animation: type-usd 2s steps(5) forwards,
             convert 1s 2s forwards,
             type-btc 2s 3s forwards;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  width: 0;
  border-right: 2px solid; /* Cursor effect */
  animation-iteration-count: infinite;
}

@keyframes type-usd {
  from { width: 0; content: '' }
  to { width: 5ch; content: '$99.99' }
}

@keyframes convert {
  from { content: '$99.99' }
  to { content: '0.00234584 BTC' }
}

@keyframes type-btc {
  from { width: 0; content: '' }
  to { width: 12ch; content: '0.00234584 BTC' }
}
```

```typescript
// In HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex items-center justify-center" style={{ height: "calc(100vh - 64px)" }}>
      <div className="max-w-[800px] mx-auto text-center">
        {/* Other content */}
        <div className="demo-container mx-auto mt-8">$99.99</div>
        {/* Other content */}
      </div>
    </section>
  );
};

export default HeroSection;
```