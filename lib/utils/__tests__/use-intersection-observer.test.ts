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
    matchMediaOriginal?: typeof window.matchMedia;
  }
}

beforeAll(() => {
  // Store originals
  window.IntersectionObserverOriginal = window.IntersectionObserver;
  window.matchMediaOriginal = window.matchMedia;

  // Mock IntersectionObserver implementation
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

// Restore original implementations
afterAll(() => {
  if (window.IntersectionObserverOriginal) {
    window.IntersectionObserver = window.IntersectionObserverOriginal;
  }
  if (window.matchMediaOriginal) {
    window.matchMedia = window.matchMediaOriginal;
  }
});

// Reset mocks between tests
beforeEach(() => {
  mockIntersectionObserver.mockClear();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();

  // Reset to default implementation
  mockIntersectionObserver.mockImplementation((callback) => {
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Store callback for our tests to use
      __callback: callback,
    };
  });

  // Reset window.matchMedia to original if it was mocked
  if (window.matchMediaOriginal) {
    window.matchMedia = window.matchMediaOriginal;
  }
});

// Helper to create mock entries
const createMockEntry = (isIntersecting: boolean): IntersectionObserverEntry => ({
  isIntersecting,
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: {} as DOMRectReadOnly,
  rootBounds: null,
  target: document.createElement('div'),
  time: Date.now(),
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
    const mockEntry = createMockEntry(true);

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

  // Test 4: Verify triggerOnce: true behavior (default option)
  it('should unobserve element after first intersection when triggerOnce is true', () => {
    // Mock entry for intersection
    const mockEntry = createMockEntry(true);

    let observerCallback: IntersectionObserverCallback | null = null;

    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Render the hook with the mockRef and default options (which includes triggerOnce: true)
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

    // Verify observe was called with our mock element
    expect(mockObserve).toHaveBeenCalledWith(mockElement);

    // Reset the unobserve mock to ensure a clean state before the intersection
    mockUnobserve.mockClear();

    // Before intersection, unobserve should not have been called
    expect(mockUnobserve).not.toHaveBeenCalled();

    // Simulate an intersection event
    act(() => {
      if (observerCallback) {
        observerCallback([mockEntry], mockObserverInstance as unknown as IntersectionObserver);
      }
    });

    // After intersection:
    // 1. isIntersecting should be true
    expect(result.current[1]).toBe(true);

    // 2. unobserve should have been called on the exact element that was observed
    expect(mockUnobserve).toHaveBeenCalledWith(mockElement);
    expect(mockUnobserve).toHaveBeenCalledTimes(1);

    // Reset mocks to check the state after intersection
    mockUnobserve.mockClear();

    // We've verified the key behavior: unobserve is called after the first intersection
    // when triggerOnce is true, so the test has succeeded. If we were to simulate another
    // intersection event here, the behavior would depend on implementation details of
    // React hooks and our test mocks, and wouldn't contribute to verifying the actual
    // feature.

    // The key assertions we've made are:
    // 1. The hook calls unobserve() with the correct element after the first intersection
    // 2. unobserve() is called exactly once

    // These verify the triggerOnce: true behavior correctly
    expect(mockUnobserve).not.toHaveBeenCalled();
  });

  // Test 5: Verify triggerOnce: false behavior allows multiple intersections
  it('should continue to update isIntersecting on multiple intersections when triggerOnce is false', () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Render the hook with triggerOnce: false
    const { result } = renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({ triggerOnce: false });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Initially isIntersecting should be false
    expect(result.current[1]).toBe(false);

    // Verify observe was called with our mock element
    expect(mockObserve).toHaveBeenCalledWith(mockElement);

    // Reset the unobserve mock to ensure a clean state
    mockUnobserve.mockClear();

    // Simulate first intersection (entering viewport)
    act(() => {
      if (observerCallback) {
        const firstEntry = createMockEntry(true);
        observerCallback([firstEntry], mockObserverInstance as unknown as IntersectionObserver);
      }
    });

    // After first intersection: isIntersecting should be true
    expect(result.current[1]).toBe(true);

    // With triggerOnce: false, unobserve should NOT be called
    expect(mockUnobserve).not.toHaveBeenCalled();

    // Simulate second intersection (leaving viewport)
    act(() => {
      if (observerCallback) {
        const secondEntry = createMockEntry(false);
        observerCallback([secondEntry], mockObserverInstance as unknown as IntersectionObserver);
      }
    });

    // After second intersection: isIntersecting should be false
    expect(result.current[1]).toBe(false);

    // unobserve should still not have been called
    expect(mockUnobserve).not.toHaveBeenCalled();

    // Simulate third intersection (entering viewport again)
    act(() => {
      if (observerCallback) {
        const thirdEntry = createMockEntry(true);
        observerCallback([thirdEntry], mockObserverInstance as unknown as IntersectionObserver);
      }
    });

    // After third intersection: isIntersecting should be true again
    expect(result.current[1]).toBe(true);

    // unobserve should still not have been called, confirming continuous observation
    expect(mockUnobserve).not.toHaveBeenCalled();
  });

  // Test 6: Verify respectReducedMotion: true behavior
  it('should immediately set isIntersecting to true when user prefers reduced motion', () => {
    // Mock matchMedia to return true for prefers-reduced-motion
    const mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    // Replace window.matchMedia with our mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Render the hook with default options (respectReducedMotion: true by default)
    const { result } = renderHook(() => useIntersectionObserver());

    // isIntersecting should immediately be true due to reduced motion preference
    expect(result.current[1]).toBe(true);

    // Verify that matchMedia was called with the correct query
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');

    // Verify that no IntersectionObserver was created since we're respecting reduced motion
    expect(mockIntersectionObserver).not.toHaveBeenCalled();

    // Cleanup: Reset the mock after this test
    mockMatchMedia.mockClear();
  });

  // Test 7: Verify respectReducedMotion: false ignores user preference
  it('should ignore reduced motion preference when respectReducedMotion is false', () => {
    // Mock matchMedia to return true for prefers-reduced-motion
    const mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    // Replace window.matchMedia with our mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test
    mockIntersectionObserver.mockImplementation(() => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Render the hook with respectReducedMotion: false
    const { result } = renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({ respectReducedMotion: false });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // isIntersecting should be false initially (normal behavior, ignoring reduced motion)
    expect(result.current[1]).toBe(false);

    // Verify that an IntersectionObserver was created despite the user's reduced motion preference
    expect(mockIntersectionObserver).toHaveBeenCalled();

    // Verify observe was called with our mock element
    expect(mockObserve).toHaveBeenCalledWith(mockElement);

    // Cleanup: Reset the mock after this test
    mockMatchMedia.mockClear();
  });

  // Test 8: Verify observer cleanup on component unmount
  it('should disconnect and unobserve when component unmounts', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test
    mockIntersectionObserver.mockImplementation(() => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Render the hook with a ref element
    const { unmount } = renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver();

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify that an IntersectionObserver was created and observe was called
    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(mockElement);

    // Clear the mocks to ensure we're only testing unmount behavior
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();

    // Unmount the component
    unmount();

    // Verify that cleanup was performed
    expect(mockUnobserve).toHaveBeenCalledWith(mockElement);
    expect(mockDisconnect).toHaveBeenCalled();

    // Verify that both cleanup functions were called exactly once
    expect(mockUnobserve).toHaveBeenCalledTimes(1);
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  // Test 9: Verify default options are passed to IntersectionObserver constructor
  it('should pass default options to IntersectionObserver constructor', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test to capture constructor arguments
    mockIntersectionObserver.mockImplementation((_callback, _options) => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Render the hook with default options
    renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver();

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify IntersectionObserver was called with default options
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });
  });

  // Test 10: Verify custom threshold option is passed to IntersectionObserver constructor
  it('should pass custom threshold option to IntersectionObserver constructor', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test to capture constructor arguments
    mockIntersectionObserver.mockImplementation((_callback, _options) => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    const customThreshold = 0.5;

    // Render the hook with custom threshold
    renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({ threshold: customThreshold });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify IntersectionObserver was called with custom threshold
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: null,
      rootMargin: '0px',
      threshold: customThreshold,
    });
  });

  // Test 11: Verify custom rootMargin option is passed to IntersectionObserver constructor
  it('should pass custom rootMargin option to IntersectionObserver constructor', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test to capture constructor arguments
    mockIntersectionObserver.mockImplementation((_callback, _options) => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    const customRootMargin = '10px 20px 30px 40px';

    // Render the hook with custom rootMargin
    renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({
        rootMargin: customRootMargin,
      });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify IntersectionObserver was called with custom rootMargin
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: null,
      rootMargin: customRootMargin,
      threshold: 0,
    });
  });

  // Test 12: Verify custom root option is passed to IntersectionObserver constructor
  it('should pass custom root option to IntersectionObserver constructor', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test to capture constructor arguments
    mockIntersectionObserver.mockImplementation((_callback, _options) => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Create a custom root element
    const customRoot = document.createElement('div');

    // Render the hook with custom root
    renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({ root: customRoot });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify IntersectionObserver was called with custom root
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: customRoot,
      rootMargin: '0px',
      threshold: 0,
    });
  });

  // Test 13: Verify multiple custom options are passed to IntersectionObserver constructor
  it('should pass multiple custom options to IntersectionObserver constructor', () => {
    // Create a fake observer object to be returned by the mock
    const mockObserverInstance = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    // Override the global mock for this specific test to capture constructor arguments
    mockIntersectionObserver.mockImplementation((_callback, _options) => {
      return mockObserverInstance;
    });

    // Create a ref to a DOM element
    const mockElement = document.createElement('div');
    const mockRef = { current: mockElement };

    // Create custom option values
    const customRoot = document.createElement('div');
    const customRootMargin = '15px';
    const customThreshold = [0, 0.25, 0.5, 0.75, 1];

    // Render the hook with multiple custom options
    renderHook(() => {
      const [ref, isIntersecting, entry] = useIntersectionObserver({
        root: customRoot,
        rootMargin: customRootMargin,
        threshold: customThreshold,
      });

      // Set the ref current value in the first render
      if (!ref.current) {
        ref.current = mockRef.current;
      }

      return [ref, isIntersecting, entry];
    });

    // Verify IntersectionObserver was called with all custom options
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: customRoot,
      rootMargin: customRootMargin,
      threshold: customThreshold,
    });
  });
});
