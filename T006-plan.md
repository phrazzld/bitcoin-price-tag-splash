# T006 Plan: Test useIntersectionObserver respectReducedMotion: true option

## Objective

Write unit tests to verify that when `respectReducedMotion: true` (default) and the user has `prefers-reduced-motion: reduce` set, the hook immediately sets `isIntersecting` to `true` without creating an IntersectionObserver.

## Implementation Plan

1. **Mock window.matchMedia**: Create a mock implementation of `window.matchMedia` that can return different values for the `prefers-reduced-motion` media query.

2. **Test the behavior**: Add a test case that:

   - Mocks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` to return `true`
   - Renders the hook with default options (where `respectReducedMotion: true`)
   - Verifies that `isIntersecting` is immediately `true`
   - Confirms that no IntersectionObserver is created (no calls to the constructor)

3. **Test the negative case**: Also test that when `respectReducedMotion: false`, the reduced motion preference is ignored and normal intersection observation occurs.

## Implementation Details

Looking at the hook code (lines 48-58):

```typescript
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
  // ... rest of normal intersection logic
}, [root, rootMargin, threshold, triggerOnce, prefersReducedMotion]);
```

## Testing Approach

- Mock `window.matchMedia` globally for specific tests
- Use the existing test infrastructure
- Verify both positive and negative cases
- Ensure the mock is properly cleaned up between tests

## Expected Result

A comprehensive test that verifies the accessibility feature works correctly when users have reduced motion preferences.
