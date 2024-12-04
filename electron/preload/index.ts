import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * 发送登录成功事件
   */
  login: () => ipcRenderer.send('login-success'),

  /**
   * 发送登出成功事件
   */
  logout: () => ipcRenderer.send('logout-success'),

  /**
   * 关闭指定窗口
   * @param windowName - 窗口名称
   */
  closeWindow: (windowName: string) => ipcRenderer.send('close-window', windowName),

  /**
   * 最小化指定窗口
   * @param windowName - 窗口名称
   */
  minimizeWindow: (windowName: string) => ipcRenderer.send('minimize-window', windowName),

  /**
   * 最大化或还原指定窗口
   * @param windowName - 窗口名称
   */
  maximizeWindow: (windowName: string) => ipcRenderer.send('maximize-window', windowName),

  /**
   * 全屏或退出全屏指定窗口
   * @param windowName - 窗口名称
   */
  fullscreenWindow: () => ipcRenderer.send('fullscreen-window'),

  /**
   * 监听窗口最大化状态变化
   * @param callback - 回调函数，接收窗口是否最大化的状态
   */
  onMaximizeChange: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window-maximized', (_event, isMaximized) => callback(isMaximized))
    return () => {
      ipcRenderer.removeAllListeners('window-maximized')
    }
  },

  /**
   * 监听窗口全屏状态变化
   * @param callback - 回调函数，接收窗口是否全屏的状态
   */
  onFullscreenChange: (callback: (isFullscreen: boolean) => void) => {
    ipcRenderer.on('fullscreen-window', (_event, isFullscreen) => callback(isFullscreen))
    return () => {
      ipcRenderer.removeAllListeners('fullscreen-window')
    }
  },

  /**
   * 监听主进程发送的消息
   * @param callback - 回调函数，接收消息内容
   */
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
    return () => {
      ipcRenderer.removeAllListeners('main-process-message')
    }
  }
})
