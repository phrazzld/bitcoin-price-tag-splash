# Logging Guidelines

This document provides comprehensive guidelines for using structured logging throughout the Bitcoin Price Tag splash page project.

## Overview

The project implements structured logging using Pino with automatic correlation ID tracking to provide observability into application behavior, user interactions, and system events.

## When to Use Each Log Level

### ERROR - Level 50 (Always Shown)

Use for events that indicate a failure or exception that affects functionality:

```typescript
// ✅ Good examples
logger.error('Payment processing failed', 'CheckoutComponent', error, {
  event_type: 'payment_error',
  user_id: '123',
  amount: 100,
  payment_method: 'card',
});

logger.error('API request failed after retries', 'DataService', error, {
  event_type: 'api_error',
  endpoint: '/api/bitcoin-price',
  retry_count: 3,
  status_code: 500,
});

// ❌ Avoid - not actual errors
logger.error('User entered invalid email', 'FormComponent'); // Use WARN instead
logger.error('Feature flag disabled', 'FeatureComponent'); // Use INFO instead
```

### WARN - Level 40

Use for potentially problematic situations that don't break functionality:

```typescript
// ✅ Good examples
logger.warn('Deprecated API endpoint used', 'LegacyService', {
  event_type: 'deprecation_warning',
  endpoint: '/api/v1/price',
  migration_deadline: '2024-12-31',
});

logger.warn('High memory usage detected', 'PerformanceMonitor', {
  event_type: 'performance_warning',
  memory_usage_mb: 512,
  threshold_mb: 400,
});

logger.warn('Rate limit approaching', 'ApiClient', {
  event_type: 'rate_limit_warning',
  current_requests: 950,
  limit: 1000,
  window: '1hour',
});

// ❌ Avoid - not warnings
logger.warn('User clicked button', 'ButtonComponent'); // Use INFO instead
logger.warn('Data loaded successfully', 'DataService'); // Use DEBUG instead
```

### INFO - Level 30

Use for significant business events and user interactions:

```typescript
// ✅ Good examples
logger.info('User completed Bitcoin conversion', 'HeroSection', {
  event_type: 'user_interaction',
  interaction_type: 'conversion_completed',
  from_currency: 'USD',
  to_currency: 'BTC',
  amount: 100,
});

logger.info('Page view recorded', 'Navigation', {
  event_type: 'page_view',
  page: '/hero',
  user_agent: navigator.userAgent,
  referrer: document.referrer,
});

logger.info('Feature enabled for user', 'FeatureToggle', {
  event_type: 'feature_activation',
  feature_name: 'advanced_calculator',
  user_segment: 'premium',
});

// ❌ Avoid - too verbose for INFO
logger.info('Rendering component', 'Component'); // Use DEBUG instead
logger.info('Function entered', 'utils'); // Use DEBUG instead
```

### DEBUG - Level 20 (Development Only)

Use for detailed diagnostic information during development:

```typescript
// ✅ Good examples
logger.debug('Component lifecycle event', 'HeroSection', {
  event_type: 'component_lifecycle',
  lifecycle_stage: 'mount',
  props_count: Object.keys(props).length,
});

logger.debug('Cache operation completed', 'CacheService', {
  event_type: 'cache_operation',
  operation: 'set',
  key: 'bitcoin_price_cache',
  ttl_seconds: 300,
});

logger.debug('Animation frame rendered', 'AnimatedBackground', {
  event_type: 'animation_frame',
  frame_number: 42,
  fps: 60,
});
```

## Required Metadata Fields

All log entries MUST include these fields:

### Mandatory Fields (Automatically Included)

- `timestamp`: ISO 8601 timestamp
- `level`: Log level string
- `message`: Human-readable description
- `service_name`: Always "bitcoin-price-tag-splash"
- `correlation_id`: UUID v4 for request tracing
- `component_name`: Name of the component/service generating the log

### Required Context Fields

Always include `event_type` to categorize the log:

