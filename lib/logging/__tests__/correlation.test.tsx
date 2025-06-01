import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  generateCorrelationId,
  CorrelationProvider,
  useCorrelationId,
  getOrCreateCorrelationId,
} from '../correlation';

// UUID v4 regex pattern
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('generateCorrelationId', () => {
  it('should generate a valid UUID v4', () => {
    const id = generateCorrelationId();
    expect(id).toMatch(UUID_V4_REGEX);
  });

  it('should generate unique IDs on each call', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateCorrelationId());
    }
    expect(ids.size).toBe(100);
  });
});

describe('CorrelationProvider', () => {
  // Mock sessionStorage for testing
  let mockSessionStorage: Record<string, string>;

  beforeEach(() => {
    mockSessionStorage = {};

    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn((key: string) => mockSessionStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockSessionStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockSessionStorage[key];
        }),
        clear: jest.fn(() => {
          mockSessionStorage = {};
        }),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should provide correlation ID to child components', () => {
    const TestComponent = () => {
      const correlationId = useCorrelationId();
      return <div data-testid="correlation-id">{correlationId}</div>;
    };

    render(
      <CorrelationProvider>
        <TestComponent />
      </CorrelationProvider>
    );

    const element = screen.getByTestId('correlation-id');
    expect(element.textContent).toMatch(UUID_V4_REGEX);
  });

  it('should initialize with a new ID when sessionStorage is empty', () => {
    const TestComponent = () => {
      const correlationId = useCorrelationId();
      return <div>{correlationId}</div>;
    };

    render(
      <CorrelationProvider>
        <TestComponent />
      </CorrelationProvider>
    );

    // Should have saved to sessionStorage
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'correlationId',
      expect.stringMatching(UUID_V4_REGEX)
    );
  });

  it('should use existing ID from sessionStorage if available', () => {
    const existingId = '123e4567-e89b-42d3-a456-426614174000';
    mockSessionStorage.correlationId = existingId;

    const TestComponent = () => {
      const correlationId = useCorrelationId();
      return <div data-testid="correlation-id">{correlationId}</div>;
    };

    render(
      <CorrelationProvider>
        <TestComponent />
      </CorrelationProvider>
    );

    const element = screen.getByTestId('correlation-id');
    expect(element.textContent).toBe(existingId);

    // Should not create a new ID
    expect(window.sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('should provide the same ID to all nested components', () => {
    const ids: string[] = [];

    const Component1 = () => {
      ids[0] = useCorrelationId();
      return <Component2 />;
    };

    const Component2 = () => {
      ids[1] = useCorrelationId();
      return <Component3 />;
    };

    const Component3 = () => {
      ids[2] = useCorrelationId();
      return null;
    };

    render(
      <CorrelationProvider>
        <Component1 />
      </CorrelationProvider>
    );

    expect(ids[0]).toBe(ids[1]);
    expect(ids[1]).toBe(ids[2]);
    expect(ids[0]).toMatch(UUID_V4_REGEX);
  });

  it('should handle sessionStorage errors gracefully', () => {
    // Mock sessionStorage to throw an error
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(() => {
          throw new Error('Storage error');
        }),
        setItem: jest.fn(() => {
          throw new Error('Storage error');
        }),
      },
      writable: true,
    });

    const TestComponent = () => {
      const correlationId = useCorrelationId();
      return <div data-testid="correlation-id">{correlationId}</div>;
    };

    // Should not throw, should fall back to in-memory ID
    expect(() => {
      render(
        <CorrelationProvider>
          <TestComponent />
        </CorrelationProvider>
      );
    }).not.toThrow();

    const element = screen.getByTestId('correlation-id');
    expect(element.textContent).toMatch(UUID_V4_REGEX);
  });
});

describe('useCorrelationId', () => {
  it('should throw error when used outside of CorrelationProvider', () => {
    const TestComponent = () => {
      useCorrelationId();
      return null;
    };

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCorrelationId must be used within CorrelationProvider');

    consoleSpy.mockRestore();
  });
});

describe('getOrCreateCorrelationId', () => {
  beforeEach(() => {
    // Reset the module to clear singleton state
    jest.resetModules();
  });

  it('should return the same ID on multiple calls', () => {
    const id1 = getOrCreateCorrelationId();
    const id2 = getOrCreateCorrelationId();
    const id3 = getOrCreateCorrelationId();

    expect(id1).toBe(id2);
    expect(id2).toBe(id3);
    expect(id1).toMatch(UUID_V4_REGEX);
  });

  it('should generate a new ID if none exists', () => {
    const id = getOrCreateCorrelationId();
    expect(id).toMatch(UUID_V4_REGEX);
  });
});

describe('CorrelationProvider SSR behavior', () => {
  it('should handle server-side rendering without sessionStorage', () => {
    // Remove sessionStorage to simulate SSR
    const originalSessionStorage = window.sessionStorage;
    delete (window as unknown as { sessionStorage?: Storage }).sessionStorage;

    const TestComponent = () => {
      const correlationId = useCorrelationId();
      return <div data-testid="correlation-id">{correlationId}</div>;
    };

    expect(() => {
      render(
        <CorrelationProvider>
          <TestComponent />
        </CorrelationProvider>
      );
    }).not.toThrow();

    const element = screen.getByTestId('correlation-id');
    expect(element.textContent).toMatch(UUID_V4_REGEX);

    // Restore sessionStorage
    (window as unknown as { sessionStorage: Storage }).sessionStorage = originalSessionStorage;
  });
});
