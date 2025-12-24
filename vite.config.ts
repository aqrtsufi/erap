import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/erap/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/epubjs")) return "epub";
          if (id.includes("node_modules/flexsearch")) return "search";
          // optional: split vue/vendor
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 900, // kB (default ~500)
    outDir: "docs",
    emptyOutDir: true,
    cssMinify: "esbuild", // ✅ removes the [lightningcss minify] @property warning
  },
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
      },
      registerType: "autoUpdate",
      manifest: {
        name: "Ebook Reader",
        short_name: "EReader",
        start_url: "/erap/",
        scope: "/erap/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#111827",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    }),
  ],
});
