# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bitcoin Price Tag splash page built with Next.js, TypeScript, and Tailwind CSS following Swiss minimalism design principles. The project is structured as a single-page marketing site for a Bitcoin price conversion browser extension.

## Common Commands

```bash
# Development
pnpm dev              # Run development server (includes --turbopack)

# Building and Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint

# Install dependencies (MUST use pnpm only)
pnpm install          # Install dependencies
```

## Architecture

### Design System

The project follows Swiss minimalism with:

- 12-column grid system (24px gutters, max-width 1200px)
- Bitcoin Orange (#F7931A) as primary color
- Inter Variable font for typography
- 8-point spatial system (multiples of 8px)

### Component Structure

```
/components
  /ui                 # Basic UI components (Button, Container, Icon)
  /sections          # Page sections (HeroSection, FeaturesSection, etc.)
  Navigation.tsx     # Fixed navigation component
```

### Section Components

Each section follows a pattern:

- Imports Container for consistent layout
- Uses responsive padding (64px mobile, 120px desktop)
- Centers content appropriately
- Test pages exist in `/app/test-*` directories

### Task Management

The project uses a detailed TODO.md system with:

- Task IDs (T001-T031)
- Dependencies between tasks
- Three states: [ ] unstarted, [~] in progress, [x] complete
- Each task follows the pattern: acquire → classify → plan → implement → validate → finalize

### Key Technical Constraints

- PNPM enforced via preinstall script
- CSS animations only (no JavaScript for animations)
- Semantic HTML required
- Proper ESLint escaping for special characters
- Test pages for each component/section

## Development Workflow

1. Check TODO.md for next unblocked task
2. Update task status to in-progress [~]
3. Create plan file if needed (T###-plan.md)
4. Implement following existing patterns
5. Run linter (`pnpm lint`)
6. Create test page if applicable
7. Commit with conventional commits
8. Update task status to complete [x]
9. Delete plan file

## Important Files

- `TODO.md`: Master task list with dependencies
- `PLAN.md`: Design philosophy and implementation details
- `tailwind.config.ts`: Design system configuration
- `.npmrc`: PNPM enforcement
- `/app/test-*/page.tsx`: Component test pages

## Structured Logging

The project implements comprehensive structured logging using Pino with automatic correlation ID tracking following DEVELOPMENT_PHILOSOPHY.md requirements.

### Basic Usage

```typescript
import { logger } from '@/lib/logging/logger';

// Basic logging methods
logger.error('Something went wrong', 'ComponentName', error, { event_type: 'validation_error' });
logger.warn('Deprecated feature used', 'ComponentName', { event_type: 'deprecation_warning' });
logger.info('User action completed', 'ComponentName', {
  event_type: 'user_interaction',
  action: 'button_click',
});
logger.debug('Processing data', 'ComponentName', {
  event_type: 'data_processing',
  items_count: 42,
});
```

### Correlation ID Integration

```typescript
import { CorrelationProvider, useCorrelationId } from '@/lib/logging/correlation';

// Wrap your app with the provider
function MyApp({ Component, pageProps }) {
  return (
    <CorrelationProvider>
      <Component {...pageProps} />
    </CorrelationProvider>
  );
}

// Use correlation ID in components
function MyComponent() {
  const correlationId = useCorrelationId();

  const handleAction = () => {
    logger.info('Action triggered', 'MyComponent', {
      event_type: 'user_interaction',
      correlation_id_from_hook: correlationId,
      action_details: { button: 'submit' }
    });
  };
}
```

### Environment Configuration

Set log levels via environment variables:

```bash
# Development (shows all logs)
NEXT_PUBLIC_LOG_LEVEL=debug

# Production (shows info and above)
NEXT_PUBLIC_LOG_LEVEL=info

# Warnings and errors only
NEXT_PUBLIC_LOG_LEVEL=warn

# Errors only
NEXT_PUBLIC_LOG_LEVEL=error
```

### Log Entry Structure

All logs include mandatory metadata fields:

```typescript
{
  timestamp: "2024-01-01T12:00:00.000Z",
  level: "info",
  message: "User action completed",
  service_name: "bitcoin-price-tag-splash",
  correlation_id: "uuid-v4-string",
  component_name: "ComponentName",
  event_type: "user_interaction",
  // ... custom context fields
}
```

### Error Logging with Details

```typescript
try {
  // risky operation
} catch (error) {
  logger.error('Operation failed', 'ComponentName', error, {
    event_type: 'operation_error',
    operation: 'data_fetch',
    retry_count: 3,
  });
}
```

### Development vs Production Output

- **Development**: Pretty-printed, colorized console output for easy debugging
- **Production**: Minified JSON format suitable for log aggregation services

### Testing Commands

```bash
# Run all tests including logging integration tests
pnpm test

# Run specific logging tests
pnpm test lib/logging

# Run integration tests
pnpm test lib/logging/__tests__/integration.test.tsx
```

## Testing Approach

Components have individual test pages (e.g., `/test-button`, `/test-hero-section`) for visual verification during development. Comprehensive automated test suite includes unit tests, integration tests, and accessibility tests.
