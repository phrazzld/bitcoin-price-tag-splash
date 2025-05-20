import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignores (exclude build outputs and dependencies)
  {
    ignores: ['node_modules/', 'dist/', '.next/', 'out/']
  },
  
  // Next.js configuration (from previous config)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // TypeScript ESLint configurations
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  
  // TypeScript-aware rules and parser options
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
  
  // Prettier integration (must be last)
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
