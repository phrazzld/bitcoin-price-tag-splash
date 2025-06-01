/**
 * Structured logging types and interfaces for client-side events.
 *
 * Provides type definitions for log entries, levels, and contextual data
 * following DEVELOPMENT_PHILOSOPHY.md logging strategy requirements.
 */

/**
 * Log level enumeration - specific literal types for type safety
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

/**
 * Additional contextual data that can be included with log entries
 */
export type LogContext = Record<string, unknown>;

/**
 * Error details structure for ERROR level logs
 */
export interface ErrorDetails {
  readonly name: string;
  readonly message: string;
  readonly stack?: string;
}

/**
 * Complete log entry structure with all mandatory metadata fields
 * per DEVELOPMENT_PHILOSOPHY.md logging strategy requirements
 */
export interface LogEntry {
  readonly timestamp: string; // ISO 8601 UTC
  readonly level: LogLevel;
  readonly message: string;
  readonly service_name: string; // 'bitcoin-price-tag-splash'
  readonly correlation_id: string; // UUID v4
  readonly component_name: string; // Component or module name
  readonly event_type?: string; // 'user_interaction' | 'component_error' | 'state_change'
  readonly context?: LogContext; // Additional contextual data
  readonly error_details?: ErrorDetails; // For ERROR level only
}
