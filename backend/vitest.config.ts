// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: 'src/features/projects/tests/setup.ts',
    globals: true,
    environment: 'node',
  },
});
