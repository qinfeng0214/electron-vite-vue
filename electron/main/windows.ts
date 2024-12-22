import { BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL, PUBLIC_PATH } from './config'

console.log('MAIN_DIST', MAIN_DIST)
// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let loginWindow: BrowserWindow | null = null
let mainWindow: BrowserWindow | null = null

const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

/**
 * 创建登录窗口
 */
export function createLoginWindow() {
  loginWindow = new BrowserWindow({
    title: 'Login',
    width: 1000,
    height: 750,
    icon: path.join(PUBLIC_PATH, process.platform === 'darwin' ? 'icon.png' : 'icon.ico'),
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  loginWindow.setMenu(null)

  if (VITE_DEV_SERVER_URL) {
    loginWindow.loadURL(`${VITE_DEV_SERVER_URL}#/login`)
    loginWindow.webContents.openDevTools()
  } else {
    loginWindow.loadFile(indexHtml, { hash: 'login' })
  }

  loginWindow.on('closed', () => {
    loginWindow = null
  })

  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow?.webContents.send('main-process-message', new Date().toLocaleString())
    loginWindow.setTitle('登录')
  })
}

/**
 * 创建主窗口
 */
export function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Main window',
    width: 1200,
    height: 900,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 15 },
    autoHideMenuBar: true,
    icon: path.join(PUBLIC_PATH, process.platform === 'darwin' ? 'icon.png' : 'icon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  mainWindow.setMenu(null)

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(indexHtml)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximized', true)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-maximized', false)
  })

  mainWindow.on('enter-full-screen', () => {
    mainWindow?.webContents.send('fullscreen-window', true)
  })

  mainWindow.on('leave-full-screen', () => {
    mainWindow?.webContents.send('fullscreen-window', false)
  })
}

/**
 * 获取主窗口实例
 */
export function getMainWindow() {
  return mainWindow
}

/**
 * 获取登录窗口实例
 */
export function getLoginWindow() {
  return loginWindow
}
