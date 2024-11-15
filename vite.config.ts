import fs from 'node:fs'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import electron from 'vite-plugin-electron/simple'
import pkg from './package.json'

const pathSrc = path.resolve(__dirname, 'src')
console.log('pathSrc:', pathSrc)

export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {

    resolve: {
      alias: {
        '@': pathSrc,
      },
    },

    plugins: [
      vue(),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver({
            importStyle: 'css'
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'), // 指定自动导入函数TS类型声明文件路径
        dirs: ["./src/components/**"], // 自动引入'./src/components/'中的所有组件
      }),
      AutoImport({
        // 导入vueuse
        imports: ['vue', 'vue-router', '@vueuse/core'],
        resolvers: [
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
          ElementPlusResolver({
            importStyle: 'css'
          })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
        // dirs: ["./src/utils/**"], // utils下的所有文件都支持自动引入
      }),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: 'electron/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
            } else {
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: 'electron/preload/index.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {},
      }),
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
