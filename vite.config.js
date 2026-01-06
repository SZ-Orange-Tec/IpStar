// import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// 自动引入element-plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 分析打包
// import { visualizer } from "rollup-plugin-visualizer"
import tailwindcss from "tailwindcss"
import fs from "fs"
import { resolve } from "path"
const __dirname = resolve()
// 自动添加css前缀
import autoprefixer from "autoprefixer"
import prerender from "@prerenderer/rollup-plugin"
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
    prerender({
      // 需要预渲染的路由页面
      routes: [
        "/home",
        // "/product/residential",
        // "/product/rotation",
        // "/mobile-proxy",
        // "/unlimited-residential-proxy",
        // "/product/data_center",
        // "/pricing/residential",
        // "/pricing/mobile",
        // "/pricing/unlimited",
        // "/pricing/data_center",
        // "/relation",
        // "/help",
        // "/login",

        "/zh/home",
        // "/zh/product/residential",
        // "/zh/product/rotation",
        // "/zh/mobile-proxy",
        // "/zh/unlimited-residential-proxy",
        // "/zh/product/data_center",
        // "/zh/pricing/residential",
        // "/zh/pricing/mobile",
        // "/zh/pricing/unlimited",
        // "/zh/pricing/data_center",
        // "/zh/relation",
        // "/zh/help",
      ],
      renderer: "@prerenderer/renderer-puppeteer",
      // rendererOptions: {
      //   maxConcurrentRoutes: 1,
      //   renderAfterTime: 500,
      //   headless: true,
      //   executablePath: '"C:UsersPublicDesktopGoogle Chrome.lnk"', // 谷歌浏览器位置
      // },
      postProcess(renderedRoute) {
        // 清理不必要的空白字符
        renderedRoute.html = renderedRoute.html.replace(/\s+/g, " ").trim()
        return renderedRoute
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // 新增 css 配置
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer({
          overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8", "> 1%"],
          grid: true,
        }),
      ],
    },
  },
})
