module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  ignorePatterns: ['node_modules', 'dist', '.next', 'out', 'test-tailwind-config.js', 'test.js'],
  
  // Default settings for all files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
  },
  
  // Override settings for specific file types
  overrides: [
    // TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'warn'
      }
    },
    // JavaScript files
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      parser: 'espree', // Use standard JS parser for non-TS files
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ]
};