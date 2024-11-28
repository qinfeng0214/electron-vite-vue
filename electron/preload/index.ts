import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  login: () => ipcRenderer.send('login-success'),
  logout: () => ipcRenderer.send('logout-success'),

  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
    return () => {
      ipcRenderer.removeAllListeners('main-process-message')
    }
  },

  openWindow: (windowName: string) => ipcRenderer.send('open-window', windowName),
  closeWindow: (windowName: string) => ipcRenderer.send('close-window', windowName),
  minimizeWindow: (windowName: string) => ipcRenderer.send('minimize-window', windowName),
  maximizeWindow: (windowName: string) => ipcRenderer.send('maximize-window', windowName),
  onMaximizeChange: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window-maximized', (_, isMaximized) => callback(isMaximized))
    return () => {
      ipcRenderer.removeAllListeners('window-maximized')
    }
  }
})
