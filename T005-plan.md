# T005 Plan: Test useIntersectionObserver triggerOnce: false option

## Objective

Write unit tests to verify that when `triggerOnce: false` is set, the `isIntersecting` state updates correctly on multiple intersections without unobserving the element.

## Implementation Plan

1. **Add a test case** to the existing test file that:

   - Renders the hook with `triggerOnce: false` option
   - Sets up a ref element
   - Simulates multiple intersection events (entering and leaving viewport)
   - Verifies that `isIntersecting` updates correctly for each event
   - Confirms that `unobserve` is NOT called after intersections

2. **Test specific behaviors**:

   - Verify that the hook continues to respond to intersection changes
   - Test that `isIntersecting` can toggle between true and false on multiple intersections
   - Ensure that the observer remains active and connected throughout

3. **Implementation details**:
   - Use the existing mock infrastructure
   - Create multiple mock entries with different `isIntersecting` values
   - Simulate the intersection events in sequence
   - Assert state changes after each event

## Testing Approach

Build on the existing test infrastructure and verify that when `triggerOnce: false`:

1. The observer continues to listen for intersection changes
2. `unobserve` is never called during intersection events
3. `isIntersecting` state updates correctly for each intersection event

## Expected Result

A passing test that verifies the `useIntersectionObserver` hook correctly handles multiple intersections when `triggerOnce: false` is specified.
