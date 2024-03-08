import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from "vite-plugin-static-copy";
import * as path from "path";
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), svgr({ include: "**/*.svg" })],
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 500000,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[ext]", // указывает формат и путь для сохранения статических ресурсов
        },
      },
    },
    resolve: {
      alias: [
        { find: "@", replacement: "/src" },
        { find: "@app", replacement: "/src/app" },
        { find: "@components", replacement: "/src/components" },
        { find: "@store", replacement: "/src/store" },
        { find: "@assets", replacement: "/src/assets" },
        { find: "@service", replacement: "/src/service" },
        { find: "@modules", replacement: "/src/modules" },
        { find: "@router", replacement: "/src/router" },
        { find: "@hocs", replacement: "/src/hocs" },
        { find: "@utils", replacement: "/src/utils/index.ts" },
      ],
    },
  };
});