```typescript
// Event type categories
event_type: 'user_interaction'; // User actions (clicks, form submissions)
event_type: 'component_lifecycle'; // React component mount/unmount
event_type: 'api_request'; // External API calls
event_type: 'validation_error'; // Input validation failures
event_type: 'performance_metric'; // Performance measurements
event_type: 'feature_toggle'; // Feature flag changes
event_type: 'data_processing'; // Data transformation/calculation
```

## Best Practices

### 1. Use Structured Context

✅ **Good**: Structured, searchable data

```typescript
logger.info('Price conversion completed', 'Calculator', {
  event_type: 'user_interaction',
  from_currency: 'USD',
  to_currency: 'BTC',
  amount_usd: 1000,
  amount_btc: 0.025,
  exchange_rate: 40000,
  calculation_time_ms: 15,
});
```

❌ **Avoid**: Unstructured messages

```typescript
logger.info('User converted $1000 to 0.025 BTC at rate 40000', 'Calculator');
```

### 2. Include Correlation ID from React Context

```typescript
import { useCorrelationId } from '@/lib/logging/correlation';

function MyComponent() {
  const correlationId = useCorrelationId();

  const handleAction = () => {
    logger.info('Action completed', 'MyComponent', {
      event_type: 'user_interaction',
      correlation_id_from_hook: correlationId, // Include this for verification
      action_type: 'button_click',
    });
  };
}
```

### 3. Error Logging with Details

Always pass Error objects to capture stack traces:

```typescript
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', 'ComponentName', error, {
    event_type: 'operation_error',
    operation: 'data_fetch',
    retry_count: 3,
    timeout_ms: 5000,
  });
  // Handle error appropriately
}
```

### 4. Performance Logging

Track performance-critical operations:

```typescript
const startTime = performance.now();
const result = await heavyOperation();
const duration = performance.now() - startTime;

logger.info('Heavy operation completed', 'DataProcessor', {
  event_type: 'performance_metric',
  operation: 'bitcoin_price_calculation',
  duration_ms: Math.round(duration),
  records_processed: result.length,
});
```

## Anti-Patterns to Avoid

### ❌ Don't Log Sensitive Information

```typescript
// NEVER do this
logger.info('User login', 'Auth', {
  username: 'john@example.com', // PII
  password: 'secret123', // Sensitive data
  api_key: 'sk_live_...', // Secret keys
});

// ✅ Do this instead
logger.info('User login attempt', 'Auth', {
  event_type: 'user_authentication',
  user_id_hash: hashUserId(user.id), // Hashed identifier
  login_method: 'email_password',
  success: true,
});
```

### ❌ Don't Use Logs for Control Flow

```typescript
// NEVER do this
logger.info('Checking if user is admin', 'Auth');
if (user.isAdmin) {
  logger.info('User is admin, proceeding', 'Auth');
  return true;
} else {
  logger.info('User is not admin, blocking', 'Auth');
  return false;
}

// ✅ Do this instead
const result = checkAdminStatus(user);
logger.debug('Admin check completed', 'Auth', {
  event_type: 'authorization_check',
  is_admin: result,
  check_duration_ms: checkDuration,
});
return result;
```

### ❌ Don't Log Every Function Call

```typescript
// NEVER do this
function calculatePrice(amount: number) {
  logger.debug('Entering calculatePrice', 'Calculator');
  logger.debug('Amount parameter', 'Calculator', { amount });
  const result = amount * exchangeRate;
  logger.debug('Calculation result', 'Calculator', { result });
  logger.debug('Exiting calculatePrice', 'Calculator');
  return result;
}

// ✅ Do this instead
function calculatePrice(amount: number) {
  const result = amount * exchangeRate;
  logger.debug('Price calculation completed', 'Calculator', {
    event_type: 'price_calculation',
    input_amount: amount,
    exchange_rate: exchangeRate,
    result_amount: result,
  });
  return result;
}
```

## Correlation ID Patterns

### React Components

