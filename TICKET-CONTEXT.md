# Plan Details

# Implementation Plan: Foundational Structured Logging (Issue #9)

## Executive Summary

Implement a comprehensive structured logging system for client-side events to replace basic console.log usage and establish a foundation for observability. This plan follows DEVELOPMENT_PHILOSOPHY.md logging strategy principles and provides a scalable solution for future logging needs.

## 1. Technical Analysis

### Current State

- **Minimal logging**: Only one `console.warn` in `components/ui/Icon.tsx:48`
- **No structured logging**: Basic console methods without context or structure
- **Missing observability**: No correlation IDs, timestamps, or contextual metadata
- **Development vs Production**: No environment-specific logging configuration

### Technology Stack Context

- **Framework**: Next.js 15.3.2 with React 19 (client-side + SSR)
- **Language**: TypeScript 5 with strict configuration
- **Package Manager**: pnpm (enforced via preinstall script)
- **Architecture**: Component-based with UI components and page sections

## 2. Selected Technology: Pino

### Rationale

- **Performance**: 5x faster than alternatives, low memory footprint
- **Structured Output**: JSON format aligning with DEVELOPMENT_PHILOSOPHY.md requirements
- **Isomorphic**: Works in both browser and Node.js environments
- **Production Ready**: Supports log levels, transports, and filtering
- **Community**: Well-maintained with strong ecosystem support

### Alternative Considered

- **Loglevel**: Simpler but lacks structured output and metadata support
- **Winston**: Server-only, requires 'fs' module (incompatible with browser)

## 3. Implementation Architecture

### Core Components

```
lib/logging/
├── logger.ts           # Core logger service with environment configuration
├── types.ts           # TypeScript interfaces for log entries and metadata
├── correlation.ts     # Correlation ID generation and context propagation
└── __tests__/         # Unit tests for logging functionality
    ├── logger.test.ts
    ├── correlation.test.ts
    └── integration.test.ts
```

### Logger Service Design

#### 3.1 Log Levels (Standard)

- **ERROR**: Component failures, unhandled errors, invalid states
- **WARN**: Recoverable issues, deprecated usage, fallback scenarios
- **INFO**: Key user interactions, component lifecycle events
- **DEBUG**: Detailed diagnostic information (development only)

#### 3.2 Mandatory Metadata (Per DEVELOPMENT_PHILOSOPHY.md)

```typescript
interface LogEntry {
  timestamp: string; // ISO 8601 UTC
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  service_name: string; // 'bitcoin-price-tag-splash'
  correlation_id: string; // UUID v4
  component_name: string; // Component or module name
  event_type?: string; // 'user_interaction' | 'component_error' | 'state_change'
  context?: Record<string, unknown>; // Additional contextual data
  error_details?: {
    // For ERROR level only
    name: string;
    message: string;
    stack?: string;
  };
}
```

#### 3.3 Environment Configuration

- **Development**: Pretty-printed logs with colors for console readability
- **Production**: Minified JSON for log aggregation systems
- **Log Level**: Configurable via environment variables (default: INFO in production, DEBUG in development)

## 4. Implementation Plan

### Phase 1: Foundation (Day 1)

**Priority**: High | **Effort**: 4 hours

#### Tasks:

1. **Install Dependencies**

   ```bash
   pnpm add pino
   pnpm add -D @types/uuid uuid
   ```

2. **Create Core Logger Service** (`lib/logging/logger.ts`)

   - Environment detection (development vs production)
   - Pino configuration with appropriate output formatting
   - Log level configuration via environment variables
   - Core logging methods (error, warn, info, debug)

3. **Create Type Definitions** (`lib/logging/types.ts`)

   - LogEntry interface with all mandatory metadata
   - LogLevel enum
   - LogContext type for additional contextual data

4. **Create Correlation ID Service** (`lib/logging/correlation.ts`)

   - UUID v4 generation for correlation IDs
   - Context propagation mechanism (using React Context or global state)
   - Session-based correlation ID management

5. **Environment Configuration**
   - Add `NEXT_PUBLIC_LOG_LEVEL` to environment variables
   - Configure development vs production behavior

### Phase 2: Integration & Testing (Day 2)

**Priority**: High | **Effort**: 6 hours

#### Tasks:

1. **Comprehensive Unit Tests**

   - Logger service functionality
   - Correlation ID generation and propagation
   - Environment configuration behavior
   - Log level filtering
   - Metadata inclusion verification

2. **Replace Existing Console Usage**

   - Update `components/ui/Icon.tsx:48` to use structured logger
   - Add component-level error boundary logging
   - Implement logging for icon loading failures

3. **Integration Testing**

   - End-to-end logging flow verification
   - Browser console output validation in development
   - Production JSON format verification

4. **Documentation**
   - Update `CLAUDE.md` with logging commands and usage
   - Create developer guidelines for when and how to log
   - Document correlation ID propagation patterns

### Phase 3: Proof of Concept Implementation (Day 3)

**Priority**: Medium | **Effort**: 4 hours

#### Tasks:

