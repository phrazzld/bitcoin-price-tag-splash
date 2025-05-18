## Chosen Approach
Overlay two monospace `<span>`s and drive their reveal/hide in sequence via a single CSS keyframes animation using `steps()` for typing, pausing, deleting, and typing the converted value in an infinite loop.

## Rationale
- Simplicity: only two spans and one composite animation—no JavaScript required.  
- Modularity: CSS lives in its own file; animation timings and keyframes are self-contained.  
- Testability: visual behavior can be observed and tweaked via timing values.  
- Performance: leverages hardware‐accelerated CSS; minimal layout thrashing.  
- Accessibility & Compatibility: plain text content, respects `prefers-reduced-motion`, works across modern browsers.

## Build Steps
1. In `HeroSection.tsx`, add inside the demo container:
   ```jsx
   <div className="conversion-demo">
     <span className="typewriter usd">$99.99</span>
     <span className="typewriter btc">0.00234584 BTC</span>
   </div>
   ```
2. In global CSS (e.g., `globals.css`), define:
   ```css
   .conversion-demo { position: relative; display: inline-block; }
   .typewriter {
     position: absolute;
     top: 0; left: 0;
     overflow: hidden;
     white-space: nowrap;
     font-family: monospace;
     border-right: 2px solid currentColor;
   }
   .typewriter.usd { animation: sequence-usd 5s steps(7) infinite; }
   .typewriter.btc { animation: sequence-btc 5s steps(10) infinite; }
   ```
3. Define keyframes:
   ```css
   @keyframes sequence-usd {
     0%, 20%   { width: 0ch; }
     20%, 40%  { width: 7ch; }   /* fully typed */
     40%, 50%  { width: 0ch; }   /* delete */
     50%,100%  { width: 0ch; }   /* hidden until next loop */
   }
   @keyframes sequence-btc {
     0%, 50%   { width: 0ch; }
     50%, 70%  { width: 0ch; }   /* delay until USD deletion */
     70%, 90%  { width: 11ch; }  /* type BTC */
     90%,100%  { width: 0ch; }   /* delete BTC */
   }
   ```
4. Add a reduced-motion override:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .typewriter { animation: none; width: auto; border: none; }
   }
   ```
5. Verify in browser: ensure typing, pausing, deletion, and looping appear smooth and match the “type-and-convert” effect.