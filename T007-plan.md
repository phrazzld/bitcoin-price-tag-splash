# T007 Plan: Test useIntersectionObserver unmount behavior

## Objective

Write unit tests to verify that the IntersectionObserver is properly disconnected when the component using the hook unmounts.

## Implementation Plan

1. **Test unmount cleanup**: Add a test case that:

   - Renders the hook with a ref element
   - Verifies that an IntersectionObserver is created
   - Unmounts the component using `unmount()` from React Testing Library
   - Verifies that the cleanup function calls `disconnect()` and `unobserve()`

2. **Implementation details**: Looking at the hook code (lines 88-92):

   ```typescript
   // Clean up the observer on component unmount
   return () => {
     observer.unobserve(currentElement);
     observer.disconnect();
   };
   ```

3. **Testing approach**:
   - Use the existing mock infrastructure
   - Test that both `unobserve()` and `disconnect()` are called during cleanup
   - Verify this happens when the component unmounts

## Testing Approach

Build on the existing test infrastructure and verify that:

1. When the component unmounts, the cleanup function is executed
2. The cleanup calls both `observer.unobserve(currentElement)` and `observer.disconnect()`
3. The mocks capture these calls correctly

## Expected Result

A comprehensive test that verifies proper resource cleanup when the component unmounts, preventing memory leaks.
