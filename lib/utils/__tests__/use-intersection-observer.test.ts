import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../use-intersection-observer';

// Simple mock for IntersectionObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

// Define a type for our global augmentation
declare global {
  interface Window {
    IntersectionObserverOriginal?: typeof IntersectionObserver;
  }
}

// Mock implementation of IntersectionObserver
beforeAll(() => {
  // Store the original implementation
  window.IntersectionObserverOriginal = window.IntersectionObserver;

  // Replace with mock
  window.IntersectionObserver = jest.fn().mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (this: any, callback: IntersectionObserverCallback) {
      this.observe = mockObserve;
      this.unobserve = mockUnobserve;
      this.disconnect = mockDisconnect;
      this.callback = callback;
    }
  ) as unknown as typeof IntersectionObserver;
});

// Restore original implementation
afterAll(() => {
  if (window.IntersectionObserverOriginal) {
    window.IntersectionObserver = window.IntersectionObserverOriginal;
  }
});

// Reset mocks between tests
beforeEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
  (window.IntersectionObserver as unknown as jest.Mock).mockClear();
});

describe('useIntersectionObserver hook', () => {
  // Test 1: Initial state should be false
  it('should initially set isIntersecting to false', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const [, isIntersecting] = result.current;
    expect(isIntersecting).toBe(false);
  });

  // Test 2: Verify that the ref is properly set up
  it('should return a ref object as the first item in the array', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const [ref] = result.current;

    // The ref should be an object with a current property initially set to null
    expect(ref).toHaveProperty('current');
    expect(ref.current).toBeNull();
  });
});
