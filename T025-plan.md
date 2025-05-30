# T025 Implementation Plan: Update Documentation for CI Browser Requirements

## Objective

Update project documentation to reflect Playwright browser installation requirements in CI, based on findings from T022-T024.

## Implementation Approach

### 1. Update docs/ci-accessibility-testing.md

#### Add Browser Installation Section (after line 61)

- Document that Playwright browsers must be installed
- Explain the `pnpm exec playwright install --with-deps chromium` step
- Clarify why direct playwright dependency is needed

#### Add Troubleshooting Section

- Common errors (e.g., "Command playwright not found")
- Solutions based on our fixes
- Cache-related issues and resolutions

#### Update CI Pipeline Flow

- Add browser installation step after build
- Update the flow diagram to reflect current pipeline

#### Document Performance Impact

- Browser download time (~8 seconds)
- Cache benefits when working
- Total CI duration expectations

### 2. Update CONTRIBUTING.md

#### Add Browser Dependency Note (in CI Pipeline section, around line 111)

- Mention Playwright browser requirement for Storybook tests
- Link to detailed documentation

#### Update Development Environment Setup

- Add note about local Playwright browser installation
- Include command: `pnpm exec playwright install chromium`

## Adherence to Development Philosophy

- **Document Decisions, Not Mechanics**: Focus on why browsers are needed, not just how
- **Clarity**: Make troubleshooting actionable and clear
- **Completeness**: Ensure contributors understand full CI requirements

## Expected Changes

- docs/ci-accessibility-testing.md: Add ~40-50 lines of new documentation
- CONTRIBUTING.md: Add ~10-15 lines about browser requirements

## Success Criteria

- Contributors understand browser installation requirement
- Clear troubleshooting steps for common issues
- Performance expectations documented
- CI pipeline flow accurately reflects current state
