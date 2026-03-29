import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: '.',
    include: [
      'packages/*/tests/**/*.test.ts',
      'starters/*/tests/**/*.test.ts',
    ],
    exclude: ['tests/**', 'tests/e2e-pw/**', 'e2e/**', 'node_modules/**'],
    environment: 'happy-dom',
  },
});
