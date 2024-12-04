import { app, BrowserWindow } from 'electron'
import os from 'node:os'
import { createLoginWindow, createMainWindow } from './windows'
import { setupIpcHandlers } from './ipcHandlers'

// 禁用特定操作系统的硬件加速
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置 Windows 应用用户模型 ID
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// 保证应用单实例运行
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// 应用准备就绪时创建窗口和设置 IPC 事件
app.whenReady().then(() => {
  createLoginWindow()
  setupIpcHandlers()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// 所有窗口关闭时退出应用，除了 macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
