import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended, // ESLint recommended rules

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Node global variables (process, __dirname, etc.)
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]);
