# T003 Plan: Test useIntersectionObserver Intersection Behavior

## Objective

Write unit tests to verify that `isIntersecting` becomes `true` when the mock observer triggers an intersection.

## Implementation Plan

1. **Create a test case** in the existing `use-intersection-observer.test.ts` file that:

   - Renders the hook with renderHook
   - Simulates an intersection event
   - Verifies the `isIntersecting` state updates correctly

2. **Enhance the mock implementation** to allow triggering of the IntersectionObserver callback:

   - Add a method to the mock IntersectionObserver that can simulate an intersection
   - Create a mock IntersectionObserverEntry with `isIntersecting: true`

3. **Write the test that**:

   - Sets up a DOM element ref
   - Triggers the intersection callback
   - Verifies that `isIntersecting` becomes `true`

4. **Verify the test** passes and accurately tests the behavior

## Testing Approach

Since we already have the basic mock setup from T001 and T002, we'll need to:

1. Extend the mock to allow triggering the callback
2. Create a proper IntersectionObserverEntry mock with correct properties
3. Use React Testing Library's act() function to properly handle state updates

## Expected Result

A passing test that verifies the `useIntersectionObserver` hook correctly updates its `isIntersecting` state when an intersection occurs.
