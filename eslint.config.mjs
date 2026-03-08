// eslint.config.mjs — SOP-006 (Code Style Standards)
// ESLint flat config for monorepo: Next.js (web) + React Native (mobile) + shared
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ── Base: JS recommended rules ────────────────────────────
  js.configs.recommended,

  // ── TypeScript ────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Disable base rule in favor of TS version
      'no-unused-vars': 'off',
    },
  },

  // ── React (shared rules for web + mobile) ─────────────────
  {
    files: ['**/*.{tsx,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // ── Next.js (web app only) ────────────────────────────────
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    settings: {
      next: { rootDir: 'apps/web' },
    },
  },

  // ── Import sorting ────────────────────────────────────────
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  // ── General rules ─────────────────────────────────────────
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },

  // ── Prettier (must be last to override formatting rules) ──
  prettierConfig,

  // ── Ignore patterns ───────────────────────────────────────
  {
    ignores: [
      'node_modules/',
      '.next/',
      '.expo/',
      'out/',
      'dist/',
      'coverage/',
      'supabase/functions/**',
      '*.config.{js,mjs,cjs}',
    ],
  },
];
