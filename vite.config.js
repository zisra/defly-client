import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,txt}"],
        maximumFileSizeToCacheInBytes: 13 * 1000 * 1000,
      },
    }),
    nodePolyfills({
      include: [],
      globals: {
        Buffer: false,
        global: true,
        process: false,
      },
    }),
  ],
});
