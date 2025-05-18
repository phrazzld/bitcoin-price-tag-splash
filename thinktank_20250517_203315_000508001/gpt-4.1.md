```
## Chosen Approach
Use a single text container with CSS keyframes animating a "typing" and "deleting" effect by incrementally revealing/hiding characters of the USD and BTC values via the `ch` unit and animating `width` (with `overflow: hidden` and `white-space: nowrap`), alternating between the two values in a continuous loop.

## Rationale
- Simplicity: Pure CSS using a single element and a single `@keyframes` animation; no JS, pseudo-elements, or excessive markup.
- Modularity: Encapsulated in a reusable CSS class/component; easily dropped into the Hero section.
- Testability: Visual QA is trivial—animation is deterministic, and only markup/CSS are involved.
- Coding Standards: No hacks or browser-quirky selectors; fully standards-compliant and performant.
- Documentation: Approach is self-evident from the markup and class names; easy to document/extend.

## Build Steps
1. In the Hero section, add a single `<span>` element for the conversion demo, e.g.:
   ```jsx
   <span className="conversion-demo" aria-live="polite"></span>
   ```
2. In `globals.css` (or a dedicated CSS module), define the following:
   ```css
   .conversion-demo {
     display: inline-block;
     font-family: 'Inter Variable', monospace, sans-serif;
     font-weight: 700;
     font-size: 2rem;
     letter-spacing: 0.02em;
     color: #F7931A; /* Bitcoin orange */
     white-space: nowrap;
     overflow: hidden;
     border-right: 0.12em solid #F7931A; /* Simulated caret */
     width: 0ch;
     animation: type-convert 6s steps(10) infinite;
     /* steps(10): max char count between values */
   }
   @keyframes type-convert {
     /* $99.99 (7 chars), 0.00234584 BTC (13 chars) */
     0% { width: 0ch; content: "$99.99"; }
     10% { width: 7ch; }
     35% { width: 7ch; }
     40% { width: 0ch; }
     50% { width: 0ch; }
     60% { width: 13ch; }
     85% { width: 13ch; }
     90% { width: 0ch; }
     100% { width: 0ch; }
   }
   .conversion-demo::before {
     content: "$99.99";
     position: absolute;
     /* Will be swapped out via animation when possible
        (see note below) */
   }
   .conversion-demo[data-btc]::before {
     content: "0.00234584 BTC";
   }
   ```
   *Note: For pure CSS and static values, you can duplicate two stacked spans, one with `$99.99`, one with `0.00234584 BTC`, and toggle their opacity/presence at key times in the keyframes if needed. For a single element, pick the longer string as the content and animate width to mimic typing/deleting both. For more realism, you can use two overlapping spans with different animation delays.*
3. Adjust animation timing for a natural typing rhythm: use `steps(n)` for typing, and longer holds at full values, short pauses at zero width (for "delete").
4. (Optional) Make the caret blink by animating `border-right-color` or adding a secondary animation.
5. Test in Chrome, Safari, and Firefox for smoothness and compatibility (all major browsers support this technique).
6. Document the class/purpose in the relevant Storybook story and code comments.
```