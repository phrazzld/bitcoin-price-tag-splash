# Todo

## Logging Foundation

- [x] **T001 · Chore · P0: Install Pino and UUID dependencies for structured logging**

  - **Context:** Phase 1: Foundation - Install Dependencies (PLAN.md)
  - **Action:**
    1. Run `pnpm add pino`
    2. Run `pnpm add -D @types/uuid uuid`
  - **Done‑when:**
    1. `pino`, `@types/uuid`, and `uuid` are listed in `package.json`
    2. `pnpm install` completes without errors
  - **Verification:**
    1. Check `package.json` for correct dependency versions
    2. Verify import statements resolve in TypeScript: `import pino from 'pino'` and `import { v4 as uuidv4 } from 'uuid'`
  - **Depends‑on:** none

- [x] **T002 · Feature · P0: Create structured logging types and interfaces**

  - **Context:** Phase 1: Foundation - Create Type Definitions (PLAN.md Section 3.2)
  - **Action:**
    1. Create `lib/logging/types.ts`
    2. Define `LogEntry` interface with all mandatory metadata fields (timestamp, level, message, service_name, correlation_id, component_name, event_type, context, error_details)
    3. Define `LogLevel` type (`'error' | 'warn' | 'info' | 'debug'`) and `LogContext` type
  - **Done‑when:**
    1. `lib/logging/types.ts` exists and exports all required types
    2. Types compile successfully and match DEVELOPMENT_PHILOSOPHY.md logging strategy requirements
  - **Verification:**
    1. Run `pnpm type-check` to ensure no TypeScript errors
    2. Import and use types in other files to verify compatibility
  - **Depends‑on:** none

- [x] **T003 · Feature · P0: Implement correlation ID service with UUID generation and context propagation**

  - **Context:** Phase 1: Foundation - Create Correlation ID Service (PLAN.md Section 3.2)
  - **Action:**
    1. Create `lib/logging/correlation.ts`
    2. Implement `generateCorrelationId()` using UUID v4
    3. Implement React Context provider and `useCorrelationId` hook for session-based propagation
    4. Ensure correlation ID persists across component tree and async operations
  - **Done‑when:**
    1. `correlation.ts` exports correlation ID generation and React Context utilities
    2. Correlation IDs are unique per session and accessible throughout component tree
    3. Context provider can be wrapped around app root
  - **Verification:**
    1. Generate multiple correlation IDs and verify uniqueness and valid UUID v4 format
    2. Test context propagation in nested React components
    3. Verify same correlation ID is maintained within a session
  - **Depends‑on:** T001

- [x] **T004 · Feature · P0: Create core logger service with Pino integration and environment configuration**

  - **Context:** Phase 1: Foundation - Create Core Logger Service (PLAN.md Section 5.1)
  - **Action:**
    1. Create `lib/logging/logger.ts` implementing `LoggerService` class per PLAN.md design
    2. Configure Pino for development (pretty-print, colors) and production (minified JSON) based on `NODE_ENV`
    3. Implement core logging methods (`error`, `warn`, `info`, `debug`) that construct `LogEntry` objects using `buildLogEntry`
    4. Integrate correlation ID service for automatic correlation_id inclusion
    5. Implement placeholder `sendToLoggingService` method for future external log transmission
  - **Done‑when:**
    1. `LoggerService` class is implemented and exports a singleton instance
    2. All logging methods produce structured logs with mandatory metadata (timestamp, level, message, service_name, correlation_id, component_name)
    3. Output format correctly switches between development (pretty) and production (JSON)
    4. Log level filtering works based on environment configuration
  - **Verification:**
    1. Manually invoke logger methods in development mode and verify pretty-printed console output
    2. Set `NODE_ENV=production`, run application, and verify minified JSON output
    3. Test all log levels and verify proper metadata inclusion
  - **Depends‑on:** T001, T002, T003

