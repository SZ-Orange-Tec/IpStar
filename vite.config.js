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
    {
      name: "generate-zh-version",
      closeBundle() {
        // 构建完成后执行
        setTimeout(() => {
          generateZhVersion()
        }, 100)
      },
    },
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

function generateZhVersion() {
  const distDir = resolve(__dirname, "dist")
  const zhDir = resolve(distDir, "zh")

  // 创建zh目录
  if (!fs.existsSync(zhDir)) {
    fs.mkdirSync(zhDir, { recursive: true })
  }

  // 读取生成的index.html
  const indexPath = resolve(distDir, "index.html")
  if (!fs.existsSync(indexPath)) {
    console.error("index.html not found in dist directory")
    return
  }

  let content = fs.readFileSync(indexPath, "utf-8")

  const scriptReg = /<script[\s\S]*?<\/script>/
  const scriptExec = scriptReg.exec(content)
  const script = scriptExec[0]
  const linkReg = /<link rel="stylesheet" [\s\S]*?\>/
  const linkExec = linkReg.exec(content)
  const link = linkExec[0]

  const zhIndexPath = resolve(zhDir, "index.html")
  if (!fs.existsSync(zhIndexPath)) {
    console.error("index.html not found in zh directory")
    return
  }
  let zhHtml = fs.readFileSync(zhIndexPath, "utf-8")

  zhHtml = zhHtml.replace(scriptReg, script)
  zhHtml = zhHtml.replace(linkReg, link)

  console.log(zhHtml)

  // 写入zh目录下的index.html
  fs.writeFileSync(zhIndexPath, zhHtml)

  console.log("✅ 已生成 zh/index.html")
}
