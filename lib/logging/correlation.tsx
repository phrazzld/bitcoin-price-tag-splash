'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a new UUID v4 correlation ID
 * @returns A unique UUID v4 string
 */
export function generateCorrelationId(): string {
  return uuidv4();
}

/**
 * Context value containing the correlation ID
 */
interface CorrelationContextValue {
  correlationId: string;
}

/**
 * React Context for correlation ID propagation
 */
const CorrelationContext = createContext<CorrelationContextValue | undefined>(undefined);

/**
 * Storage key for correlation ID in sessionStorage
 */
const CORRELATION_ID_KEY = 'correlationId';

/**
 * Singleton correlation ID for non-React contexts
 */
let singletonCorrelationId: string | null = null;

/**
 * Safely gets a value from sessionStorage
 * @param key The storage key
 * @returns The stored value or null if not available or on error
 */
function safeGetSessionStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(key);
    }
  } catch (error) {
    // Silently handle storage errors (SSR, privacy mode, etc.)
    console.warn('Failed to access sessionStorage:', error);
  }
  return null;
}

/**
 * Safely sets a value in sessionStorage
 * @param key The storage key
 * @param value The value to store
 */
function safeSetSessionStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, value);
    }
  } catch (error) {
    // Silently handle storage errors (SSR, privacy mode, etc.)
    console.warn('Failed to write to sessionStorage:', error);
  }
}

/**
 * Gets or creates a correlation ID for the session
 * @returns The session correlation ID
 */
function getSessionCorrelationId(): string {
  // Try to get existing ID from sessionStorage
  const existingId = safeGetSessionStorage(CORRELATION_ID_KEY);
  if (existingId) {
    return existingId;
  }

  // Generate new ID and store it
  const newId = generateCorrelationId();
  safeSetSessionStorage(CORRELATION_ID_KEY, newId);
  return newId;
}

/**
 * Props for the CorrelationProvider component
 */
interface CorrelationProviderProps {
  children: ReactNode;
}

/**
 * React Context Provider for correlation ID management
 *
 * Provides a correlation ID that persists across the user session.
 * The ID is stored in sessionStorage and shared through React Context.
 *
 * @param props Component props
 * @returns JSX Element providing correlation context
 */
export function CorrelationProvider({ children }: CorrelationProviderProps): React.ReactElement {
  const [correlationId, setCorrelationId] = useState<string>(() => {
    // Initialize with a new ID (handles SSR)
    return generateCorrelationId();
  });

  useEffect(() => {
    // On client-side mount, check for existing session ID
    const sessionId = getSessionCorrelationId();
    setCorrelationId(sessionId);

    // Update singleton for non-React contexts
    singletonCorrelationId = sessionId;
  }, []);

  const contextValue: CorrelationContextValue = {
    correlationId,
  };

  return <CorrelationContext.Provider value={contextValue}>{children}</CorrelationContext.Provider>;
}

/**
 * Custom hook to access the correlation ID
 *
 * @returns The current correlation ID
 * @throws Error if used outside of CorrelationProvider
 */
export function useCorrelationId(): string {
  const context = useContext(CorrelationContext);

  if (context === undefined) {
    throw new Error('useCorrelationId must be used within CorrelationProvider');
  }

  return context.correlationId;
}

/**
 * Gets or creates a correlation ID for use outside of React components
 *
 * This function provides access to the correlation ID in contexts where
 * React hooks cannot be used (e.g., utility functions, service workers).
 *
 * @returns The correlation ID
 */
export function getOrCreateCorrelationId(): string {
  // If we have a singleton from React context, use it
  if (singletonCorrelationId) {
    return singletonCorrelationId;
  }

  // Otherwise, try to get from sessionStorage or create new one
  const sessionId = getSessionCorrelationId();
  singletonCorrelationId = sessionId;
  return sessionId;
}
