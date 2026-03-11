import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-clerk": ["@clerk/clerk-react"],
          "vendor-ui": ["react-toastify", "axios"],
        },
      },
    },
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
  },
});
