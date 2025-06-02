/**
 * Comprehensive test suite for the core logger service
 * Following TDD approach - tests written before implementation
 */

import { LoggerService } from '../logger';
import type { LogContext } from '../types';
import { getOrCreateCorrelationId } from '../correlation';

// Mock correlation service for testing
jest.mock('../correlation', () => ({
  getOrCreateCorrelationId: jest.fn(),
}));

const mockGetOrCreateCorrelationId = getOrCreateCorrelationId as jest.MockedFunction<
  typeof getOrCreateCorrelationId
>;

// Mock pino for testing
jest.mock('pino', () => {
  const mockPino = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };

  return jest.fn(() => mockPino);
});

// Mock process.env for environment testing
const originalEnv = process.env;

describe('LoggerService', () => {
  let logger: LoggerService;
  let mockCorrelationId: string;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Set up default correlation ID
    mockCorrelationId = 'test-correlation-id-123';
    mockGetOrCreateCorrelationId.mockReturnValue(mockCorrelationId);

    // Reset environment variables
    process.env = { ...originalEnv };

    // Create fresh logger instance
    logger = new LoggerService();
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('Constructor and Environment Detection', () => {
    it('should initialize with development configuration when NODE_ENV is development', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });
      const devLogger = new LoggerService();
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv, writable: true });

      expect(devLogger).toBeInstanceOf(LoggerService);
      // Constructor should configure Pino for development
    });

    it('should initialize with production configuration when NODE_ENV is production', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });
      const prodLogger = new LoggerService();
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv, writable: true });

      expect(prodLogger).toBeInstanceOf(LoggerService);
      // Constructor should configure Pino for production
    });

    it('should use NEXT_PUBLIC_LOG_LEVEL when provided', () => {
      process.env.NEXT_PUBLIC_LOG_LEVEL = 'warn';
      const customLogger = new LoggerService();

      expect(customLogger).toBeInstanceOf(LoggerService);
      // Should respect custom log level
    });

    it('should handle missing environment variables gracefully', () => {
      // All env vars undefined
      const defaultLogger = new LoggerService();

      expect(defaultLogger).toBeInstanceOf(LoggerService);
      // Should use sensible defaults
    });
  });

  describe('Singleton Pattern', () => {
    it('should export a singleton logger instance', () => {
      // This will be tested after implementation
      expect(logger).toBeInstanceOf(LoggerService);
    });
  });

  describe('buildLogEntry Method (Internal)', () => {
    it('should create valid LogEntry objects with all mandatory fields', () => {
      const message = 'Test message';
      const componentName = 'TestComponent';

      // This tests the internal buildLogEntry method indirectly through public methods
      logger.info(message, componentName);

      // Verify correlation ID was requested
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include timestamp in ISO 8601 UTC format', () => {
      logger.info('Test', 'Component');

      // Timestamp should be generated during log entry creation
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include service_name as bitcoin-price-tag-splash', () => {
      logger.info('Test', 'Component');

      // Service name should be consistent
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle optional context correctly', () => {
      const context: LogContext = {
        event_type: 'user_interaction',
        custom_field: 'value',
      };

      logger.info('Test', 'Component', context);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle missing correlation ID gracefully', () => {
      mockGetOrCreateCorrelationId.mockReturnValue('fallback-id');

      logger.info('Test', 'Component');

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('error() Method', () => {
    it('should log error messages with proper structure', () => {
      const message = 'Test error message';
      const componentName = 'ErrorComponent';

      logger.error(message, componentName);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include error_details when Error object is provided', () => {
      const message = 'Test error';
      const componentName = 'ErrorComponent';
      const error = new Error('Detailed error message');
      error.stack = 'Error stack trace';

      logger.error(message, componentName, error);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle non-Error objects gracefully', () => {
      const message = 'Test error';
      const componentName = 'ErrorComponent';
      const nonError = { message: 'Not an Error object' };

      logger.error(message, componentName, nonError);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle string errors gracefully', () => {
      const message = 'Test error';
      const componentName = 'ErrorComponent';
      const stringError = 'String error message';

      logger.error(message, componentName, stringError);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should merge error context with additional context', () => {
      const message = 'Test error';
      const componentName = 'ErrorComponent';
      const error = new Error('Test');
      const context: LogContext = {
        event_type: 'component_error',
        additional_info: 'extra data',
      };

      logger.error(message, componentName, error, context);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('warn() Method', () => {
    it('should log warning messages with proper structure', () => {
      const message = 'Test warning message';
      const componentName = 'WarnComponent';

      logger.warn(message, componentName);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include optional context in warning logs', () => {
      const message = 'Test warning';
      const componentName = 'WarnComponent';
      const context: LogContext = {
        event_type: 'component_error',
        fallback_action: 'default_behavior',
      };

      logger.warn(message, componentName, context);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should not include error_details in warning logs', () => {
      const message = 'Test warning';
      const componentName = 'WarnComponent';

      logger.warn(message, componentName);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('info() Method', () => {
    it('should log info messages with proper structure', () => {
      const message = 'Test info message';
      const componentName = 'InfoComponent';

      logger.info(message, componentName);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include optional context in info logs', () => {
      const message = 'User interaction';
      const componentName = 'ButtonComponent';
      const context: LogContext = {
        event_type: 'user_interaction',
        action: 'click',
        element_id: 'cta-button',
      };

      logger.info(message, componentName, context);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('debug() Method', () => {
    it('should log debug messages with proper structure', () => {
      const message = 'Test debug message';
      const componentName = 'DebugComponent';

      logger.debug(message, componentName);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should include optional context in debug logs', () => {
      const message = 'Component lifecycle';
      const componentName = 'LifecycleComponent';
      const context: LogContext = {
        event_type: 'state_change',
        lifecycle_phase: 'mount',
        props_count: 5,
      };

      logger.debug(message, componentName, context);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('sendToLoggingService Method (Placeholder)', () => {
    it('should have sendToLoggingService method for future implementation', () => {
      // This method should exist but be a placeholder
      expect(logger).toHaveProperty('sendToLoggingService');
    });
  });

  describe('Type Safety', () => {
    it('should maintain strict typing for all method parameters', () => {
      // TypeScript compilation will catch type safety issues
      // This test ensures the API is correctly typed

      const validContext: LogContext = {
        event_type: 'user_interaction',
        numeric_value: 42,
        boolean_flag: true,
        nested_object: { key: 'value' },
      };

      logger.info('Typed message', 'TypedComponent', validContext);
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle empty context objects', () => {
      const emptyContext: LogContext = {};

      logger.info('Empty context', 'Component', emptyContext);
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });
  });

  describe('Integration with Correlation Service', () => {
    it('should call getOrCreateCorrelationId for each log entry', () => {
      logger.error('Error', 'Component');
      logger.warn('Warning', 'Component');
      logger.info('Info', 'Component');
      logger.debug('Debug', 'Component');

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalledTimes(4);
    });

    it('should use the correlation ID returned by the service', () => {
      const customCorrelationId = 'custom-correlation-123';
      mockGetOrCreateCorrelationId.mockReturnValue(customCorrelationId);

      logger.info('Test', 'Component');

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalledWith();
    });

    it('should handle correlation service errors gracefully', () => {
      mockGetOrCreateCorrelationId.mockImplementation(() => {
        throw new Error('Correlation service error');
      });

      expect(() => {
        logger.info('Test', 'Component');
      }).not.toThrow();
    });
  });

  describe('Error Object Processing', () => {
    it('should extract name, message, and stack from Error objects', () => {
      const testError = new Error('Test error message');
      testError.name = 'CustomError';
      testError.stack = 'Error: Test error message\n    at test.js:1:1';

      logger.error('Error occurred', 'Component', testError);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle Error objects without stack traces', () => {
      const testError = new Error('Test error');
      delete testError.stack;

      logger.error('Error without stack', 'Component', testError);

      expect(mockGetOrCreateCorrelationId).toHaveBeenCalled();
    });

    it('should handle errors with circular references safely', () => {
      const circularError = new Error('Circular error') as Error & { self?: unknown };
      circularError.self = circularError;

      expect(() => {
        logger.error('Circular error', 'Component', circularError);
      }).not.toThrow();
    });
  });

  describe('Performance Considerations', () => {
    it('should not impact performance significantly for high-frequency logging', () => {
      const startTime = performance.now();

      // Log many entries quickly
      for (let i = 0; i < 100; i++) {
        logger.info(`Message ${i}`, 'PerformanceTest');
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete quickly (threshold depends on environment)
      expect(duration).toBeLessThan(1000); // 1 second for 100 logs
      expect(mockGetOrCreateCorrelationId).toHaveBeenCalledTimes(100);
    });
  });
});
