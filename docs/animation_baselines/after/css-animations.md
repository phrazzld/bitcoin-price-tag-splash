# CSS-Only Animation Implementation

This document details the CSS-only animation implementation that replaces the previous Framer Motion animations.

## Animation Components

### 1. Page Fade-In (app/page.tsx)

**Original**:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="relative"
>
  {/* Content */}
</motion.div>
```

**Refactored**:

```tsx
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  setIsLoaded(true);
}, []);

return <div className={`relative ${isLoaded ? 'fade-in' : 'opacity-0'}`}>{/* Content */}</div>;
```

### 2. AnimatedBackground (components/ui/AnimatedBackground.tsx)

**Original**:

```tsx
<motion.div
  className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl"
  initial={{ x: -100, y: -100 }}
  animate={{
    x: [100, -100, 100],
    y: [-100, 200, -100],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

**Refactored**:

```tsx
<div
  className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl float-orb-one"
  style={{ transform: 'translate(-100px, -100px)' }}
/>
```

### 3. ScrollReveal (components/animation/ScrollReveal.tsx)

**Original**:

```tsx
const ref = useRef(null);
const isInView = useInView(ref, {
  once: true,
  amount: 0.15,
  margin: '0px 0px -100px 0px',
});
const prefersReducedMotion = useReducedMotion();

return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: yOffset, scale: 0.95 }}
    transition={{
      duration: prefersReducedMotion ? 0 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);
```

**Refactored**:

```tsx
const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
  threshold,
  triggerOnce,
  rootMargin: '0px 0px -100px 0px',
});

const combinedClassName = `
  ${className}
  ${isIntersecting ? 'scroll-reveal-final' : 'scroll-reveal-initial'}
  delay-${delay}
  duration-${duration}
`;

return (
  <div ref={ref} className={combinedClassName.trim()}>
    {children}
  </div>
);
```

## CSS Animation Utilities (globals.css)

### Animation Variables

```css
:root {
  /* Animation parameters */
  --animation-duration-short: 0.3s;
  --animation-duration-medium: 0.6s;
  --animation-duration-long: 1s;
  --animation-delay-none: 0s;
  --animation-delay-short: 0.1s;
  --animation-delay-medium: 0.3s;
  --animation-easing-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
  --animation-easing-entrance: cubic-bezier(0, 0, 0.2, 1);
  --animation-easing-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### Keyframes

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes floatOrbOne {
  0% {
    transform: translate(-100px, -100px);
  }
  50% {
    transform: translate(100px, 200px);
  }
  100% {
    transform: translate(-100px, -100px);
  }
}

@keyframes floatOrbTwo {
  0% {
    transform: translate(100px, 100px);
  }
  50% {
    transform: translate(-100px, -200px);
  }
  100% {
    transform: translate(100px, 100px);
  }
}
```

### Animation Classes

```css
.fade-in {
  animation-name: fadeIn;
  animation-duration: var(--animation-duration-short);
  animation-timing-function: var(--animation-easing-entrance);
  animation-fill-mode: forwards;
}

.float-orb-one {
  animation-name: floatOrbOne;
  animation-duration: 20s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.float-orb-two {
  animation-name: floatOrbTwo;
  animation-duration: 25s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
```

### ScrollReveal Transitions

```css
.scroll-reveal-initial {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.scroll-reveal-final {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition:
    opacity var(--animation-duration-medium) var(--animation-easing-entrance),
    transform var(--animation-duration-medium) var(--animation-easing-entrance);
}
```

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  ::before,
  ::after {
    animation-duration: 0.001s !important;
    animation-delay: 0s !important;
    transition-duration: 0.001s !important;
    scroll-behavior: auto !important;
  }
}
```

## Intersection Observer Hook

A custom hook (`useIntersectionObserver`) was created to replace Framer Motion's `useInView` hook. This hook:

1. Observes when an element enters the viewport
2. Respects user preferences for reduced motion
3. Provides control over threshold, root margins, and trigger behavior
4. Returns the element reference, intersection state, and entry information

```tsx
export function useIntersectionObserver<T extends Element = Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = true,
  respectReducedMotion = true,
}: UseIntersectionObserverOptions = {}): IntersectionObserverHookResult<T> {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check for prefers-reduced-motion
  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // If reduced motion is preferred, immediately set as intersecting
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);

        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Unobserve if triggerOnce is true
          if (triggerOnce && element && observer) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observer && element) {
        observer.unobserve(element);
        observer.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce, prefersReducedMotion]);

  return [elementRef, isIntersecting, entry];
}
```

## Testing Pages

Several test pages were created to verify the CSS-only animations:

1. `/test-animated-background` - Tests the floating orbs animation
2. `/test-page-fade-in` - Tests the page fade-in animation
3. `/test-scroll-reveal` - Tests the scroll-triggered reveal animations
4. `/test-css-animations` - Tests the basic CSS animation utilities
5. `/test-intersection-observer` - Tests the Intersection Observer hook
6. `/test-all-animations` - Comprehensive test of all animation types

These pages ensure that the CSS-only animations match the visual appearance and behavior of the original Framer Motion animations.
