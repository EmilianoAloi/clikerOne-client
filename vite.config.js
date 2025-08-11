import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";

// Fix para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    base: env.VITE_BASE || "/",
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/testing/setupTests.cjs",
    },
  };
});
