## Chosen Approach
Implement CSS-based hero conversion demo animation using CSS keyframes and transitions.

## Rationale
- The approach prioritizes simplicity and maintainability by utilizing CSS-only solutions.
- It ensures high performance and smoothness by leveraging CSS animations and transitions.
- The solution is modular, testable, and follows coding standards.

## Build Steps
1. **Create Static Text Elements**: Add static text elements for the demo (e.g., "$99.99" and "0.00234584 BTC").
2. **Implement Typing Effect**: Implement a CSS typing effect using keyframes to simulate someone typing the USD price.
3. **Transition to Bitcoin Value**: Use CSS transitions to smoothly transition from the USD price to the Bitcoin conversion.
4. **Loop Animation**: Ensure the animation continuously loops.
5. **Optimize Performance**: Optimize the animation for performance and smoothness.

## Implementation
```css
/* HeroSection.css */
.hero-conversion-demo {
  position: relative;
  font-size: 2rem;
}

.usd-price {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  animation: type-usd 5s forwards;
}

.btc-price {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  animation: type-btc 5s 5s forwards;
}

@keyframes type-usd {
  0% {
    opacity: 1;
    content: "";
  }
  100% {
    opacity: 1;
    content: "$99.99";
  }
}

@keyframes type-btc {
  0% {
    opacity: 0;
    content: "";
  }
  100% {
    opacity: 1;
    content: "0.00234584 BTC";
  }
}
```

```typescript
// HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section>
      <div className="hero-conversion-demo">
        <span className="usd-price">$99.99</span>
        <span className="btc-price">0.00234584 BTC</span>
      </div>
    </section>
  );
};

export default HeroSection;
```