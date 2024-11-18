import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  login: () => ipcRenderer.send('login-success'),

  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
    return () => {
      ipcRenderer.removeAllListeners('main-process-message')
    }
  },

  openWindow: (hash: string) => ipcRenderer.invoke('open-win', hash)
})

declare global {
  interface Window {
    electronAPI: {
      login: () => void
      onMessage: (callback: (message: string) => void) => () => void
      openWindow: (hash: string) => Promise<void>
    }
  }
}
