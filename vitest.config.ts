import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'data/**'],
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
});
