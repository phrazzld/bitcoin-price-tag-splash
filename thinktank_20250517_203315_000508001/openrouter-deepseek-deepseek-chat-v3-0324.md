```
## Chosen Approach
CSS keyframe animation with chained steps for typing and conversion effects, using `::after` pseudo-elements for character-by-character simulation.

## Rationale
- **Simplicity**: Achieves typing effect with pure CSS (no JS) using well-supported properties
- **Performance**: Hardware-accelerated with `transform` and `opacity` for smooth transitions
- **Modularity**: Encapsulated in a single component with scoped animations
- **Precision**: Matches Swiss Minimalism design with mathematical timing (8ms/character)
- **Compatibility**: Works across modern browsers with graceful fallback to static values

## Build Steps
1. **Add HeroSection markup**:
   ```tsx
   // HeroSection.tsx
   <div className="conversion-demo">
     <span className="price-usd">$99.99</span>
     <span className="price-btc">0.00234584 BTC</span>
   </div>
   ```

2. **Implement core animation**:
   ```css
   /* globals.css */
   .conversion-demo {
     position: relative;
     height: 1.5em;
   }
   
   .price-usd, .price-btc {
     position: absolute;
     opacity: 0;
     animation-timing-function: steps(1);
   }
   
   .price-usd::after {
     content: '';
     animation: type-usd 2s forwards;
   }
   
   @keyframes type-usd {
     0% { content: '$'; }
     8% { content: '$9'; }
     16% { content: '$99'; }
     24% { content: '$99.'; }
     32% { content: '$99.9'; }
     40% { content: '$99.99'; }
     60% { opacity: 1; }
     80% { opacity: 0; }
     100% { opacity: 0; }
   }
   
   .price-btc {
     animation: show-btc 2s 2s forwards;
   }
   
   @keyframes show-btc {
     0% { opacity: 0; }
     20% { opacity: 1; }
     100% { opacity: 1; }
   }
   ```

3. **Add looping behavior**:
   ```css
   .conversion-demo {
     animation-iteration-count: infinite;
     animation-duration: 4s;
   }
   ```

4. **Optimize for Swiss grid**:
   ```css
   .conversion-demo {
     font-family: 'Inter Variable', sans-serif;
     font-size: 1.5rem;
     letter-spacing: -0.02em;
     margin: 1.5rem 0;
   }
   ```
```