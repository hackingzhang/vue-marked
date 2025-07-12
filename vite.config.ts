/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: "./lib",
    lib: {
      entry: "./src/index.ts",
      name: "VueMarked",
      fileName: (format) => `vue-marked.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue", "marked", "dompurify"],
      output: {
        globals: {
          vue: "Vue",
          marked: "marked",
          dompurify: "DOMPurify",
        },
      },
    },
  },
  test: {
    coverage: {
      include: ["src/**"],
      exclude: ["src/index.ts", "src/install.ts"],
    },
    environment: "happy-dom",
  },
});
