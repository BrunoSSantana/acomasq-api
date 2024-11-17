import path from "node:path";
import swc from "unplugin-swc";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    exclude: [
      "**/index.ts",
      "**/*.e2e.spec.ts",
      "data/**",
      ...configDefaults.exclude,
    ],
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
    coverage: {
      provider: "v8",
      reporter: ["html", "text", "json"],
      enabled: true,
      exclude: [...configDefaults.exclude, "data/**"],
    },
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
