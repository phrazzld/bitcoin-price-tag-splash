# T004 Plan: Test useIntersectionObserver triggerOnce: true option

## Objective

Write unit tests to verify that when the `triggerOnce: true` option is used (which is the default), the observer unobserves and disconnects after the first intersection.

## Implementation Plan

1. **Extend the existing test file** with a new test case that:

   - Renders the hook with default options (which includes `triggerOnce: true`)
   - Sets up a ref element
   - Simulates an intersection event
   - Verifies that `mockUnobserve` is called with the correct element
   - Checks that `isIntersecting` becomes `true`

2. **Test specific behaviors**:

   - Confirm that `unobserve` is called with the exact element that was observed
   - Verify that disconnection happens on first intersection
   - Test that the hook stays in the intersecting state after the intersection even when the observer has been removed

3. **Verify against hook implementation**:
   - Line 78-80 in `useIntersectionObserver.ts` shows the functionality we need to test:
   ```typescript
   // If it's intersecting and we only want to trigger once, unobserve
   if (isElementIntersecting && triggerOnce) {
     observer.unobserve(currentElement);
   }
   ```

## Testing Approach

We'll build on the existing test infrastructure, using the same mock implementation of IntersectionObserver. We'll need to:

1. Explicitly track whether `mockUnobserve` is called after intersection
2. Use Jest's mock function capabilities to verify the arguments passed to `unobserve`
3. Ensure that the hook maintains the correct state after unobserving

## Expected Result

A passing test that verifies the `useIntersectionObserver` hook correctly unobserves the element after the first intersection when using the default `triggerOnce: true` option.