- [ ] **T005 · Chore · P1: Configure NEXT_PUBLIC_LOG_LEVEL environment variable**
  - **Context:** Phase 1: Foundation - Environment Configuration (PLAN.md Section 3.3)
  - **Action:**
    1. Add `NEXT_PUBLIC_LOG_LEVEL` to `.env.local`, `.env.example`, and document in README
    2. Configure `LoggerService` to read this variable for log level, with defaults: 'debug' in development, 'info' in production
    3. Support standard log levels: 'error', 'warn', 'info', 'debug'
  - **Done‑when:**
    1. Environment variable is documented and `LoggerService` respects it for setting Pino's active log level
    2. Default log levels are applied correctly when variable is not set
    3. Log level filtering works dynamically based on environment variable
  - **Verification:**
    1. Set `NEXT_PUBLIC_LOG_LEVEL=warn` and verify `info`/`debug` logs are suppressed
    2. Remove variable and verify defaults apply correctly per environment
  - **Depends‑on:** T004

## Testing & Integration

- [ ] **T006 · Test · P1: Implement comprehensive unit tests for logger service**

  - **Context:** Phase 2: Integration & Testing - Comprehensive Unit Tests (PLAN.md)
  - **Action:**
    1. Create `lib/logging/__tests__/logger.test.ts`
    2. Test core logging methods for correct `LogEntry` structure and metadata inclusion
    3. Test environment-specific output formatting (mocking `NODE_ENV`)
    4. Test log level filtering based on `NEXT_PUBLIC_LOG_LEVEL`
    5. Test error logging with `error_details` structure for Error objects
  - **Done‑when:**
    1. Unit tests for `logger.ts` are implemented and all pass
    2. Test coverage meets project standards (>95% for core logging functionality)
    3. All edge cases and error conditions are covered
  - **Verification:**
    1. Run `pnpm test` and verify all tests pass
    2. Check test coverage report to ensure adequate coverage
  - **Depends‑on:** T004, T005

- [ ] **T007 · Test · P1: Implement unit tests for correlation ID service**

  - **Context:** Phase 2: Integration & Testing - Comprehensive Unit Tests (PLAN.md)
  - **Action:**
    1. Create `lib/logging/__tests__/correlation.test.ts`
    2. Test UUID v4 generation for format correctness and uniqueness
    3. Test React Context provider and `useCorrelationId` hook behavior
    4. Test session persistence and propagation scenarios
  - **Done‑when:**
    1. Unit tests for `correlation.ts` are implemented and all pass
    2. Test coverage for correlation service meets project standards
    3. Context propagation behavior is thoroughly tested
  - **Verification:**
    1. Run correlation ID tests and verify UUID format validation
    2. Test React Context behavior in isolated test environment
  - **Depends‑on:** T003

- [ ] **T008 · Refactor · P1: Replace console.warn in Icon.tsx with structured logger**

  - **Context:** Phase 2: Integration & Testing - Replace Existing Console Usage (PLAN.md Section 5.2)
  - **Action:**
    1. Import logger from `lib/logging/logger.ts` in `components/ui/Icon.tsx`
    2. Replace `console.warn` at line 48 with `logger.warn` call
    3. Include structured context: `component_name: 'Icon'`, `event_type: 'component_error'`, `requested_icon`, `available_icons`, `fallback_behavior: 'render_null'`
    4. Ensure correlation ID is automatically included via logger service
  - **Done‑when:**
    1. `console.warn` is completely removed from `Icon.tsx`
    2. Missing icon scenario generates structured warning log with all required metadata
    3. Component continues to function correctly (returns null for missing icons)
  - **Verification:**
    1. Manually trigger "icon not found" scenario by requesting non-existent icon
    2. Verify structured log output appears in browser console with expected format and metadata
    3. Confirm component still renders correctly and handles missing icons gracefully
  - **Depends‑on:** T004

