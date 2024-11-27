import { app, BrowserWindow, shell, ipcMain, nativeImage } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const require = createRequire(import.meta.url)
console.log('require', require)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let loginWindow: BrowserWindow | null = null
let mainWindow: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createLoginWindow() {
  loginWindow = new BrowserWindow({
    title: 'Login',
    width: 1000,
    height: 750,
    icon: path.join(process.env.VITE_PUBLIC, process.platform === 'darwin' ? 'icon.png' : 'icon.ico'), // 使用 .ico 或 .icns 格式的图标
    resizable: false,
    titleBarStyle: 'hidden', // 禁用原生标题栏
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

  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow?.webContents.send('main-process-message', new Date().toLocaleString())
    loginWindow.setTitle('登录')
  })
}

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Main window',
    width: 1200,
    height: 900,
    titleBarStyle: 'hidden',
    icon: path.join(process.env.VITE_PUBLIC, process.platform === 'darwin' ? 'icon.png' : 'icon.ico'), // 使用 .ico 或 .icns 格式的图标
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

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString())
    mainWindow.setTitle('QinFeng')
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

ipcMain.on('login-success', () => {
  if (loginWindow) {
    loginWindow.close()
    createMainWindow()
  }
})

ipcMain.on('logout-success', () => {
  if (mainWindow) {
    mainWindow.close()
    createLoginWindow()
  }
})

ipcMain.on('close-window', (_, windowName) => {
  if (windowName === 'login' && loginWindow) {
    loginWindow.close()
  } else if (windowName === 'main' && mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('minimize-window', (_, windowName) => {
  if (windowName === 'login' && loginWindow) {
    loginWindow.minimize()
  } else if (windowName === 'main' && mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on('open-window', (_, windowName) => {
  if (windowName === 'login') {
    if (!loginWindow) {
      createLoginWindow()
    } else {
      loginWindow.show()
    }
  } else if (windowName === 'main') {
    if (!mainWindow) {
      createMainWindow()
    } else {
      mainWindow.show()
    }
  }
})

app.whenReady().then(() => {
  createLoginWindow()

  // 设置 Dock 图标和应用名称
  // if (process.platform === 'darwin') {
  //   // const dockIcon = nativeImage.createFromPath(path.join(__dirname, '../../assets/icon.icns')) // 使用 .icns 格式的图标
  //   // app.dock.setIcon(dockIcon)
  //   app.dock.setBadge('秦风工具箱') // 设置应用名称提示
  // }

  // // 设置 Windows 任务栏图标和应用名称
  if (process.platform === 'win32') {
    const appIcon = nativeImage.createFromPath(path.join(__dirname, '../../public/icon.ico')) // 使用 .ico 格式的图标
    app.setAppUserModelId('秦风工具箱') // 设置应用名称提示
    app.setUserTasks([
      {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: appIcon.toDataURL(),
        iconIndex: 0,
        title: '秦风工具箱',
        description: '秦风工具箱 Description'
      }
    ])
  }
})

app.on('window-all-closed', () => {
  loginWindow = null
  mainWindow = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createLoginWindow()
  }
})

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
