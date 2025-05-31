import { useState, useEffect, useRef, MutableRefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Whether to trigger the intersection only once.
   * If true, the observer will unobserve the element after the first intersection.
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Whether to respect prefers-reduced-motion.
   * If true, will immediately trigger a positive intersection for users
   * who have prefers-reduced-motion enabled.
   * @default true
   */
  respectReducedMotion?: boolean;
}

type IntersectionObserverHookResult<T extends Element = Element> = [
  MutableRefObject<T | null>,
  boolean,
  IntersectionObserverEntry | null,
];

/**
 * React hook that tracks when an element intersects with the viewport.
 *
 * @param options.root - The element that is used as the viewport for checking visibility
 * @param options.rootMargin - Margin around the root element
 * @param options.threshold - Percentage of the target's visibility the observer's callback should be executed
 * @param options.triggerOnce - Whether to trigger only once (defaults to true)
 * @param options.respectReducedMotion - Whether to respect prefers-reduced-motion preference (defaults to true)
 * @returns [ref, isIntersecting, entry] - A ref to attach to the element, a boolean indicating if the element is intersecting, and the full IntersectionObserverEntry
 */
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
    // If user prefers reduced motion, immediately set as intersecting
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      return;
    }

    // Save the current element reference
    const currentElement = elementRef.current;

    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer only if element exists
    if (currentElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isElementIntersecting = entry.isIntersecting;
          setIsIntersecting(isElementIntersecting);
          setEntry(entry);

          // If it's intersecting and we only want to trigger once, unobserve
          if (isElementIntersecting && triggerOnce) {
            observer.unobserve(currentElement);
          }
        },
        { root, rootMargin, threshold }
      );

      observerRef.current = observer;
      observer.observe(currentElement);

      // Clean up the observer on component unmount
      return () => {
        observer.unobserve(currentElement);
        observer.disconnect();
      };
    }

    return undefined;
  }, [root, rootMargin, threshold, triggerOnce, prefersReducedMotion]);

  return [elementRef, isIntersecting, entry];
}

export default useIntersectionObserver;
