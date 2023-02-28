/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Inspector from "unplugin-vue-inspector/vite";
import Inspect from "vite-plugin-inspect";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ReactivityTransform(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      imports: ["vue", "@vueuse/core", "@vueuse/head", "vue-router", {
        "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingbar"],
      }],
      dirs: ["./src/composables"],
    }),
    Components({
      dirs: ["src/components", "src/layouts"],
      deep: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      resolvers: [NaiveUiResolver()],
    }),
    Inspector(),
    Inspect(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Bilibili SuperChat",
        short_name: "Bli-SC",
        description: "A tool making bilibili SuperChat pic",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,ttf}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
    legacy({ targets: ["defaults", "not IE 11"] }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~": resolve(__dirname, "./"),
    },
  },
  test: {
    environment: "happy-dom",
  },
});