Always use the correlation ID hook in React components:

```typescript
import { useCorrelationId } from '@/lib/logging/correlation';

function Component() {
  const correlationId = useCorrelationId();

  useEffect(() => {
    logger.debug('Component mounted', 'Component', {
      event_type: 'component_lifecycle',
      correlation_id_from_hook: correlationId,
    });
  }, [correlationId]);
}
```

### Non-React Contexts

The logger automatically includes correlation ID from sessionStorage:

```typescript
// In utilities, services, etc.
export function utilityFunction(data: any) {
  logger.info('Utility operation', 'UtilityService', {
    event_type: 'data_processing',
    operation: 'transform',
    record_count: data.length,
  });
  // correlation_id is automatically included
}
```

### Cross-Component Tracking

Use the same correlation ID to track user journeys:

```typescript
// Component A
const correlationId = useCorrelationId();
logger.info('User started flow', 'ComponentA', {
  event_type: 'user_interaction',
  flow: 'price_conversion',
  correlation_id_from_hook: correlationId,
});

// Component B (same session)
const correlationId = useCorrelationId(); // Same ID
logger.info('User completed flow', 'ComponentB', {
  event_type: 'user_interaction',
  flow: 'price_conversion',
  correlation_id_from_hook: correlationId,
});
```

## Environment Configuration

### Development Environment

```bash
# .env.local
NEXT_PUBLIC_LOG_LEVEL=debug
```

- Shows all log levels
- Pretty-printed output for readability
- Detailed stack traces
- Performance timing information

### Production Environment

```bash
# Production environment
NEXT_PUBLIC_LOG_LEVEL=info
```

- Shows INFO, WARN, ERROR levels only
- JSON format for log aggregation
- Minimal performance impact
- Ready for external log services

### Log Level Hierarchy

```
ERROR (50) - Always shown, critical failures
WARN  (40) - Important but non-critical issues
INFO  (30) - Significant business events
DEBUG (20) - Detailed diagnostic information
```

## Troubleshooting

### Correlation ID Not Appearing

1. Ensure CorrelationProvider wraps your app:

```typescript
// app/layout.tsx
import { CorrelationProvider } from '@/lib/logging/correlation';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CorrelationProvider>
          {children}
        </CorrelationProvider>
      </body>
    </html>
  );
}
```

2. Use the hook in components:

```typescript
const correlationId = useCorrelationId();
```

### Logs Not Appearing

1. Check log level configuration:

```typescript
// Check current environment
console.log(process.env.NODE_ENV);
console.log(process.env.NEXT_PUBLIC_LOG_LEVEL);
```

2. Verify logger import:

```typescript
import { logger } from '@/lib/logging/logger';
```

### Performance Impact

1. Use appropriate log levels:

   - Avoid DEBUG logs in production
   - Use INFO sparingly for high-frequency events
   - Cache expensive calculations before logging

2. Measure logging overhead:

```typescript
const start = performance.now();
logger.info('Operation completed', 'Component', context);
const loggingTime = performance.now() - start;
// Should be < 1ms typically
```

## Testing Logging

### Unit Tests

```typescript
import { logger } from '@/lib/logging/logger';

// Mock logger in tests
jest.mock('@/lib/logging/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Test logging calls
test('should log user interaction', () => {
  component.handleClick();
  expect(logger.info).toHaveBeenCalledWith(
    'Button clicked',
    'Component',
    expect.objectContaining({
      event_type: 'user_interaction',
    })
  );
});
```

### Integration Tests

Use the existing integration test suite:

```bash
# Run logging integration tests
pnpm test lib/logging/__tests__/integration.test.tsx
```

## Conclusion

Following these guidelines ensures consistent, searchable, and useful logging throughout the application. The structured approach enables effective debugging, monitoring, and analytics while maintaining performance and security standards.

For questions or updates to these guidelines, refer to the DEVELOPMENT_PHILOSOPHY.md document or the logging implementation in `lib/logging/`.
