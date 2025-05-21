//  Mock implementation for IntersectionObserver to be used in tests

// Define type for mock IntersectionObserver instance
interface MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
  takeRecords: jest.Mock;
  // Custom methods for test control
  simulateIntersection: (isIntersecting: boolean) => void;
}

// Mock implementation for IntersectionObserver
class IntersectionObserverMock implements MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  callback: IntersectionObserverCallback;
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
  takeRecords: jest.Mock;

  private elements: Set<Element>;
  private readonly observerMap: Map<Element, IntersectionObserver>;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    // Fix: Explicitly cast the root to Element | null to satisfy TypeScript
    this.root = (options?.root as Element) || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold || 0];

    this.elements = new Set();
    this.observerMap = new Map();

    this.observe = jest.fn((element) => {
      this.elements.add(element);
      this.observerMap.set(element, this as unknown as IntersectionObserver);
    });

    this.unobserve = jest.fn((element) => {
      this.elements.delete(element);
      this.observerMap.delete(element);
    });

    this.disconnect = jest.fn(() => {
      this.elements.clear();
    });

    this.takeRecords = jest.fn(() => []);
  }

  // Method to simulate intersection in tests
  simulateIntersection(isIntersecting: boolean): void {
    if (this.elements.size === 0) return;

    const entries: IntersectionObserverEntry[] = Array.from(this.elements).map((element) => ({
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 1.0 : 0,
      intersectionRect: isIntersecting
        ? element.getBoundingClientRect()
        : new DOMRectReadOnly(0, 0, 0, 0),
      isIntersecting,
      rootBounds: this.root ? this.root.getBoundingClientRect() : null,
      target: element,
      time: Date.now(),
    }));

    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

// Add the mock to the global object before tests run
beforeEach(() => {
  // Store the original implementation
  const originalIntersectionObserver = window.IntersectionObserver;

  // Replace with our mock implementation
  window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

  return () => {
    // Restore the original implementation after tests
    window.IntersectionObserver = originalIntersectionObserver;
  };
});

// Basic mock to make getBoundingClientRect available on HTML elements
Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
  value: () => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }),
  configurable: true,
});

// Initial minimal test to check if setup is correct
describe('useIntersectionObserver hook', () => {
  it('should set up the mock correctly', () => {
    // Just a placeholder test to ensure the mock is set up correctly
    // More detailed tests will be added in subsequent tasks
    expect(window.IntersectionObserver).toBe(IntersectionObserverMock);
  });
});
