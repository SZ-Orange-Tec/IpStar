// import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// 自动引入element-plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 分析打包
import { visualizer } from "rollup-plugin-visualizer"
import tailwindcss from "tailwindcss"
import path from "path"
const __dirname = path.resolve()

// https://vite.dev/config/
export default defineConfig({
  base: "/",

  build: {
    sourcemap: true,
  },
  server: {
    historyApiFallback: true, // 启用 history 模式支持
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    visualizer({
      emitFile: false,
      filename: "analysis-chart.html",
      open: true,
    }),
    // sentryVitePlugin({
    //   org: "xiaoju",
    //   project: "ipstar"
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 新增 css 配置
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
