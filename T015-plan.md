# T015: Implement CSS-based Hero Conversion Demo Animation

## Task Classification: Complex

## Implementation Plan

Based on the thinktank synthesis and analysis, I will implement a CSS-only "type-and-convert" animation using overlapping spans with keyframe animations.

## Chosen Approach

Create two overlapping `<span>` elements (one for USD, one for BTC) with CSS `@keyframes` animations that:
1. Animate `width` to simulate typing effect
2. Use `opacity` to transition between values
3. Include a visible cursor effect using `border-right`
4. Loop continuously with smooth transitions

## HTML Structure

Add to HeroSection.tsx:
```jsx
<div className="conversion-animation">
  <span className="price-value usd-price">$99.99</span>
  <span className="price-value btc-price">0.00234584 BTC</span>
</div>
```

## CSS Implementation

### 1. Base Styles
```css
.conversion-animation {
  position: relative;
  display: inline-block;
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 600;
  height: 2em;
  line-height: 2em;
  margin: 1rem 0;
}

.price-value {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid transparent;
  width: 0;
  opacity: 0;
}
```

### 2. USD Animation (8s cycle)
- Type: 0-1.5s (0ch to 7ch)
- Hold: 1.5-3s 
- Delete: 3-4s (7ch to 0ch)
- Hidden: 4-8s

```css
@keyframes animate-usd {
  0% { width: 0; opacity: 1; border-right-color: currentColor; }
  18.75% { width: 7ch; opacity: 1; border-right-color: currentColor; }
  37.5% { width: 7ch; opacity: 1; border-right-color: currentColor; }
  50% { width: 0; opacity: 1; border-right-color: currentColor; }
  50.01% { opacity: 0; border-right-color: transparent; }
  100% { width: 0; opacity: 0; border-right-color: transparent; }
}
```

### 3. BTC Animation (8s cycle)
- Hidden: 0-4s
- Type: 4-6s (0ch to 13ch)
- Hold: 6-7.5s
- Delete: 7.5-8s (13ch to 0ch)

```css
@keyframes animate-btc {
  0% { width: 0; opacity: 0; border-right-color: transparent; }
  49.99% { width: 0; opacity: 0; border-right-color: transparent; }
  50% { width: 0; opacity: 1; border-right-color: currentColor; }
  75% { width: 13ch; opacity: 1; border-right-color: currentColor; }
  93.75% { width: 13ch; opacity: 1; border-right-color: currentColor; }
  100% { width: 0; opacity: 1; border-right-color: currentColor; }
}
```

### 4. Apply Animations
```css
.usd-price {
  animation: animate-usd 8s infinite linear;
  color: #616161; /* Gray for USD */
}

.btc-price {
  animation: animate-btc 8s infinite linear;
  color: #F7931A; /* Bitcoin orange */
}
```

### 5. Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  .price-value {
    animation: none !important;
    opacity: 0;
    width: auto;
    border-right: none;
  }
  
  .usd-price {
    opacity: 1;
    position: static;
  }
}
```

## Implementation Steps

1. Add the animation HTML structure to HeroSection.tsx above the subheading
2. Create a new CSS module `HeroSection.module.css` for component-specific styles
3. Import and apply the CSS module in HeroSection.tsx
4. Test the animation across different browsers
5. Verify reduced motion media query works correctly
6. Fine-tune timing for smooth visual flow

## Testing Plan

1. Verify animation loops smoothly
2. Test on Chrome, Firefox, Safari, Edge
3. Check performance on mobile devices
4. Ensure accessibility with prefers-reduced-motion
5. Validate monospace font fallbacks

## Success Criteria

- Animation runs continuously without jarring transitions
- Typing effect looks natural
- Cursor remains visible during typing
- Smooth transition between USD and BTC values
- No performance issues or layout shifts
- Accessible alternative for reduced motion preference