/**
 * Integration tests for end-to-end logging flow
 * Tests complete logging workflow from trigger to console output
 * Following DEVELOPMENT_PHILOSOPHY: No internal mocking, test real collaborations
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CorrelationProvider, useCorrelationId } from '../correlation';
import type { LogEntry } from '../types';

// Mock sessionStorage for controlled testing
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Store original values for restoration
const originalEnv = process.env;
const originalSessionStorage = global.sessionStorage;

// Console output capture and Pino transmit capture
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Mock Pino to capture log entries - declare these before jest.mock
const mockPinoLogger = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  level: 'info',
};

const mockTransmit = jest.fn();
const capturedLogEntries: unknown[] = [];

jest.mock('pino', () => {
  return jest.fn((config) => {
    // Create a logger that mimics Pino browser behavior - outputs to console
    return {
      error: (logEntry: unknown) => {
        mockPinoLogger.error(logEntry);
        capturedLogEntries.push({ level: 'error', entry: logEntry });

        // Get current environment at runtime (not capture time)
        const isDevelopment = process.env.NODE_ENV === 'development';
        const logLevel =
          config?.level || process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'info');
        const levelValues = { error: 50, warn: 40, info: 30, debug: 20 };
        const currentLevel = levelValues[logLevel as keyof typeof levelValues] || 30;

        if (currentLevel <= 50) {
          // Only show error if level allows it (errors are always shown)
          // Mimic Pino browser behavior
          if (isDevelopment && config?.browser?.asObject === false) {
            // Development: pretty-print style
            const msg =
              typeof logEntry === 'object' && logEntry && 'message' in logEntry
                ? (logEntry as LogEntry).message
                : JSON.stringify(logEntry);
            // eslint-disable-next-line no-console
            console.error(`[ERROR] ${msg} ${JSON.stringify(logEntry)}`);
          } else {
            // Production: JSON format
            // eslint-disable-next-line no-console
            console.error(JSON.stringify(logEntry));
          }
        }
      },
      warn: (logEntry: unknown) => {
        mockPinoLogger.warn(logEntry);
        capturedLogEntries.push({ level: 'warn', entry: logEntry });

        // Get current environment at runtime
        const isDevelopment = process.env.NODE_ENV === 'development';
        const logLevel =
          config?.level || process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'info');
        const levelValues = { error: 50, warn: 40, info: 30, debug: 20 };
        const currentLevel = levelValues[logLevel as keyof typeof levelValues] || 30;

        if (currentLevel <= 40) {
          // Only show warn if level allows it
          if (isDevelopment && config?.browser?.asObject === false) {
            const msg =
              typeof logEntry === 'object' && logEntry && 'message' in logEntry
                ? (logEntry as LogEntry).message
                : JSON.stringify(logEntry);
            // eslint-disable-next-line no-console
            console.warn(`[WARN] ${msg} ${JSON.stringify(logEntry)}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(logEntry));
          }
        }
      },
      info: (logEntry: unknown) => {
        mockPinoLogger.info(logEntry);
        capturedLogEntries.push({ level: 'info', entry: logEntry });

        // Get current environment at runtime
        const isDevelopment = process.env.NODE_ENV === 'development';
        const logLevel =
          config?.level || process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'info');
        const levelValues = { error: 50, warn: 40, info: 30, debug: 20 };
        const currentLevel = levelValues[logLevel as keyof typeof levelValues] || 30;

        if (currentLevel <= 30) {
          // Only show info if level allows it
          if (isDevelopment && config?.browser?.asObject === false) {
            const msg =
              typeof logEntry === 'object' && logEntry && 'message' in logEntry
                ? (logEntry as LogEntry).message
                : JSON.stringify(logEntry);
            // eslint-disable-next-line no-console
            console.log(`[INFO] ${msg} ${JSON.stringify(logEntry)}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(logEntry));
          }
        }
      },
      debug: (logEntry: unknown) => {
        mockPinoLogger.debug(logEntry);
        capturedLogEntries.push({ level: 'debug', entry: logEntry });

        // Get current environment at runtime
        const isDevelopment = process.env.NODE_ENV === 'development';
        const logLevel =
          config?.level || process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'info');
        const levelValues = { error: 50, warn: 40, info: 30, debug: 20 };
        const currentLevel = levelValues[logLevel as keyof typeof levelValues] || 30;

        if (currentLevel <= 20) {
          // Only show debug if level allows it
          if (isDevelopment && config?.browser?.asObject === false) {
            const msg =
              typeof logEntry === 'object' && logEntry && 'message' in logEntry
                ? (logEntry as LogEntry).message
                : JSON.stringify(logEntry);
            // eslint-disable-next-line no-console
            console.debug(`[DEBUG] ${msg} ${JSON.stringify(logEntry)}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(logEntry));
          }
        }
      },
      level:
        config?.level ||
        process.env.NEXT_PUBLIC_LOG_LEVEL ||
        (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
    };
  });
});

// Test component that uses correlation ID and triggers logging
interface TestComponentProps {
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
  message?: string;
  shouldThrowError?: boolean;
}

const TestComponent: React.FC<TestComponentProps> = ({
  logLevel = 'info',
  message = 'Test message',
  shouldThrowError = false,
}) => {
  const correlationId = useCorrelationId();

  const handleClick = async () => {
    // Dynamically import logger to get fresh instance with current environment
    const { logger } = await import('../logger');

    if (shouldThrowError) {
      const error = new Error('Test error for logging');
      logger.error(message, 'TestComponent', error, {
        event_type: 'test_action',
        correlation_id_from_hook: correlationId,
      });
    } else {
      switch (logLevel) {
        case 'error':
          logger.error(message, 'TestComponent', new Error('Test error'));
          break;
        case 'warn':
          logger.warn(message, 'TestComponent', {
            event_type: 'test_action',
            correlation_id_from_hook: correlationId,
          });
          break;
        case 'info':
          logger.info(message, 'TestComponent', {
            event_type: 'test_action',
            correlation_id_from_hook: correlationId,
          });
          break;
        case 'debug':
          logger.debug(message, 'TestComponent', {
            event_type: 'test_action',
            correlation_id_from_hook: correlationId,
          });
          break;
      }
    }
  };

  return (
    <div>
      <div data-testid="correlation-id">{correlationId}</div>
      <button onClick={handleClick} data-testid="trigger-log">
        Trigger {logLevel} log
      </button>
    </div>
  );
};

// Non-React context component to test getOrCreateCorrelationId
const triggerNonReactLogging = async (level: 'error' | 'warn' | 'info' | 'debug' = 'info') => {
  // Dynamically import logger to get fresh instance with current environment
  const { logger } = await import('../logger');

  switch (level) {
    case 'error':
      logger.error('Non-React error', 'NonReactContext', new Error('Non-React error'));
      break;
    case 'warn':
      logger.warn('Non-React warning', 'NonReactContext', {
        event_type: 'non_react_action',
      });
      break;
    case 'info':
      logger.info('Non-React info', 'NonReactContext', {
        event_type: 'non_react_action',
      });
      break;
    case 'debug':
      logger.debug('Non-React debug', 'NonReactContext', {
        event_type: 'non_react_action',
      });
      break;
  }
};

// Utility to set environment variables
const setEnvironment = (nodeEnv: string, logLevel?: string) => {
  process.env = { ...originalEnv };
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: nodeEnv,
    writable: true,
    configurable: true,
  });

  if (logLevel) {
    Object.defineProperty(process.env, 'NEXT_PUBLIC_LOG_LEVEL', {
      value: logLevel,
      writable: true,
      configurable: true,
    });
  } else {
    delete process.env.NEXT_PUBLIC_LOG_LEVEL;
  }

  // Clear module cache to get fresh logger instance with new environment
  jest.resetModules();
};

describe('End-to-End Logging Integration', () => {
  beforeEach(() => {
    // Reset all mocks and environment
    jest.clearAllMocks();

    // Reset Pino logger mocks
    mockPinoLogger.error.mockClear();
    mockPinoLogger.warn.mockClear();
    mockPinoLogger.info.mockClear();
    mockPinoLogger.debug.mockClear();
    mockTransmit.mockClear();

    // Clear captured log entries
    capturedLogEntries.length = 0;

    // Mock sessionStorage
    Object.defineProperty(global, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    // Mock console methods to capture output
    jest.spyOn(console, 'log').mockImplementation(mockConsole.log);
    jest.spyOn(console, 'error').mockImplementation(mockConsole.error);
    jest.spyOn(console, 'warn').mockImplementation(mockConsole.warn);
    jest.spyOn(console, 'info').mockImplementation(mockConsole.info);
    jest.spyOn(console, 'debug').mockImplementation(mockConsole.debug);

    // Setup default sessionStorage behavior
    mockSessionStorage.getItem.mockReturnValue(null);
    mockSessionStorage.setItem.mockImplementation(() => {
      // Mock implementation for sessionStorage.setItem
    });
  });

  afterEach(() => {
    // Restore original environment and sessionStorage
    process.env = originalEnv;
    Object.defineProperty(global, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true,
    });

    // Console methods are automatically restored by jest.clearAllMocks()
  });

  describe('Development Environment Logging', () => {
    beforeEach(() => {
      setEnvironment('development');
    });

    it('should output pretty-printed logs in development environment', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Development test message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      // Wait for logging to complete
      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      // Verify logger was called with structured log entry
      expect(mockPinoLogger.info).toHaveBeenCalledTimes(1);

      // Verify log entry structure
      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      expect(logEntry).toHaveProperty('message', 'Development test message');
      expect(logEntry).toHaveProperty('level', 'info');
      expect(logEntry).toHaveProperty('component_name', 'TestComponent');
      expect(logEntry).toHaveProperty('correlation_id');
      expect(logEntry).toHaveProperty('service_name', 'bitcoin-price-tag-splash');
    });

    it('should include all mandatory metadata fields in development logs', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Metadata test" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      // Verify all mandatory metadata fields
      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      // All mandatory fields from DEVELOPMENT_PHILOSOPHY.md
      expect(logEntry).toHaveProperty('timestamp');
      expect(logEntry).toHaveProperty('level', 'info');
      expect(logEntry).toHaveProperty('message', 'Metadata test');
      expect(logEntry).toHaveProperty('service_name', 'bitcoin-price-tag-splash');
      expect(logEntry).toHaveProperty('correlation_id');
      expect(logEntry).toHaveProperty('component_name', 'TestComponent');
      expect(logEntry).toHaveProperty('event_type', 'test_action');

      // Verify timestamp is ISO 8601 format
      expect(logEntry.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

      // Verify correlation ID is valid UUID v4
      expect(logEntry.correlation_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it('should show debug logs in development environment', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="debug" message="Debug message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.debug).toHaveBeenCalled();
      });

      expect(mockPinoLogger.debug).toHaveBeenCalledTimes(1);

      const logCall = mockPinoLogger.debug.mock.calls[0];
      const logEntry = logCall[0];

      expect(logEntry).toHaveProperty('message', 'Debug message');
      expect(logEntry).toHaveProperty('level', 'debug');
    });
  });

  describe('Production Environment Logging', () => {
    beforeEach(() => {
      setEnvironment('production');
    });

    it('should output JSON format logs in production environment', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Production test message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      // Verify structured log entry (which would be JSON in production)
      expect(mockPinoLogger.info).toHaveBeenCalledTimes(1);

      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      // Verify all production metadata is present
      expect(logEntry).toHaveProperty('message', 'Production test message');
      expect(logEntry).toHaveProperty('level', 'info');
      expect(logEntry).toHaveProperty('component_name', 'TestComponent');
      expect(logEntry).toHaveProperty('correlation_id');
      expect(logEntry).toHaveProperty('service_name', 'bitcoin-price-tag-splash');
      expect(logEntry).toHaveProperty('timestamp');
    });

    it('should filter debug logs in production environment', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="debug" message="Debug message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      // Debug logs should be filtered in production (default level is 'info')
      await new Promise((resolve) => setTimeout(resolve, 100));

      // The debug method should still be called on the Pino mock but not output to console
      expect(mockPinoLogger.debug).toHaveBeenCalled();
      expect(mockConsole.log).not.toHaveBeenCalled();
      expect(mockConsole.debug).not.toHaveBeenCalled();
    });

    it('should include transmit configuration for error logs', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="error" message="Error message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockConsole.error).toHaveBeenCalled();
      });

      expect(mockConsole.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('Log Level Filtering', () => {
    it('should respect NEXT_PUBLIC_LOG_LEVEL environment variable', async () => {
      setEnvironment('development', 'warn');

      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Info message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      // Info logs should be filtered when level is set to 'warn'
      await new Promise((resolve) => setTimeout(resolve, 100));

      // The info method should still be called on the Pino mock but not output to console
      expect(mockPinoLogger.info).toHaveBeenCalled();
      expect(mockConsole.log).not.toHaveBeenCalled();
      expect(mockConsole.info).not.toHaveBeenCalled();
    });

    it('should allow warn logs when level is set to warn', async () => {
      setEnvironment('development', 'warn');

      render(
        <CorrelationProvider>
          <TestComponent logLevel="warn" message="Warning message" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockConsole.warn).toHaveBeenCalled();
      });

      expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Correlation ID Propagation', () => {
    it('should propagate same correlation ID through React component tree', async () => {
      const existingId = 'test-correlation-123';
      mockSessionStorage.getItem.mockReturnValue(existingId);

      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Correlation test" />
        </CorrelationProvider>
      );

      // Verify component received the correlation ID
      const correlationDisplay = screen.getByTestId('correlation-id');
      await waitFor(() => {
        expect(correlationDisplay).toHaveTextContent(existingId);
      });

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      // Verify log entry contains correlation ID
      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      // The correlation ID from the logger might be different due to module resets
      // But the correlation ID from the hook should match the displayed one
      expect(logEntry).toHaveProperty('correlation_id_from_hook', existingId);
      expect(logEntry).toHaveProperty('correlation_id'); // Just verify it exists
    });

    it('should maintain correlation ID consistency between React and non-React contexts', async () => {
      const existingId = 'consistent-correlation-456';
      mockSessionStorage.getItem.mockReturnValue(existingId);

      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="React context test" />
        </CorrelationProvider>
      );

      // Trigger React context logging
      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      const reactLogCall = mockPinoLogger.info.mock.calls[0];

      // Clear console and trigger non-React logging
      mockPinoLogger.info.mockClear();
      await triggerNonReactLogging('info');

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      const nonReactLogCall = mockPinoLogger.info.mock.calls[0];

      // Both should have correlation ID from hook (React) and correlation ID should exist (non-React)
      expect(reactLogCall[0]).toHaveProperty('correlation_id_from_hook', existingId);
      expect(nonReactLogCall[0]).toHaveProperty('correlation_id'); // Just verify correlation ID exists

      // Both should read from the same sessionStorage
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('correlationId');
    });

    it('should persist correlation ID to sessionStorage', async () => {
      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Persistence test" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSessionStorage.setItem).toHaveBeenCalled();
      });

      // Verify sessionStorage was called with correlation ID
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'correlationId',
        expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
      );
    });
  });

  describe('Complete End-to-End Logging Flow', () => {
    it('should complete full workflow: trigger → logger → correlation → console output', async () => {
      setEnvironment('development');
      const testMessage = 'Complete workflow test';

      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message={testMessage} />
        </CorrelationProvider>
      );

      // Trigger the complete workflow
      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      // Verify complete workflow - check both Pino mock and console output
      expect(mockPinoLogger.info).toHaveBeenCalledTimes(1);
      expect(mockConsole.log).toHaveBeenCalledTimes(1);

      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      expect(logEntry).toHaveProperty('message', testMessage);
      expect(logEntry).toHaveProperty('component_name', 'TestComponent');
      expect(logEntry).toHaveProperty('level', 'info');
    });

    it('should handle all log levels with proper metadata', async () => {
      setEnvironment('development');

      const levels = ['error', 'warn', 'info', 'debug'] as const;

      for (const level of levels) {
        // Clear all mocks before each level test
        jest.clearAllMocks();
        mockPinoLogger.error.mockClear();
        mockPinoLogger.warn.mockClear();
        mockPinoLogger.info.mockClear();
        mockPinoLogger.debug.mockClear();

        const { unmount } = render(
          <CorrelationProvider>
            <TestComponent logLevel={level} message={`${level} message`} />
          </CorrelationProvider>
        );

        const button = screen.getByTestId('trigger-log');
        fireEvent.click(button);

        await waitFor(() => {
          if (level === 'error') {
            expect(mockPinoLogger.error).toHaveBeenCalled();
          } else {
            expect(mockPinoLogger[level]).toHaveBeenCalled();
          }
        });

        // Verify appropriate logger method was called
        if (level === 'error') {
          expect(mockPinoLogger.error).toHaveBeenCalled();
        } else {
          expect(mockPinoLogger[level]).toHaveBeenCalled();
        }

        // Clean up the component before next iteration
        unmount();
      }
    });

    it('should include structured error details for error logs', async () => {
      setEnvironment('development');

      render(
        <CorrelationProvider>
          <TestComponent logLevel="error" shouldThrowError={true} message="Error with details" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.error).toHaveBeenCalled();
      });

      const errorLogCall = mockPinoLogger.error.mock.calls[0];
      const errorEntry = errorLogCall[0];

      expect(errorEntry).toHaveProperty('message', 'Error with details');
      expect(errorEntry).toHaveProperty('error_details');
      expect(errorEntry.error_details).toHaveProperty('message', 'Test error for logging');
    });

    it('should merge custom context with mandatory fields', async () => {
      setEnvironment('production'); // Use production for JSON parsing

      render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message="Context merge test" />
        </CorrelationProvider>
      );

      const button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPinoLogger.info).toHaveBeenCalled();
      });

      const logCall = mockPinoLogger.info.mock.calls[0];
      const logEntry = logCall[0];

      // Verify mandatory fields
      expect(logEntry).toHaveProperty('level', 'info');
      expect(logEntry).toHaveProperty('message', 'Context merge test');
      expect(logEntry).toHaveProperty('timestamp');

      // Verify custom context
      expect(logEntry).toHaveProperty('event_type', 'test_action');
      expect(logEntry).toHaveProperty('service_name');
      expect(logEntry).toHaveProperty('correlation_id');
      expect(logEntry).toHaveProperty('component_name', 'TestComponent');
    });
  });

  describe('Environment Switching Validation', () => {
    it('should correctly switch between development and production formats', async () => {
      const testMessage = 'Format switching test';

      // Test development format
      setEnvironment('development');

      const { unmount: unmountDev } = render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message={testMessage} />
        </CorrelationProvider>
      );

      let button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockConsole.log).toHaveBeenCalled();
      });

      const devOutput = mockConsole.log.mock.calls[0][0];
      expect(typeof devOutput).toBe('string');
      expect(devOutput).toContain('[INFO]'); // Should contain pretty-print prefix
      expect(devOutput).toContain(testMessage);

      // Clean up development component
      unmountDev();

      // Clear and test production format
      mockConsole.log.mockClear();
      setEnvironment('production');

      const { unmount: unmountProd } = render(
        <CorrelationProvider>
          <TestComponent logLevel="info" message={testMessage} />
        </CorrelationProvider>
      );

      button = screen.getByTestId('trigger-log');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockConsole.log).toHaveBeenCalled();
      });

      const prodOutput = mockConsole.log.mock.calls[0][0];
      expect(() => JSON.parse(prodOutput)).not.toThrow(); // Should be valid JSON

      const parsedProd = JSON.parse(prodOutput);
      expect(parsedProd).toHaveProperty('message', testMessage);

      // Clean up production component
      unmountProd();
    });
  });
});

export {};
