# T021 Plan: Integrate Automated a11y Checks into CI Pipeline

## Classification: Complex

Multi-file changes involving CI configuration and potentially new dependencies.

## Current State Analysis

### CI Configuration

- GitHub Actions workflow exists at `.github/workflows/ci.yml`
- Current CI runs: format:check, lint, build
- **Critical Gap:** No test execution in CI!

### Accessibility Testing

- jest-axe is installed and configured
- Accessibility tests exist for:
  - ScrollReveal component
  - AnimatedBackground component
  - Page components
- Test command available: `pnpm test`

### Storybook Setup

- Storybook configured with a11y addon
- Build command available: `pnpm build-storybook`
- Stories exist for ScrollReveal and AnimatedBackground

## Implementation Steps

### Step 1: Add Jest Tests to CI (Including a11y)

- Modify `.github/workflows/ci.yml` to run tests
- Tests already include jest-axe checks
- Add test coverage reporting

### Step 2: Add Type Checking to CI

- Add `pnpm type-check` to CI workflow
- Ensures TypeScript integrity

### Step 3: Evaluate Storybook a11y CI Options

- Install @storybook/test-runner as dev dependency
- Configure test-runner for a11y checks
- Add Storybook test execution to CI

### Step 4: Update CI Workflow Structure

- Reorganize steps for clarity
- Add caching for better performance
- Ensure proper error reporting

## Test Strategy

### What to Test

1. Verify jest tests run in CI (including a11y tests)
2. Verify type checking runs in CI
3. Verify Storybook test-runner executes a11y checks
4. Verify CI fails on accessibility violations

### How to Test

1. Create a branch with intentional a11y violation
2. Push to verify CI catches the issue
3. Fix violation and verify CI passes

## Risk Mitigation

### Risks

1. CI execution time increase
2. Potential flaky Storybook tests
3. Breaking existing CI flow

### Mitigations

1. Use parallel job execution
2. Add retry logic for Storybook tests
3. Test changes in feature branch first

## Expected File Changes

1. `.github/workflows/ci.yml` - Add test execution steps
2. `package.json` - Add @storybook/test-runner dependency
3. `.storybook/test-runner.ts` - Configure a11y checks
4. Update documentation about CI requirements

## Success Criteria

1. All jest tests (including jest-axe) run in CI
2. Type checking runs in CI
3. Storybook a11y checks run in CI (if feasible)
4. CI pipeline passes with current code
5. CI fails when accessibility violations are introduced
6. Clear error messages for accessibility failures
