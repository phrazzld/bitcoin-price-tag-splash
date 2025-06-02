/**
 * Comprehensive unit tests for LoggerService
 * Tests actual behavior and LogEntry structure validation following TDD approach
 */

import { LoggerService, logger } from '../logger';
import type { LogEntry, LogContext, ErrorDetails } from '../types';
import { getOrCreateCorrelationId } from '../correlation';

// Mock correlation service (external dependency)
jest.mock('../correlation', () => ({
  getOrCreateCorrelationId: jest.fn(),
}));

const mockGetOrCreateCorrelationId = getOrCreateCorrelationId as jest.MockedFunction<
  typeof getOrCreateCorrelationId
>;

// Enhanced Pino mock that captures method calls and parameters

jest.mock('pino', () => {
  return jest.fn(() => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  }));
});

// Import pino constructor for verification
import pino from 'pino';
const mockPinoConstructor = pino as jest.MockedFunction<typeof pino>;

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let mockPinoInstance: {
    error: jest.Mock;
    warn: jest.Mock;
    info: jest.Mock;
    debug: jest.Mock;
    level: string;
    fatal: jest.Mock;
    trace: jest.Mock;
    silent: jest.Mock;
  };
  const mockCorrelationId = 'test-correlation-id-123';

  // Store original environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    mockGetOrCreateCorrelationId.mockReturnValue(mockCorrelationId);

    // Get the mock pino instance to access its methods
    mockPinoInstance = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      level: 'info',
      fatal: jest.fn(),
      trace: jest.fn(),
      silent: jest.fn(),
    };

    // Configure the mock constructor to return our mock instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockPinoConstructor.mockReturnValue(mockPinoInstance as any);

    // Reset environment to clean state
    process.env = { ...originalEnv };
    Object.defineProperty(process.env, 'NODE_ENV', { value: undefined, writable: true });
    Object.defineProperty(process.env, 'NEXT_PUBLIC_LOG_LEVEL', {
      value: undefined,
      writable: true,
    });
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('Constructor and Environment Configuration', () => {
    it('should configure Pino for development environment', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });

      new LoggerService();

      expect(mockPinoConstructor).toHaveBeenCalledWith({
        level: 'debug',
        browser: {
          asObject: false, // Pretty print in development
        },
      });
    });

    it('should configure Pino for production environment with transmit', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });

      new LoggerService();

      const pinoConfig = mockPinoConstructor.mock.calls[0][0];
      expect(pinoConfig).toMatchObject({
        level: 'info',
        browser: {
          asObject: true, // JSON in production
          transmit: {
            level: 'error',
            send: expect.any(Function),
          },
        },
      });
    });

    it('should respect NEXT_PUBLIC_LOG_LEVEL when provided', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });
      Object.defineProperty(process.env, 'NEXT_PUBLIC_LOG_LEVEL', {
        value: 'warn',
        writable: true,
      });

      new LoggerService();

      expect(mockPinoConstructor).toHaveBeenCalledWith({
        level: 'warn',
        browser: {
          asObject: false,
        },
      });
    });

    it('should use default log levels when environment variables are missing', () => {
      // No NODE_ENV or NEXT_PUBLIC_LOG_LEVEL set

      new LoggerService();

      const pinoConfig = mockPinoConstructor.mock.calls[0][0];
      expect(pinoConfig).toMatchObject({
        level: 'info', // Default when NODE_ENV is not 'development'
        browser: {
          asObject: true,
          transmit: expect.objectContaining({
            level: 'error',
            send: expect.any(Function),
          }),
        },
      });
    });

    it('should use production defaults for unknown NODE_ENV values', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'staging', writable: true });

      new LoggerService();

      const pinoConfig = mockPinoConstructor.mock.calls[0][0];
      expect(pinoConfig).toMatchObject({
        level: 'info',
        browser: {
          asObject: true,
          transmit: expect.objectContaining({
            level: 'error',
            send: expect.any(Function),
          }),
        },
      });
    });
  });

  describe('Singleton Export', () => {
    it('should export a singleton logger instance', () => {
      expect(logger).toBeInstanceOf(LoggerService);
    });

    it('should export the same instance on multiple imports', async () => {
      const module1 = await import('../logger');
      const module2 = await import('../logger');

      expect(module1.logger).toBe(module2.logger);
    });
  });

  describe('LogEntry Structure and Metadata', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should create valid LogEntry objects with all mandatory fields', () => {
      const message = 'Test message';
      const componentName = 'TestComponent';

      loggerService.info(message, componentName);

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;

      // Verify all mandatory fields are present and correctly typed
      expect(capturedLogEntry).toMatchObject({
        timestamp: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/), // ISO 8601 UTC
        level: 'info',
        message: message,
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: componentName,
      });
    });

    it('should include valid ISO 8601 UTC timestamp', () => {
      loggerService.info('Test', 'Component');

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;
      const timestamp = new Date(capturedLogEntry.timestamp);

      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
      expect(capturedLogEntry.timestamp).toMatch(/Z$/); // UTC timezone indicator
    });

    it('should include correct service name', () => {
      loggerService.debug('Test', 'Component');

      const capturedLogEntry = mockPinoInstance.debug.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.service_name).toBe('bitcoin-price-tag-splash');
    });

    it('should merge optional context correctly', () => {
      const context: LogContext = {
        event_type: 'user_interaction',
        action: 'click',
        element_id: 'test-button',
        custom_data: { nested: 'value' },
      };

      loggerService.info('User clicked button', 'ButtonComponent', context);

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        ...context,
        // Mandatory fields should still be present
        timestamp: expect.any(String),
        level: 'info',
        message: 'User clicked button',
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: 'ButtonComponent',
      });
    });

    it('should handle empty context objects', () => {
      const emptyContext: LogContext = {};

      loggerService.warn('Test warning', 'Component', emptyContext);

      const capturedLogEntry = mockPinoInstance.warn.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        timestamp: expect.any(String),
        level: 'warn',
        message: 'Test warning',
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: 'Component',
      });
    });
  });

  describe('Error Method and Error Processing', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should process Error objects correctly', () => {
      const testError = new Error('Test error message');
      testError.name = 'CustomError';
      testError.stack = 'Error: Test error message\n    at test.js:1:1';

      loggerService.error('Error occurred', 'ErrorComponent', testError);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'CustomError',
        message: 'Test error message',
        stack: 'Error: Test error message\n    at test.js:1:1',
      });
    });

    it('should handle Error objects without stack traces', () => {
      const testError = new Error('Error without stack');
      delete testError.stack;

      loggerService.error('Error occurred', 'ErrorComponent', testError);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'Error',
        message: 'Error without stack',
        stack: undefined,
      });
    });

    it('should process string errors correctly', () => {
      const stringError = 'String error message';

      loggerService.error('String error occurred', 'ErrorComponent', stringError);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'StringError',
        message: 'String error message',
      });
    });

    it('should handle object errors with JSON serialization', () => {
      const objectError = {
        code: 'NETWORK_ERROR',
        details: { timeout: 5000, url: 'https://api.example.com' },
      };

      loggerService.error('Object error occurred', 'ErrorComponent', objectError);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'UnknownError',
        message: JSON.stringify(objectError),
      });
    });

    it('should handle circular reference objects safely', () => {
      const circularError: { message: string; self?: unknown } = { message: 'Circular error' };
      circularError.self = circularError;

      expect(() => {
        loggerService.error('Circular error occurred', 'ErrorComponent', circularError);
      }).not.toThrow();

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'UnknownError',
        message: '[object Object]', // String() fallback for circular references
      });
    });

    it('should handle primitive error types', () => {
      const primitiveError = 42;

      loggerService.error('Primitive error occurred', 'ErrorComponent', primitiveError);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry.error_details).toEqual({
        name: 'UnknownError',
        message: '42',
      });
    });

    it('should handle null and undefined errors', () => {
      loggerService.error('Null error', 'ErrorComponent', null);
      loggerService.error('Undefined error', 'ErrorComponent', undefined);

      const nullLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;
      const undefinedLogEntry = mockPinoInstance.error.mock.calls[1][0] as LogEntry;

      expect(nullLogEntry.error_details).toBeUndefined();
      expect(undefinedLogEntry.error_details).toBeUndefined();
    });

    it('should merge error details with additional context', () => {
      const testError = new Error('Test error');
      const context: LogContext = {
        event_type: 'component_error',
        user_id: '12345',
        retry_count: 3,
      };

      loggerService.error('Error with context', 'ErrorComponent', testError, context);

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        ...context,
        error_details: {
          name: 'Error',
          message: 'Test error',
          stack: expect.any(String),
        },
        timestamp: expect.any(String),
        level: 'error',
        message: 'Error with context',
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: 'ErrorComponent',
      });
    });
  });

  describe('Warning Method', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should create warning log entries with correct structure', () => {
      const message = 'Test warning message';
      const componentName = 'WarnComponent';

      loggerService.warn(message, componentName);

      const capturedLogEntry = mockPinoInstance.warn.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        timestamp: expect.any(String),
        level: 'warn',
        message: message,
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: componentName,
      });

      expect(capturedLogEntry.error_details).toBeUndefined();
    });

    it('should include context in warning logs', () => {
      const context: LogContext = {
        event_type: 'component_error',
        fallback_behavior: 'render_null',
        requested_icon: 'nonexistent-icon',
      };

      loggerService.warn('Missing icon warning', 'IconComponent', context);

      const capturedLogEntry = mockPinoInstance.warn.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        ...context,
        level: 'warn',
        message: 'Missing icon warning',
        component_name: 'IconComponent',
      });
    });
  });

  describe('Info Method', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should create info log entries with correct structure', () => {
      const message = 'User interaction logged';
      const componentName = 'ButtonComponent';

      loggerService.info(message, componentName);

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        timestamp: expect.any(String),
        level: 'info',
        message: message,
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: componentName,
      });
    });

    it('should include user interaction context', () => {
      const context: LogContext = {
        event_type: 'user_interaction',
        interaction_type: 'click',
        element_id: 'cta-button',
        session_duration: 120000,
      };

      loggerService.info('Button clicked', 'HeroSection', context);

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        ...context,
        level: 'info',
        message: 'Button clicked',
        component_name: 'HeroSection',
      });
    });
  });

  describe('Debug Method', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should create debug log entries with correct structure', () => {
      const message = 'Component lifecycle event';
      const componentName = 'LifecycleComponent';

      loggerService.debug(message, componentName);

      const capturedLogEntry = mockPinoInstance.debug.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        timestamp: expect.any(String),
        level: 'debug',
        message: message,
        service_name: 'bitcoin-price-tag-splash',
        correlation_id: mockCorrelationId,
        component_name: componentName,
      });
    });

    it('should include lifecycle context', () => {
      const context: LogContext = {
        event_type: 'state_change',
        lifecycle_phase: 'mount',
        props_changed: true,
        render_count: 1,
      };

      loggerService.debug('Component mounted', 'LifecycleComponent', context);

      const capturedLogEntry = mockPinoInstance.debug.mock.calls[0][0] as LogEntry;

      expect(capturedLogEntry).toMatchObject({
        ...context,
        level: 'debug',
        message: 'Component mounted',
        component_name: 'LifecycleComponent',
      });
    });
  });

  describe('Correlation Service Integration', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should call correlation service for each log entry', () => {
      loggerService.error('Error', 'Component');
      loggerService.warn('Warning', 'Component');
      loggerService.info('Info', 'Component');
      loggerService.debug('Debug', 'Component');

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalledTimes(4);
    });

    it('should use correlation ID returned by service', () => {
      const customCorrelationId = 'custom-correlation-456';
      mockGetOrCreateCorrelationId.mockReturnValue(customCorrelationId);

      loggerService.info('Test message', 'TestComponent');

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;
      expect(capturedLogEntry.correlation_id).toBe(customCorrelationId);
    });

    it('should handle correlation service errors gracefully', () => {
      mockGetOrCreateCorrelationId.mockImplementation(() => {
        throw new Error('Correlation service failure');
      });

      expect(() => {
        loggerService.info('Test message', 'TestComponent');
      }).not.toThrow();

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;
      expect(capturedLogEntry.correlation_id).toBe('unknown');
    });
  });

  describe('Type Safety and Interface Compliance', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should maintain strict typing for LogContext', () => {
      const typedContext: LogContext = {
        event_type: 'user_interaction',
        string_field: 'value',
        number_field: 42,
        boolean_field: true,
        array_field: [1, 2, 3],
        object_field: { nested: { deeply: 'value' } },
        null_field: null,
        undefined_field: undefined,
      };

      expect(() => {
        loggerService.info('Typed context test', 'TypedComponent', typedContext);
      }).not.toThrow();

      const capturedLogEntry = mockPinoInstance.info.mock.calls[0][0] as LogEntry;
      expect(capturedLogEntry).toMatchObject(typedContext);
    });

    it('should produce LogEntry objects that match the interface', () => {
      loggerService.error('Interface test', 'TestComponent', new Error('Test'));

      const capturedLogEntry = mockPinoInstance.error.mock.calls[0][0];

      // Verify the captured log entry satisfies LogEntry interface requirements
      const logEntry: LogEntry = capturedLogEntry as LogEntry;

      expect(typeof logEntry.timestamp).toBe('string');
      expect(['error', 'warn', 'info', 'debug']).toContain(logEntry.level);
      expect(typeof logEntry.message).toBe('string');
      expect(typeof logEntry.service_name).toBe('string');
      expect(typeof logEntry.correlation_id).toBe('string');
      expect(typeof logEntry.component_name).toBe('string');

      if (logEntry.error_details) {
        const errorDetails: ErrorDetails = logEntry.error_details;
        expect(typeof errorDetails.name).toBe('string');
        expect(typeof errorDetails.message).toBe('string');
        if (errorDetails.stack) {
          expect(typeof errorDetails.stack).toBe('string');
        }
      }
    });
  });

  describe('Performance and Memory', () => {
    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('should handle high-frequency logging without significant performance impact', () => {
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        loggerService.info(`High frequency message ${i}`, 'PerformanceTest', {
          iteration: i,
          batch_size: 1000,
        });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (generous threshold for CI environments)
      expect(duration).toBeLessThan(5000); // 5 seconds for 1000 logs
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalledTimes(1000);
    });

    it('should not accumulate memory with large log contexts', () => {
      const largeContext: LogContext = {
        large_data: new Array(1000).fill(0).map((_, i) => `item-${i}`),
        event_type: 'performance_test',
      };

      expect(() => {
        for (let i = 0; i < 100; i++) {
          loggerService.debug(`Memory test ${i}`, 'MemoryTest', largeContext);
        }
      }).not.toThrow();

      expect(mockPinoInstance.debug).toHaveBeenCalledTimes(100);
    });
  });

  describe('SendToLoggingService Placeholder', () => {
    it('should have sendToLoggingService method for future implementation', () => {
      const loggerInstance = new LoggerService();

      // Access private method through type assertion for testing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const privateLoggerInstance = loggerInstance as any;

      expect(typeof privateLoggerInstance.sendToLoggingService).toBe('function');

      // Should not throw when called (placeholder implementation)
      expect(() => {
        privateLoggerInstance.sendToLoggingService('error', { test: 'data' });
      }).not.toThrow();
    });
  });
});
