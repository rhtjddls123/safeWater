import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/waternow": {
        target: "https://www.waternow.go.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/waternow/, "")
      },
      "/api": {
        target: "https://me.go.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
