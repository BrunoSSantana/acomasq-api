import path from "node:path";
import swc from "unplugin-swc";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "./src",
    watch: false,
    exclude: [...configDefaults.exclude, "**/index.ts"],
    globals: true,
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
    include: ["**/*.e2e.spec.ts"],
/*     environmentMatchGlobs: [["src/**", "prisma"]],
 */    coverage: {
      provider: "v8",
      exclude: [
        ...configDefaults.exclude,
        "**/vite*",
        "**/index.ts",
        "**/*.spec.ts",
        "./test*",
      ],
    },
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
