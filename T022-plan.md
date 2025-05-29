# T022 Implementation Plan: Add Playwright Browser Installation to CI Workflow

## Objective

Fix CI failure by adding Playwright browser installation step to enable Storybook accessibility tests to run successfully.

## Current Issue

- CI fails at "Run Storybook a11y tests" step
- Error: `Executable doesn't exist at /home/runner/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell`
- Root cause: @storybook/test-runner requires Playwright browsers but they're not installed in CI environment

## Implementation Approach

### 1. Analyze Current CI Workflow

- Review existing `.github/workflows/ci.yml` structure
- Identify correct position for browser installation (after dependency installation, before Storybook tests)

### 2. Add Browser Installation Step

- Add step: `pnpm exec playwright install --with-deps chromium`
- Use `--with-deps` to include system dependencies
- Install only Chromium browser (not all browsers) for performance optimization
- Position between "Install dependencies" and "Build Storybook" steps

### 3. Step Configuration

```yaml
- name: Install Playwright browsers
  run: pnpm exec playwright install --with-deps chromium
```

## Adherence to Development Philosophy

- **Simplicity First**: Minimal change to solve the specific problem
- **Automation**: Ensures CI pipeline can automatically run a11y tests
- **Explicit Dependencies**: Makes browser requirement explicit in CI workflow
- **Quality Gates**: Maintains CI as primary quality gate by fixing the blocking issue

## Expected Outcome

- CI workflow includes browser installation step
- Step is properly positioned in the workflow
- Storybook a11y tests can execute without "Executable doesn't exist" errors
- No regression in existing CI functionality

## Files to Modify

- `.github/workflows/ci.yml` - Add browser installation step

## Validation

- Verify CI workflow syntax is valid
- Confirm step positioning is correct
- Ensure no impact on existing CI steps
