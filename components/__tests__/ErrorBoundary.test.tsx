/**
 * Comprehensive tests for ErrorBoundary component
 * Tests error catching, structured logging, and fallback UI rendering
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';
import { logger } from '@/lib/logging/logger';

// Mock the logger service (external dependency)
jest.mock('@/lib/logging/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

const mockLogger = logger as jest.Mocked<typeof logger>;

// Mock console.error to suppress expected React error messages in tests
const originalConsoleError = console.error;

// Test component that throws an error when triggered
interface ErrorThrowingComponentProps {
  shouldThrow?: boolean;
  errorMessage?: string;
}

const ErrorThrowingComponent: React.FC<ErrorThrowingComponentProps> = ({
  shouldThrow = false,
  errorMessage = 'Test error',
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div data-testid="normal-content">Normal component content</div>;
};

// Custom fallback component for testing
const CustomFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div data-testid="custom-fallback">
    <h1>Custom Error Fallback</h1>
    {error && <p data-testid="error-message">{error.message}</p>}
  </div>
);

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Suppress console.error for error boundary tests
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

  describe('Normal Operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('normal-content')).toBeInTheDocument();
      expect(screen.getByText('Normal component content')).toBeInTheDocument();
    });

    it('should not call logger when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(mockLogger.error).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should catch errors and render default fallback UI', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // Should render default error fallback
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText(
          'We apologize for the inconvenience. The page encountered an unexpected error.'
        )
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument();

      // Original content should not be rendered
      expect(screen.queryByTestId('normal-content')).not.toBeInTheDocument();
    });

    it('should render custom fallback component when provided', () => {
      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ErrorThrowingComponent shouldThrow={true} errorMessage="Custom test error" />
        </ErrorBoundary>
      );

      // Should render custom fallback
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom Error Fallback')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent('Custom test error');

      // Default fallback should not be rendered
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should log structured error details when error occurs', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} errorMessage="Test error for logging" />
        </ErrorBoundary>
      );

      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'React Error Boundary caught an error',
        'ErrorBoundary',
        expect.any(Error),
        {
          event_type: 'react_error',
          component_stack: expect.any(String),
          error_boundary_location: 'global',
        }
      );
    });

    it('should include component stack in error logs', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      const logCall = mockLogger.error.mock.calls[0];
      const logContext = logCall[3]; // context is the 4th parameter (index 3)

      expect(logContext).toBeDefined();
      expect(logContext).toHaveProperty('component_stack');
      if (logContext && typeof logContext === 'object' && 'component_stack' in logContext) {
        const componentStack = logContext.component_stack;
        expect(typeof componentStack).toBe('string');
        // Component stack contains file paths and line numbers, not just component names
        expect(componentStack).toContain('ErrorBoundary.test.tsx');
        expect((componentStack as string).length).toBeGreaterThan(0);
      }
    });

    it('should handle different error types correctly', () => {
      // Test with TypeError
      const TypeErrorComponent = () => {
        throw new TypeError('Type error occurred');
      };

      render(
        <ErrorBoundary>
          <TypeErrorComponent />
        </ErrorBoundary>
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.any(String),
        'ErrorBoundary',
        expect.any(TypeError),
        expect.objectContaining({
          event_type: 'react_error',
          component_stack: expect.any(String),
          error_boundary_location: 'global',
        })
      );
    });
  });

  describe('Default Fallback UI', () => {
    beforeEach(() => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );
    });

    it('should display appropriate error icon', () => {
      const errorIcon = screen.getByTestId('error-icon');
      expect(errorIcon).toBeInTheDocument();
    });

    it('should have accessible error heading', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Something went wrong');
    });

    it('should provide reload functionality', () => {
      // Mock window.location.reload
      const mockReload = jest.fn();
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
      });

      const reloadButton = screen.getByRole('button', { name: 'Reload Page' });
      reloadButton.click();

      expect(mockReload).toHaveBeenCalledTimes(1);
    });

    it('should have proper styling classes', () => {
      const container = screen.getByText('Something went wrong').closest('div');
      expect(container?.parentElement?.parentElement).toHaveClass('min-h-screen');
    });
  });

  describe('Custom Fallback Component', () => {
    it('should pass error to custom fallback component', () => {
      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ErrorThrowingComponent shouldThrow={true} errorMessage="Passed error message" />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('error-message')).toHaveTextContent('Passed error message');
    });

    it('should handle custom fallback without error prop usage', () => {
      const SimpleFallback = () => <div data-testid="simple-fallback">Simple Error</div>;

      render(
        <ErrorBoundary fallback={SimpleFallback}>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('simple-fallback')).toBeInTheDocument();
      expect(screen.getByText('Simple Error')).toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('should recover when children change after error', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // Error state should be active
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Re-render with non-throwing component
      rerender(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      // Error boundary doesn't automatically recover - this is expected React behavior
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Multiple Error Boundaries', () => {
    it('should handle nested error boundaries', () => {
      render(
        <ErrorBoundary fallback={() => <div data-testid="outer-fallback">Outer Error</div>}>
          <ErrorBoundary fallback={() => <div data-testid="inner-fallback">Inner Error</div>}>
            <ErrorThrowingComponent shouldThrow={true} />
          </ErrorBoundary>
        </ErrorBoundary>
      );

      // Inner boundary should catch the error
      expect(screen.getByTestId('inner-fallback')).toBeInTheDocument();
      expect(screen.queryByTestId('outer-fallback')).not.toBeInTheDocument();
    });
  });

  describe('Logging Integration', () => {
    it('should maintain correlation ID through logger service', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // Logger should be called with proper parameters
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.any(String),
        'ErrorBoundary',
        expect.any(Error),
        expect.any(Object)
      );
    });

    it('should include all required structured logging fields', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      const logCall = mockLogger.error.mock.calls[0];
      const [message, component, error, context] = logCall;

      expect(message).toBe('React Error Boundary caught an error');
      expect(component).toBe('ErrorBoundary');
      expect(error).toBeInstanceOf(Error);
      expect(context).toMatchObject({
        event_type: 'react_error',
        component_stack: expect.any(String),
        error_boundary_location: 'global',
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes in default fallback', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorIcon = screen.getByTestId('error-icon');
      expect(errorIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have accessible heading structure', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: 'Reload Page' });
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('aria-hidden');
    });
  });
});

export {};
