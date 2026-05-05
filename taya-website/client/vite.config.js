import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  cacheDir: '../../node_modules/.vite/client',
  server: {
    port: 5174,       // Set the port to 5174
    strictPort: true, // Prevent Vite from switching to another port
  },
});