- [ ] **T009 · Feature · P1: Implement React Error Boundary with structured logging**

  - **Context:** Phase 2: Integration & Testing - Add component-level error boundary logging (PLAN.md)
  - **Action:**
    1. Create `components/ErrorBoundary.tsx` implementing React Error Boundary pattern
    2. Integrate structured logger in `componentDidCatch` method
    3. Log errors with `logger.error` including `component_name`, `error_details` (name, message, stack), and correlation ID
    4. Provide graceful fallback UI for users
  - **Done‑when:**
    1. Error Boundary component catches React errors and logs them via structured logger
    2. Error logs include full stack trace and component context
    3. Users see appropriate fallback UI instead of blank screen
  - **Verification:**
    1. Create test component that intentionally throws error
    2. Wrap with Error Boundary and trigger error
    3. Verify structured error log appears with all required error details
  - **Depends‑on:** T004

- [ ] **T010 · Test · P1: Create integration tests for end-to-end logging flow**
  - **Context:** Phase 2: Integration & Testing - Integration Testing (PLAN.md)
  - **Action:**
    1. Create `lib/logging/__tests__/integration.test.ts`
    2. Test complete logging flow from trigger to console output
    3. Verify browser console output in development environment simulation
    4. Verify production JSON format output
    5. Test correlation ID propagation through React component tree
  - **Done‑when:**
    1. Integration tests verify logging flow and output format correctness
    2. All metadata fields are present and correctly formatted
    3. Development and production output formats are validated
  - **Verification:**
    1. Run integration tests and verify they demonstrate complete logging workflow
    2. Mock different environments and verify appropriate output formats
  - **Depends‑on:** T004, T008

## Documentation & Guidelines

- [ ] **T011 · Chore · P1: Update CLAUDE.md with logging usage and commands**

  - **Context:** Phase 2: Integration & Testing - Documentation (PLAN.md)
  - **Action:**
    1. Add comprehensive logging section to `CLAUDE.md`
    2. Document import statements and usage examples for each log level
    3. Provide examples of structured logging with metadata
    4. Document environment variable configuration
    5. Include correlation ID usage patterns
  - **Done‑when:**
    1. `CLAUDE.md` contains clear, runnable examples for all logging functionality
    2. Documentation covers both development and production usage
    3. Examples demonstrate proper metadata inclusion
  - **Verification:**
    1. Review documentation for completeness and accuracy
    2. Test provided examples to ensure they work as documented
  - **Depends‑on:** T004, T008

- [ ] **T012 · Chore · P2: Create comprehensive developer logging guidelines**
  - **Context:** Phase 2: Integration & Testing - Developer guidelines (PLAN.md)
  - **Action:**
    1. Create `docs/logging-guidelines.md`
    2. Outline log level semantics (when to use ERROR vs WARN vs INFO vs DEBUG)
    3. Document required metadata fields and best practices
    4. Provide anti-patterns and common mistakes to avoid
    5. Include correlation ID propagation patterns and troubleshooting
  - **Done‑when:**
    1. Comprehensive guidelines document exists covering all logging requirements
    2. Guidelines align with DEVELOPMENT_PHILOSOPHY.md logging strategy
    3. Document provides clear decision framework for developers
  - **Verification:**
    1. Peer review guidelines for clarity and completeness
    2. Ensure guidelines are actionable and follow project standards
  - **Depends‑on:** T004, T011

## Proof of Concept Implementation

- [ ] **T013 · Feature · P2: Implement key user interaction logging in hero section**

  - **Context:** Phase 3: Proof of Concept - Implement Key User Interaction Logging (PLAN.md)
  - **Action:**
    1. Identify key interactions in hero section (button clicks, price conversion demo, scroll events)
    2. Add `logger.info` calls for user engagement events
    3. Include structured context: `event_type: 'user_interaction'`, `interaction_type`, `component_name`, relevant data
    4. Track component visibility and scroll-based interactions
  - **Done‑when:**
    1. Key user interactions in hero section generate structured INFO logs
    2. All interactions include proper correlation ID and contextual metadata
    3. No performance impact on user experience
  - **Verification:**
    1. Manually perform interactions in hero section
    2. Verify logs appear in browser console with expected structure and timing
    3. Confirm no negative impact on component responsiveness
  - **Depends‑on:** T004

