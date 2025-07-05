import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom", // Para testear componentes React que usan DOM
    globals: true,
    setupFiles: "./src/testing/setupTests.cjs", // Opcional, para utilidades globales de test
  },
});
