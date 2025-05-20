# T038 Plan: Format Entire Codebase with Prettier

## Task Classification

**Simple**: This task involves running the Prettier formatter across the entire codebase, reviewing the changes, and committing them.

## Implementation Approach

1. Run `pnpm format:write` to apply Prettier formatting to all eligible files in the project
2. Use `git diff` to review the formatting changes
3. Run `pnpm format:check` to verify that all files are properly formatted
4. Commit all the formatting changes with the conventional commit message: `style: format entire codebase with prettier`

## Considerations

- The formatter will respect the configuration in `.prettierrc.js` and ignore patterns in `.prettierignore`
- This is a purely stylistic change that doesn't affect functionality
- The commit will potentially touch many files, but all changes will be formatting-related only
