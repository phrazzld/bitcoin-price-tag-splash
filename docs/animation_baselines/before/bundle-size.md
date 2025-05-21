# Bundle Size Before Refactoring (with Framer Motion)

## First Load JS

- Main page (`/`): 146 kB
- Shared by all routes: 104 kB
  - `chunks/951-6cb6b90d739c4cf4.js`: 46.5 kB
  - `chunks/dd86109b-a58686b6187fbae7.js`: 56.1 kB
  - Other shared chunks: 1.93 kB

## Framer Motion-Specific Components

- `/test-scroll-reveal`: 142 kB

This data will be used as a baseline to measure the bundle size reduction after removing the Framer Motion dependency.
