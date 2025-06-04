/**
 * Core logger service with Pino integration and environment configuration
 *
 * Implements structured logging following DEVELOPMENT_PHILOSOPHY.md requirements
 * with automatic correlation ID inclusion and environment-specific formatting.
 */

import pino from 'pino';
import { getOrCreateCorrelationId } from './correlation';
import type { LogEntry, LogLevel, LogContext, ErrorDetails } from './types';

/**
 * Core logger service implementing structured logging with Pino
 *
 * Features:
 * - Environment-specific configuration (development vs production)
 * - Automatic correlation ID inclusion
 * - Type-safe logging methods
 * - Structured log entry format
 * - Error object processing
 */
export class LoggerService {
  private pino: pino.Logger;
  private readonly serviceName = 'bitcoin-price-tag-splash';

  constructor() {
    this.pino = this.createPinoInstance();
  }

  /**
   * Creates and configures Pino instance based on environment
   */
  private createPinoInstance(): pino.Logger {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

    const config: pino.LoggerOptions = {
      level: logLevel,
      browser: {
        asObject: !isDevelopment, // Pretty print in development, JSON in production
      },
    };

    // In production, configure transmit for external logging service
    if (!isDevelopment) {
      config.browser = {
        ...config.browser,
        transmit: {
          level: 'error',
          send: this.sendToLoggingService.bind(this),
        },
      };
    }

    return pino(config);
  }

  /**
   * Builds a complete LogEntry object with all mandatory metadata
   *
   * @param level - Log level
   * @param message - Log message
   * @param componentName - Name of component generating the log
   * @param context - Optional additional context
   * @returns Complete LogEntry object
   */
  private buildLogEntry(
    level: LogLevel,
    message: string,
    componentName: string,
    context?: LogContext
  ): LogEntry {
    let correlationId: string;

    try {
      correlationId = getOrCreateCorrelationId();
    } catch (error) {
      // Fallback if correlation service fails
      correlationId = 'unknown';
    }

    const baseEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service_name: this.serviceName,
      correlation_id: correlationId,
      component_name: componentName,
    };

    // Merge optional context if provided
    if (context) {
      return {
        ...baseEntry,
        ...context,
      };
    }

    return baseEntry;
  }

  /**
   * Processes error objects into ErrorDetails structure
   *
   * @param error - Error object, string, or unknown value
   * @returns ErrorDetails object or undefined
   */
  private processErrorDetails(error: unknown): ErrorDetails | undefined {
    if (!error) {
      return undefined;
    }

    // Handle Error objects
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    // Handle string errors
    if (typeof error === 'string') {
      return {
        name: 'StringError',
        message: error,
      };
    }

    // Handle other types of errors
    if (typeof error === 'object') {
      try {
        return {
          name: 'UnknownError',
          message: JSON.stringify(error),
        };
      } catch {
        // Handle circular references or non-serializable objects
        return {
          name: 'UnknownError',
          message: String(error),
        };
      }
    }

    // Fallback for primitive types
    return {
      name: 'UnknownError',
      message: String(error),
    };
  }

  /**
   * Log an error message with optional error details
   *
   * @param message - Error message
   * @param componentName - Component name where error occurred
   * @param error - Optional error object for additional details
   * @param context - Optional additional context
   */
  error(message: string, componentName: string, error?: unknown, context?: LogContext): void {
    const errorDetails = this.processErrorDetails(error);

    const logEntry = this.buildLogEntry('error', message, componentName, {
      ...context,
      ...(errorDetails && { error_details: errorDetails }),
    });

    this.pino.error(logEntry);
  }

  /**
   * Log a warning message
   *
   * @param message - Warning message
   * @param componentName - Component name generating the warning
   * @param context - Optional additional context
   */
  warn(message: string, componentName: string, context?: LogContext): void {
    const logEntry = this.buildLogEntry('warn', message, componentName, context);
    this.pino.warn(logEntry);
  }

  /**
   * Log an informational message
   *
   * @param message - Info message
   * @param componentName - Component name generating the log
   * @param context - Optional additional context
   */
  info(message: string, componentName: string, context?: LogContext): void {
    const logEntry = this.buildLogEntry('info', message, componentName, context);
    this.pino.info(logEntry);
  }

  /**
   * Log a debug message
   *
   * @param message - Debug message
   * @param componentName - Component name generating the log
   * @param context - Optional additional context
   */
  debug(message: string, componentName: string, context?: LogContext): void {
    const logEntry = this.buildLogEntry('debug', message, componentName, context);
    this.pino.debug(logEntry);
  }

  /**
   * Placeholder method for future external logging service integration
   *
   * @param _level - Log level (unused in placeholder)
   * @param _logEvent - Complete log event object (unused in placeholder)
   */
  private sendToLoggingService(_level: string, _logEvent: unknown): void {
    // Placeholder for future implementation
    // This could send logs to external services like LogRocket, Sentry, etc.
    // For now, this is a no-op to satisfy Pino's transmit configuration
    // Future implementation might look like:
    // await fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ level: _level, ...(_logEvent as Record<string, unknown>) })
    // });
  }
}

/**
 * Singleton logger instance for application-wide use
 */
export const logger = new LoggerService();
