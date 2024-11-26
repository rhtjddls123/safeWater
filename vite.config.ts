import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/(.*)/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      },
      manifest: {
        name: "safeWater",
        short_name: "safeWater",
        description: "A Progressive Web App built with Vite and React",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/safeWater_any_192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/safeWater_any_192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "/safeWater_any_512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          },
          {
            src: "/safeWater_any_512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any"
          }
        ]
      }
    })
  ],
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