1. **Implement Key User Interaction Logging**

   - Add logging to hero section interactions (price conversion demo)
   - Log button clicks and user engagement events
   - Track component visibility and scroll interactions

2. **Component Lifecycle Logging**

   - Add logging to critical component mount/unmount cycles
   - Track error boundary activations
   - Log performance-critical component renders

3. **Validation & Optimization**
   - Performance impact assessment
   - Bundle size impact analysis
   - Production logging verification

## 5. Technical Implementation Details

### 5.1 Logger Service Example

```typescript
// lib/logging/logger.ts
import pino from 'pino';
import { generateCorrelationId } from './correlation';
import type { LogEntry, LogContext } from './types';

class LoggerService {
  private pino: pino.Logger;
  private serviceName = 'bitcoin-price-tag-splash';

  constructor() {
    this.pino = pino({
      level:
        process.env.NEXT_PUBLIC_LOG_LEVEL ||
        (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
      browser: {
        asObject: process.env.NODE_ENV === 'production',
        transmit: {
          level: 'error',
          send: this.sendToLoggingService.bind(this),
        },
      },
    });
  }

  private buildLogEntry(
    level: string,
    message: string,
    componentName: string,
    context?: LogContext
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level: level as any,
      message,
      service_name: this.serviceName,
      correlation_id: generateCorrelationId(),
      component_name: componentName,
      ...context,
    };
  }

  error(message: string, componentName: string, error?: Error, context?: LogContext) {
    const logEntry = this.buildLogEntry('error', message, componentName, {
      ...context,
      error_details: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    });
    this.pino.error(logEntry);
  }

  // Similar methods for warn, info, debug...
}
```

### 5.2 Integration Example

```typescript
// components/ui/Icon.tsx (updated)
import { logger } from '@/lib/logging/logger';

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    logger.warn(
      `Icon "${name}" not found in icon registry`,
      'Icon',
      {
        event_type: 'component_error',
        requested_icon: name,
        available_icons: Object.keys(icons),
        fallback_behavior: 'render_null'
      }
    );
    return null;
  }

  return <IconComponent {...props} />;
};
```

## 6. Risk Assessment & Mitigation

### Performance Impact

- **Risk**: Logging overhead in production
- **Mitigation**: Benchmark before/after, use Pino's high-performance design, configure appropriate log levels

### Bundle Size Impact

- **Risk**: Increased client bundle size
- **Mitigation**: Tree-shaking optimization, evaluate pino/browser vs alternatives, measure actual impact

### Development Experience

- **Risk**: Complex setup reducing developer productivity
- **Mitigation**: Simple API design, clear documentation, gradual rollout

### Production Debugging

- **Risk**: Over-logging or under-logging in production
- **Mitigation**: Environment-specific configuration, log level management, monitoring setup

## 7. Success Metrics

### Technical Metrics

- [ ] All existing console.log/warn/error calls replaced with structured logging
- [ ] Correlation IDs present in 100% of log entries
- [ ] Log format complies with DEVELOPMENT_PHILOSOPHY.md requirements
- [ ] Bundle size increase < 50KB after tree-shaking
- [ ] Zero performance regression in component rendering

### Functional Metrics

- [ ] Icon component errors properly logged with context
- [ ] User interaction events tracked in at least one component
- [ ] Development environment shows readable formatted logs
- [ ] Production environment outputs valid JSON logs
- [ ] Error boundaries capture and log component failures

## 8. Future Enhancements (Post-Implementation)

1. **Log Aggregation**: Integration with external logging services (LogRocket, Sentry)
2. **Real User Monitoring**: User session tracking and behavior analytics
3. **Performance Monitoring**: Component render timing and optimization insights
4. **Error Reporting**: Automated error notification and alerting
5. **A/B Testing Integration**: Event logging for feature flag and experiment tracking

## 9. Dependencies

**External Dependencies:**

- `pino`: Core logging library
- `uuid`: Correlation ID generation
- `@types/uuid`: TypeScript definitions

**Internal Dependencies:**

- None identified - this is a foundational implementation

**Compatibility:**

- Next.js 15.3.2 ✅
- React 19 ✅
- TypeScript 5 ✅
- Browser environments ✅
- SSR/SSG ✅

## 10. Acceptance Criteria Verification

- [x] **Research Complete**: Pino selected as optimal logging library
- [x] **Architecture Defined**: Comprehensive technical design with types, services, and integration patterns
- [x] **Implementation Plan**: Detailed 3-phase approach with time estimates
- [x] **Testing Strategy**: Unit, integration, and end-to-end test coverage
- [x] **Documentation Plan**: Developer guidelines and usage documentation
- [x] **Risk Assessment**: Performance, bundle size, and development experience considerations

---

**Estimated Total Effort**: 14 hours across 3 days
**Implementation Priority**: High (foundational capability)
**Technical Complexity**: Medium (well-defined scope with clear requirements)

## Task Breakdown Requirements

- Create atomic, independent tasks
- Ensure proper dependency mapping
- Include verification steps
- Follow project task ID and formatting conventions
