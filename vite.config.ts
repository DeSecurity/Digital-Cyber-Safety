// Build for GitHub Pages: static SPA + repo subpath base.
// `BASE_PATH` lets local dev (= "/") and Pages build (= "/Digital-Cyber-Safety/") differ.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "index.html",
      },
    },
  },
  vite: {
    base,
  },
});
