import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 设置应用根目录
process.env.APP_ROOT = path.join(__dirname, '../..')

// 定义应用相关路径
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
export const PUBLIC_PATH = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// 配置环境变量
process.env.VITE_PUBLIC = PUBLIC_PATH
