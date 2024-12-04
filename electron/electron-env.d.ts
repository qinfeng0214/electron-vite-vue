/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist-electron
     * │ ├─┬ main
     * │ │ └── index.js    > Electron-Main
     * │ └─┬ preload
     * │   └── index.mjs   > Preload-Scripts
     * ├─┬ dist
     * │ └── index.html    > Electron-Renderer
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// 定义 ElectronAPI 接口
interface ElectronAPI {
  login: () => void
  logout: () => void
  closeWindow: (windowName: string) => void
  minimizeWindow: (windowName: string) => void
  maximizeWindow: (windowName: string) => void
  fullscreenWindow: () => void
  onMaximizeChange: (callback: (isMaximized: boolean) => void) => () => void
  onFullscreenChange: (callback: (isFullscreen: boolean) => void) => () => void
  onMessage: (callback: (message: string) => void) => () => void
}

// 扩展 Window 接口
interface Window {
  electronAPI: ElectronAPI
}
