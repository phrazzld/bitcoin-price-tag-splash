# T001 Plan: Set up test file and mock IntersectionObserver for useIntersectionObserver

## Analysis

The task requires setting up a test file and mocking the IntersectionObserver API for testing the `useIntersectionObserver` hook. This hook is used to track when elements intersect with the viewport, and it has several features that need to be tested in subsequent tasks:

1. Initial state tracking
2. Ref handling
3. Intersection behavior
4. triggerOnce option (true/false)
5. respectReducedMotion option
6. Unmount behavior
7. Options passing

The project currently does not have Jest or any other testing framework set up, so I need to:

1. Install Jest and related dependencies (jest, @testing-library/react, @testing-library/react-hooks, etc.)
2. Configure Jest for TypeScript
3. Create a proper IntersectionObserver mock
4. Set up the test file structure

## Implementation Plan

1. Install necessary testing dependencies using pnpm:

   - jest
   - @types/jest
   - jest-environment-jsdom
   - @testing-library/react
   - @testing-library/react-hooks (for testing hooks)
   - @testing-library/jest-dom (for extended matchers)

2. Create Jest configuration file (jest.config.ts) to:

   - Set up TypeScript support
   - Configure testEnvironment as jsdom
   - Set up module resolution for Next.js

3. Create a jest setup file to:

   - Set up extended matchers
   - Define global mocks

4. Create a mock for IntersectionObserver:

   - Implement a class that mimics the IntersectionObserver API
   - Add methods to control observation and trigger intersections in tests

5. Create test file structure:

   - Create `/lib/utils/__tests__/` directory
   - Create `use-intersection-observer.test.ts` file with initial test setup

6. Update package.json to add test scripts.

7. Update TODO.md to mark task T001 as in progress.

## Implementation Details

### IntersectionObserver Mock

The mock needs to implement:

- Constructor that takes callback and options
- observe method
- unobserve method
- disconnect method
- Way to trigger intersections in tests

The mock will be used in subsequent tests to verify:

- Initial state (isIntersecting = false)
- Ref handling (observe called with correct element)
- Intersection behavior (isIntersecting becomes true when triggered)
- triggerOnce behavior (unobserve called after intersection)
- respectReducedMotion behavior (isIntersecting = true immediately)
- Unmount behavior (disconnect called)
- Options passing (correct options passed to constructor)
