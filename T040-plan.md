# T040 Plan: Eliminate all `any` types from codebase

## Task Classification

**Simple**: This task involves finding and replacing all instances of `any` types in the codebase with more specific types. Based on the ESLint audit, there are only a few occurrences to fix.

## Implementation Approach

1. Locate all instances of `any` types in the codebase using both grep and ESLint
2. For each instance:
   - Examine the context to understand the expected data structure/type
   - Replace with appropriate specific types, interfaces, or `unknown` with type guards
   - Verify the change does not break functionality
3. Run ESLint to confirm no remaining `any` types
4. Run formatter to ensure consistent code style

## Considerations

- Prefer creating explicit interfaces over inline types for complex structures
- Use `unknown` with type guards where the type truly cannot be determined until runtime
- Be careful about library/third-party code boundaries where types might need to be defined
- For test code like test-eslint.ts, replace it with proper types while maintaining its purpose of testing ESLint configuration