- [ ] **T014 · Feature · P2: Add component lifecycle logging for critical components**
  - **Context:** Phase 3: Proof of Concept - Component Lifecycle Logging (PLAN.md)
  - **Action:**
    1. Add logging to critical component mount/unmount cycles using `useEffect`
    2. Log error boundary activations via Error Boundary component
    3. Track performance-critical component renders with timing data
    4. Use `logger.debug` for lifecycle events (filtered in production)
  - **Done‑when:**
    1. Critical components log mount/unmount events with component context
    2. Error boundary activations are captured with full error details
    3. Performance-critical renders are tracked with timing metadata
  - **Verification:**
    1. Mount/unmount components and verify lifecycle logs appear
    2. Trigger error boundary and verify error logging
    3. Check development console for debug-level lifecycle information
  - **Depends‑on:** T004, T009

## Validation & Optimization

- [ ] **T015 · Test · P2: Perform comprehensive performance impact assessment**

  - **Context:** Phase 3: Proof of Concept - Validation & Optimization (PLAN.md)
  - **Action:**
    1. Benchmark component render times before and after logging implementation
    2. Measure logging method execution overhead in high-frequency scenarios
    3. Profile memory usage impact of log object creation
    4. Test performance with different log levels and production vs development configurations
  - **Done‑when:**
    1. Performance impact assessment report is completed
    2. No measurable regression in critical user interface responsiveness
    3. Logging overhead is <1% of total render time for critical components
  - **Verification:**
    1. Use browser profiling tools to measure before/after performance
    2. Document findings and ensure they meet success criteria from PLAN.md
  - **Depends‑on:** T013, T014

- [ ] **T016 · Test · P2: Analyze bundle size impact and verify production logging**
  - **Context:** Phase 3: Proof of Concept - Validation & Optimization (PLAN.md)
  - **Action:**
    1. Build production bundle before and after logging implementation
    2. Analyze bundle size delta using Next.js bundle analyzer
    3. Verify tree-shaking effectiveness for Pino library
    4. Test production logging output format and functionality
    5. Validate log aggregation compatibility (JSON format)
  - **Done‑when:**
    1. Bundle size increase is documented and <50KB after tree-shaking
    2. Production build outputs valid JSON logs with all mandatory metadata
    3. Tree-shaking eliminates unused Pino features in production build
  - **Verification:**
    1. Run `pnpm build` and compare bundle sizes using Next.js analyzer
    2. Deploy production build and verify JSON log output in browser console
    3. Validate logs can be parsed by standard JSON processors
  - **Depends‑on:** T004, T013

## Success Criteria Validation

- [ ] **T017 · Test · P2: Verify all acceptance criteria from GitHub Issue #9**
  - **Context:** Validate completion against original GitHub Issue #9 requirements
  - **Action:**
    1. Verify structured logging library (Pino) is integrated and functional
    2. Confirm logger service implements all required log levels (ERROR, WARN, INFO, DEBUG)
    3. Validate existing console.log/warn/error calls in critical areas are replaced
    4. Confirm basic logging for key user interactions is implemented in at least one component (hero section)
    5. Verify logs include consistent metadata (timestamp, correlation ID, component name, etc.)
    6. Test development environment shows formatted logs for easier debugging
  - **Done‑when:**
    1. All acceptance criteria from Issue #9 are demonstrably met
    2. Implementation follows DEVELOPMENT_PHILOSOPHY.md logging strategy principles
    3. Foundation is established for future logging expansion
  - **Verification:**
    1. Review original issue requirements against implemented functionality
    2. Demonstrate working structured logging in both development and production
    3. Confirm observability improvements provide debugging value
  - **Depends‑on:** T004, T008, T013, T015, T016
