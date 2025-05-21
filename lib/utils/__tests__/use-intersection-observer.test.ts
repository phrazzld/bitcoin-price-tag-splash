import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../use-intersection-observer';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

// Setup global mock
declare global {
  interface Window {
    IntersectionObserverOriginal?: typeof IntersectionObserver;
  }
}

beforeAll(() => {
  // Store original
  window.IntersectionObserverOriginal = window.IntersectionObserver;

  // Mock implementation
  mockIntersectionObserver.mockImplementation((callback) => {
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Store callback for our tests to use
      __callback: callback,
    };
  });

  // Replace global
  window.IntersectionObserver = mockIntersectionObserver;
});

// Restore original implementation
afterAll(() => {
  if (window.IntersectionObserverOriginal) {
    window.IntersectionObserver = window.IntersectionObserverOriginal;
  }
});

// Reset mocks between tests
beforeEach(() => {
  mockIntersectionObserver.mockClear();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
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

  // Test 3: Verify isIntersecting updates when intersection occurs
  it('should update isIntersecting to true when intersection occurs', () => {
    // Mock entry for intersection
    const mockEntry = {
      isIntersecting: true,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      target: document.createElement('div'),
      time: Date.now(),
    };

    let observerCallback: IntersectionObserverCallback | null = null;

    // Override the global mock for this specific test
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });

    // Create a ref to a DOM element
    const mockRef = { current: document.createElement('div') };

    // Render the hook with the mockRef
    const { result } = renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver();

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Initially isIntersecting should be false
    expect(result.current[1]).toBe(false);

    // Verify the callback was stored
    expect(observerCallback).not.toBeNull();

    // Simulate an intersection event
    act(() => {
      if (observerCallback) {
        observerCallback([mockEntry], {} as IntersectionObserver);
      }
    });

    // Now isIntersecting should be true
    expect(result.current[1]).toBe(true);
  });
});
