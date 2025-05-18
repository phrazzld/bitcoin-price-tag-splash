## Chosen Approach
Implement the "type-and-convert" animation using two overlapping `<span>` elements within a container. Each `<span>` (one for USD, one for BTC) will have its own CSS `@keyframes` animation to simulate typing its respective value by animating `width` with `steps()`, holding the value, then "deleting" it (animating `width` back to `0ch`). Opacity changes within these keyframes will ensure only one value is actively being typed/displayed at a time, creating a seamless loop. A blinking cursor effect will be achieved by animating the `border-right-color` of the active `<span>`.

## Rationale
-   **Simplicity:** This CSS-only solution uses a minimal number of HTML elements and straightforward `@keyframes` animations. The logic for typing, deleting, and switching between values is contained within CSS, avoiding JavaScript complexity.
-   **Modularity + Strict Separation:** The animation styles are self-contained and can be scoped to the hero section component. The HTML structure is simple, maintaining a clear separation of concerns (structure in HTML, presentation in CSS).
-   **Testability (minimal mocking):** The animation is deterministic and can be verified visually in the browser, which aligns with the ticket's verification step. No complex mocking is required.
-   **Coding Standards:** The approach utilizes standard and widely supported CSS properties (`@keyframes`, `animation`, `width`, `opacity`, `steps()`, pseudo-elements) ensuring broad browser compatibility and adherence to web standards.
-   **Performance:** While `width` animation can trigger layout changes, for a small, isolated element like this, the impact is generally negligible. The use of `opacity` for transitions is performant. The `steps()` timing function is efficient for typing effects.

## Build Steps

