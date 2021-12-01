import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    open: true,
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  plugins: [preact()],
});
