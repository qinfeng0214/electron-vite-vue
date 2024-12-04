import { ipcMain, shell } from 'electron'
import { createMainWindow, createLoginWindow, getMainWindow, getLoginWindow } from './windows'

/**
 * 设置 IPC 事件处理
 */
export function setupIpcHandlers() {
  // 登录成功
  ipcMain.on('login-success', () => {
    const loginWindow = getLoginWindow()
    if (loginWindow) {
      loginWindow.close()
      createMainWindow()
    }
  })

  // 登出成功
  ipcMain.on('logout-success', () => {
    const mainWindow = getMainWindow()
    if (mainWindow) {
      mainWindow.close()
      createLoginWindow()
    }
  })

  // 最小化窗口
  ipcMain.on('minimize-window', (_, windowName: string) => {
    const targetWindow = windowName === 'login' ? getLoginWindow() : getMainWindow()
    targetWindow?.minimize()
  })

  // 最大化/还原窗口
  ipcMain.on('maximize-window', (_, windowName: string) => {
    const targetWindow = windowName === 'main' ? getMainWindow() : getLoginWindow()
    if (!targetWindow) return

    if (targetWindow.isMaximized()) {
      targetWindow.unmaximize()
    } else {
      targetWindow.maximize()
    }
  })

  // 全屏/退出全屏窗口
  ipcMain.on('fullscreen-window', () => {
    const targetWindow = getMainWindow()
    if (!targetWindow) return
    if (targetWindow.isFullScreen()) {
      targetWindow.setFullScreen(false)
    } else {
      targetWindow.setFullScreen(true)
    }
  })

  // 关闭窗口
  ipcMain.on('close-window', (_, windowName: string) => {
    const targetWindow = windowName === 'login' ? getLoginWindow() : getMainWindow()
    targetWindow?.close()
  })

  // 处理打开外部链接
  ipcMain.handle('open-external', (_, url: string) => {
    shell.openExternal(url)
  })
}