1.  **HTML Structure (in `HeroSection.tsx` or similar):**
    Create a container `div` for the animation. Inside, add two `<span>` elements, one for the USD value and one for the BTC value. They will be styled to overlap.

    ```html
    <div class="conversion-animation-container">
      <span class="price-value usd-price" data-text="$99.99">$99.99</span>
      <span class="price-value btc-price" data-text="0.00234584 BTC">0.00234584 BTC</span>
    </div>
    ```
    *(Note: The text content inside the spans is for fallback if CSS animations don't load. The `data-text` is illustrative if we were to use JS, but for pure CSS typing, the actual text length is what matters for `ch` units and `steps()`)*

2.  **Base CSS Styling (e.g., in `globals.css` or component-specific CSS):**
    Style the container and the price spans. Use `position: relative` on the container and `position: absolute` on the spans to make them overlap. Define a monospace font for consistent character widths.

    ```css
    .conversion-animation-container {
      position: relative;
      display: inline-block; /* Or block, depending on layout */
      font-family: 'Inter Variable', 'monospace', sans-serif; /* Monospace is key for ch units */
      font-size: 2rem; /* Example size */
      font-weight: 700;
      color: #F7931A; /* Example Bitcoin orange */
      height: 1.5em; /* To prevent layout shifts if font size changes line height */
      line-height: 1.5em;
    }

    .price-value {
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      overflow: hidden;
      border-right: 0.12em solid transparent; /* Cursor, initially transparent */
      width: 0ch; /* Start with no width */
      opacity: 0; /* Start hidden */
      box-sizing: border-box;
    }
    ```

3.  **Define Keyframe Animation for USD Value (`animate-usd`):**
    This animation will handle typing "$99.99" (7 characters), holding it, deleting it, and managing its opacity. The total animation cycle duration will be, for example, 8 seconds.

    *   USD Typing: 1.5s (7 chars * ~0.2s/char)
    *   USD Hold: 1.5s
    *   USD Deleting: 1.0s (7 chars * ~0.15s/char)
    *   USD Hidden (while BTC active): 4s (remaining time in 8s cycle)

    ```css
    @keyframes animate-usd {
      /* Timing: 8s total cycle. USD active for first 4s. */
      /* Phase 1: Type USD (0s - 1.5s) */
      0% { width: 0ch; opacity: 1; border-right-color: currentColor; /* Cursor visible */ }
      18.75% { width: 7ch; opacity: 1; border-right-color: currentColor; /* "$99.99" (7 chars) typed */ } /* 1.5s / 8s */

      /* Phase 2: Hold USD (1.5s - 3.0s) */
      /* Cursor blinking will be handled by a separate animation or within these steps */
      18.76% { border-right-color: currentColor; } /* Ensure cursor stays */
      37.5% { width: 7ch; opacity: 1; border-right-color: currentColor; } /* 3.0s / 8s */

      /* Phase 3: Delete USD (3.0s - 4.0s) */
      37.51% { border-right-color: currentColor; } /* Ensure cursor stays for delete */
      50% { width: 0ch; opacity: 1; border-right-color: currentColor; /* Deleted */ } /* 4.0s / 8s */

      /* Phase 4: Hide USD (4.0s - 8.0s, while BTC is active) */
      50.01% { opacity: 0; border-right-color: transparent; /* Hide completely */ }
      100% { width: 0ch; opacity: 0; border-right-color: transparent; }
    }
    ```

4.  **Define Keyframe Animation for BTC Value (`animate-btc`):**
    This animation will handle typing "0.00234584 BTC" (13 characters), holding, deleting, and managing opacity. It will be active in the second half of the 8-second cycle.

    *   BTC Hidden (while USD active): 4s
    *   BTC Typing: 2.0s (13 chars * ~0.15s/char)
    *   BTC Hold: 1.5s
    *   BTC Deleting: 0.5s (13 chars * ~0.04s/char, faster delete)

    ```css
    @keyframes animate-btc {
      /* Timing: 8s total cycle. BTC active for last 4s. */
      /* Phase 1: Hide BTC (0s - 4.0s, while USD is active) */
      0% { width: 0ch; opacity: 0; border-right-color: transparent; }
      49.99% { width: 0ch; opacity: 0; border-right-color: transparent; }

      /* Phase 2: Type BTC (4.0s - 6.0s) */
      50% { width: 0ch; opacity: 1; border-right-color: currentColor; /* Start typing BTC */ }
      75% { width: 13ch; opacity: 1; border-right-color: currentColor; /* "0.00234584 BTC" (13 chars) typed */ } /* (4s+2s)/8s */

      /* Phase 3: Hold BTC (6.0s - 7.5s) */
      75.01% { border-right-color: currentColor; }
      93.75% { width: 13ch; opacity: 1; border-right-color: currentColor; } /* (4s+2s+1.5s)/8s */

      /* Phase 4: Delete BTC (7.5s - 8.0s) */
      93.76% { border-right-color: currentColor; }
      100% { width: 0ch; opacity: 1; border-right-color: currentColor; /* Deleted, ready to loop and hide */ }
      /* Note: At 100%, it loops, and 0% state (opacity 0) takes over. */
    }
    ```

5.  **Define Keyframe Animation for Cursor Blinking (`blink-caret`):**
    A simple animation to make the cursor blink.

    ```css
    @keyframes blink-caret {
      from, to { border-right-color: transparent; }
      50% { border-right-color: currentColor; } /* Or your chosen cursor color */
    }
    ```
    *Self-correction: The cursor visibility is now managed within the main `animate-usd` and `animate-btc` keyframes by toggling `border-right-color`. A separate blink animation can be overlaid if a more distinct blink *during* hold phases is desired. For simplicity, the current approach makes the cursor solid during typing/deleting/hold and transparent when the element is hidden. For an actual blink during hold:*
    
    Revised approach for cursor: The main animations will set `border-right-color: currentColor` when text should be visible and cursor active, and `transparent` otherwise. A separate `blink-caret` animation can be applied but might conflict if not carefully managed. The prompt implies "smooth type-and-convert," so a solid cursor during typing/deleting is acceptable. Let's stick to managing cursor via `border-right-color` in the main animations for simplicity. If a true blink is needed during the hold phases, the main keyframes would need more steps to toggle `border-right-color` or a more complex setup. The current `border-right-color: currentColor` during active phases will provide a static cursor.
    
    To achieve blinking during hold:
    Modify hold phases in `animate-usd` and `animate-btc`, e.g., for USD hold (18.75% to 37.5%):
    ```css
      /* Example for USD hold with blink */
      18.75% { width: 7ch; opacity: 1; border-right-color: currentColor; }
      21.875% { width: 7ch; opacity: 1; border-right-color: transparent; } /* Blink off */
      25%    { width: 7ch; opacity: 1; border-right-color: currentColor; } /* Blink on */
      28.125% { width: 7ch; opacity: 1; border-right-color: transparent; } /* Blink off */
      31.25% { width: 7ch; opacity: 1; border-right-color: currentColor; } /* Blink on */
      34.375% { width: 7ch; opacity: 1; border-right-color: transparent; } /* Blink off */
      37.5%  { width: 7ch; opacity: 1; border-right-color: currentColor; } /* End hold with cursor on */
    ```
    This makes keyframes verbose. A simpler way is a constant cursor during typing/deleting, and if blinking is desired *only* during the hold, a separate short animation could be triggered or the main keyframes adjusted. For now, let's assume a solid cursor while active is sufficient for "smooth type-and-convert". The `border-right-color: currentColor` when active and `transparent` when inactive will suffice.

6.  **Apply Animations to Spans:**
    Apply the defined animations to their respective `<span>` elements. Use `steps()` for the typing/deleting phases.

    ```css
    .price-value.usd-price {
      /* $99.99 -> 7 characters */
      animation: animate-usd 8s infinite;
      /* The steps() function should ideally be part of the animation shorthand, 
         but CSS doesn't allow per-keyframe timing functions directly.
         The width changes in keyframes combined with overall linear timing achieve the steps.
         To be precise with steps for typing/deleting, each segment (type, delete) would need
         its own animation or a very complex single keyframe.
         A simpler way for "typing" is to have `animation-timing-function: steps(X, end)`
         and only animate width from 0 to N.
         
         Let's refine: use `animation-timing-function: linear` for the overall sequence,
         and the `width` changes in keyframes will create the effect. `steps()` is
         more for a continuous typing animation of a single string.
         The prompt asks for a "type-and-convert" effect. The discrete width changes
         at keyframes will simulate this.
      */
    }

    .price-value.btc-price {
      /* 0.00234584 BTC -> 13 characters */
      animation: animate-btc 8s infinite;
    }
    ```

7.  **Accessibility (`prefers-reduced-motion`):**
    Provide an alternative for users who prefer reduced motion.

    ```css
    @media (prefers-reduced-motion: reduce) {
      .price-value.usd-price,
      .price-value.btc-price {
        animation: none !important; /* Important to override */
        opacity: 0; /* Hide animated versions */
        width: auto; /* Allow static content to show if needed */
        border-right: none;
      }
      /* Optionally, display a static version or simplified transition */
      .price-value.usd-price { /* Show USD by default if animations off */
        opacity: 1;
        width: auto; /* Or specific content */
      }
       .conversion-animation-container::after { /* Static example */
        