# T024 Implementation Plan: Validate CI Fix with Comprehensive Testing

## Analysis

### Current CI State

- PR #25 is open with failing CI
- Error: `Command "playwright" not found` when running `pnpm exec playwright install`
- Root cause: Playwright is not a direct dependency, only a transitive dependency via @storybook/test-runner
- Both cache steps show "Cache not found" indicating this is the first run with the new cache configuration

### Requirements Breakdown

1. **Fix the immediate CI failure** - Playwright command not found
2. **Create test scenarios** - Cache hit, cache miss, dependency changes
3. **Verify all CI steps** - Ensure complete pipeline success
4. **Performance validation** - CI duration <10 minutes
5. **Document results** - For future reference and troubleshooting

## Implementation Strategy

### Phase 1: Fix Immediate CI Failure

#### Option A: Add Playwright as Direct Dependency (Recommended)

- **Pros**: Explicit dependency, clear version control, standard approach
- **Cons**: Adds another dependency to manage
- **Implementation**: `pnpm add -D playwright`

#### Option B: Use npx Instead of pnpm exec

- **Pros**: Works without direct dependency
- **Cons**: Less explicit, potential version mismatches
- **Implementation**: Change to `npx playwright install`

**Decision**: Option A - Add playwright as explicit dev dependency for clarity and version control

### Phase 2: Test Scenario Design

#### Scenario 1: Initial Run (Cache Miss)

- **Setup**: Current state with empty caches
- **Expected**:
  - Both pnpm and playwright caches miss
  - Full installation of dependencies and browsers
  - Caches populated for future runs
  - CI passes all checks

#### Scenario 2: Subsequent Run (Cache Hit)

- **Setup**: Push a minor change (e.g., README update)
- **Expected**:
  - Both caches hit
  - Significantly faster CI execution
  - No browser download needed
  - CI passes all checks

#### Scenario 3: Dependency Change (Partial Cache Hit)

- **Setup**: Update a dependency version
- **Expected**:
  - pnpm cache partially invalidated
  - Playwright cache still hits (unless playwright version changes)
  - Moderate CI execution time
  - CI passes all checks

#### Scenario 4: Playwright Version Change (Cache Invalidation)

- **Setup**: Update playwright or test-runner version
- **Expected**:
  - Playwright cache invalidated
  - New browser download required
  - Cache repopulated with new version
  - CI passes all checks

### Phase 3: Implementation Steps

1. **Fix Playwright Command Issue**

   ```bash
   # Add playwright as direct dependency
   pnpm add -D playwright

   # Update CI workflow if needed
   # Commit fix
   ```

2. **Monitor Initial CI Run**

   - Watch PR #25 CI execution
   - Document cache miss behavior
   - Record total execution time
   - Verify all steps pass

3. **Test Cache Hit Scenario**

   ```bash
   # Make minor change
   echo "<!-- Cache test -->" >> README.md
   git add README.md
   git commit -m "test: verify CI cache hit behavior"
   git push
   ```

4. **Test Dependency Change**

   ```bash
   # Update a non-critical dependency
   pnpm update prettier
   git add pnpm-lock.yaml package.json
   git commit -m "test: verify CI behavior with dependency change"
   git push
   ```

5. **Document Results**
   - Create CI performance baseline
   - Document cache hit rates
   - Note any issues or warnings

### Phase 4: Validation Checklist

- [ ] Playwright command issue resolved
- [ ] All CI steps pass without errors
- [ ] Storybook a11y tests execute successfully
- [ ] Browser installation works correctly
- [ ] Cache miss scenario documented
- [ ] Cache hit scenario shows performance improvement
- [ ] Dependency change scenario handles correctly
- [ ] Total CI duration <10 minutes
- [ ] No regression in existing functionality

## Risk Mitigation

### Identified Risks

1. **Playwright version mismatch** - Ensure consistent versions
2. **Cache key strategy issues** - Monitor for unexpected invalidations
3. **CI timeout on first run** - Browser download might be slow
4. **Hidden failures** - Ensure verbose logging for debugging

### Mitigation Strategies

1. Pin playwright version explicitly
2. Add CI step timing logs for performance tracking
3. Consider increasing timeout for browser installation step
4. Enable debug logging during validation phase

## Success Criteria

1. **Functional Success**

   - CI pipeline passes on all test scenarios
   - Storybook a11y tests execute without errors
   - No regression in existing checks

2. **Performance Success**

   - Cache hit rate >80% on repeated builds
   - CI duration reduced by 30-60s with cache hits
   - Total pipeline time <10 minutes

3. **Reliability Success**
   - Consistent results across multiple runs
   - Clear error messages if failures occur
   - Easy to debug with available logs

## Rollback Plan

If critical issues are discovered:

1. Revert to previous CI configuration (remove caching)
2. Document specific failure modes
3. Create follow-up tasks to address issues
4. Consider alternative caching strategies

## Implementation Order

1. Fix playwright command issue (Phase 1)
2. Commit and push fix
3. Monitor initial CI run (Scenario 1)
4. Execute cache hit test (Scenario 2)
5. Execute dependency change test (Scenario 3)
6. Document all results
7. Create summary report
