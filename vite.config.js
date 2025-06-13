import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Dividir los módulos de node_modules en un fragmento 'vendor'
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Crea un fragmento llamado 'vendor' para los módulos de node_modules
          }
        },
      },
    },
    // Ajustar el límite de tamaño para evitar la advertencia de fragmentos grandes
    chunkSizeWarningLimit: 1000, // Aumenta el límite de tamaño a 1000 kB
  },
});
