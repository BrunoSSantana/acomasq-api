import swc from 'unplugin-swc';
import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    exclude: [...configDefaults.exclude, 'data/**'],
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'text', 'json'],
      enabled: true,
      exclude: [...configDefaults.exclude, 'data/**']
    }
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
