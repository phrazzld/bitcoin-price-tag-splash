# T002 Plan: Test useIntersectionObserver Initial State and Ref Handling

## Analysis

The task requires testing two key aspects of the `useIntersectionObserver` hook:

1. Verifying that `isIntersecting` is initially `false` (the first item in the hook's return array)
2. Verifying that the ref is correctly handled and the `observe` method is called when the ref is attached to an element

We already have:

- A mock implementation of the IntersectionObserver
- A basic test setup

## Implementation Approach

### 1. Test Initial isIntersecting State

To test that `isIntersecting` is initially `false`, we need to:

- Import the `useIntersectionObserver` hook
- Import `renderHook` from `@testing-library/react` to render the hook in a test environment
- Call the hook with default parameters
- Verify that the second element in the returned array is `false`

### 2. Test Ref Handling and Observe Call

To test that the ref is correctly handled and `observe` is called:

- Render the hook with `renderHook`
- Create a mock DOM element
- Assign this element to the ref returned by the hook
- Trigger a re-render to simulate the effect running
- Verify that the IntersectionObserver's `observe` method is called with the correct element

## Implementation Details

1. Update the test file to import necessary functions:

   ```typescript
   import { renderHook } from '@testing-library/react';
   import { useIntersectionObserver } from '../use-intersection-observer';
   ```

2. Create a test for initial state:

   ```typescript
   it('should initially set isIntersecting to false', () => {
     const { result } = renderHook(() => useIntersectionObserver());
     const [, isIntersecting] = result.current;

     expect(isIntersecting).toBe(false);
   });
   ```

3. Create a test for ref handling and observe call:
   ```typescript
   it('should observe the element when ref is attached', () => {
     // Render the hook
     const { result, rerender } = renderHook(() => useIntersectionObserver());

     // Create a mock element and attach it to the ref
     const mockElement = document.createElement('div');
     result.current[0].current = mockElement;

     // Trigger a re-render to simulate effect running
     rerender();

     // Get the mock observer instance and check if observe was called with the correct element
     const mockObserver = window.IntersectionObserver as unknown as jest.MockedClass<
       typeof IntersectionObserverMock
     >;
     const observeInstance = mockObserver.mock.instances[0];

     expect(observeInstance.observe).toHaveBeenCalledWith(mockElement);
   });
   ```

## Verification

- The tests should pass when run with `pnpm test`
- The tests should verify that:
  - `isIntersecting` is initially `false`
  - The `observe` method is called with the correct element when the ref is attached

This implementation follows the testing best practices from the development philosophy and ensures we're testing the hook's behavior, not its implementation details.
