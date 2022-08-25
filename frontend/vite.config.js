import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 55173, // Random port, hopefully not used locally.
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $screen-sm: 640px;
          $screen-md: 768px;
          $screen-lg: 1024px;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
