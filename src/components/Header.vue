<template>
  <div class="header-container">
    <div class="left">
      <el-icon class="toggle-sidebar" @click="toggleSidebar">
        <IconEpFold v-if="isCollapse" />
        <IconEpExpand v-else />
      </el-icon>
    </div>
    <div class="right">
      <!-- 主题切换按钮 -->
      <el-button text circle @click="handleToggleDark">
        <el-icon>
          <transition name="icon-fade" mode="out-in">
            <span key="icon-sun" v-if="!isDark">
              <IconSolarMoonBold />
            </span>
            <span key="icon-moon" v-else>
              <IconSolarSunBold />
            </span>
          </transition>
        </el-icon>
      </el-button>
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="32" src="https://avatars.githubusercontent.com/u/1?v=4" />
          <span class="username">Admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 自定义窗口控制按钮 -->
      <div class="window-controls">
        <button class="window-button close" @click="handleWindowControl('close')" title="关闭">
          <IconMdiClose />
        </button>
        <button class="window-button minimize" @click="handleWindowControl('minimize')" title="最小化">
          <IconMdiMinus />
        </button>
        <button
          class="window-button maximize"
          @click="handleWindowControl('maximize')"
          :title="isMaximized ? '还原' : '最大化'"
        >
          <IconMdiFullscreenExit v-if="isMaximized" class="restore-icon" />
          <IconMdiFullscreen v-else class="maximize-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { throttle } from 'lodash-es'

  const router = useRouter()
  const isCollapse = ref(false)

  const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value
  }

  const handleLogout = () => {
    // 发送登出请求到主进程
    window.electronAPI.logout()
    // 登出成功后跳转到登录页
    router.push('/login')
  }

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  let isAnimating = false
  let lastAnimation: Animation | null = null

  const handleToggleDark = throttle(
    (event: MouseEvent): void => {
      // 如果动画正在进行中，直接返回
      if (isAnimating) return

      const { clientX, clientY } = event

      // 取消之前未完成的动画
      if (lastAnimation) {
        lastAnimation.cancel()
      }

      isAnimating = true

      const transition = document.startViewTransition(() => {
        toggleDark()
      })

      transition.ready.then(() => {
        requestAnimationFrame(() => {
          const radius = Math.hypot(
            Math.max(clientX, window.innerWidth - clientX),
            Math.max(clientY, window.innerHeight - clientY)
          )

          const clipPath = [
            `circle(0% at ${clientX}px ${clientY}px)`,
            `circle(${radius}px at ${clientX}px ${clientY}px)`
          ]

          const isDarkMode = document.documentElement.classList.contains('dark')

          const animation = document.documentElement.animate(
            {
              clipPath: isDarkMode ? clipPath.reverse() : clipPath
            },
            {
              duration: 500,
              easing: 'ease-out',
              pseudoElement: isDarkMode ? '::view-transition-old(root)' : '::view-transition-new(root)'
            }
          )

          lastAnimation = animation

          animation.onfinish = () => {
            isAnimating = false
            lastAnimation = null
            localStorage.setItem('isDark', isDarkMode ? 'true' : 'false')
          }

          animation.oncancel = () => {
            isAnimating = false
            lastAnimation = null
          }
        })
      })
    },
    500,
    { leading: true, trailing: false }
  )

  // 组件卸载时清理
  onUnmounted(() => {
    if (lastAnimation) {
      lastAnimation.cancel()
    }
    // 取消节流函数的定时器
    handleToggleDark.cancel()
  })

  const isMaximized = ref(false)

  // 监听窗口状态变化
  onMounted(() => {
    const cleanup = window.electronAPI.onMaximizeChange((maximized: boolean) => {
      isMaximized.value = maximized
    })

    // 组件卸载时清理监听器
    onUnmounted(() => {
      cleanup?.()
    })
  })
  const handleWindowControl = (type: 'close' | 'minimize' | 'maximize') => {
    switch (type) {
      case 'close':
        window.electronAPI.closeWindow('main')
        break
      case 'minimize':
        window.electronAPI.minimizeWindow('main')
        break
      case 'maximize':
        window.electronAPI.maximizeWindow('main')
        break
    }
  }
</script>

<style scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: var(--el-header-bg-color);
  }
  .toggle-sidebar {
    font-size: 20px;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .username {
    margin-left: 8px;
  }
  .el-button:not(.is-disabled):hover,
  .el-button:not(.is-disabled):focus {
    color: var(--el-text-color-primary) !important;
    background: transparent !important;
  }
  .el-button:not(.is-disabled):hover {
    background: var(--el-text-color-disabled) !important;
  }
  .right {
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 16px;
  }
  :deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
  }

  /* 自定义窗口控制按钮样式 */
  .window-controls {
    display: flex;
    gap: 8px;
    padding: 0 12px;
    -webkit-app-region: no-drag; /* 确保按钮可点击 */
  }
  .window-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    transition: all 0.2s ease;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      content: '';
      transition: transform 0.2s ease;
      transform: translate(-50%, -50%) scale(0);
    }
    &:hover::before {
      transform: translate(-50%, -50%) scale(1);
    }
    svg {
      width: 12px;
      height: 12px;
    }
  }
  .close {
    background-color: #ff5f57;
  }
  .minimize {
    background-color: #ffbd2e;
  }
  .maximize {
    background-color: #28c940;
  }
  .restore-icon {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    &::before {
      position: absolute;
      top: -2px;
      left: 2px;
      width: 8px;
      height: 8px;
      content: '';
      border: 1px solid currentColor;
    }
    &::after {
      position: absolute;
      top: 2px;
      left: -2px;
      width: 8px;
      height: 8px;
      content: '';
      border: 1px solid currentColor;
    }
  }
  .maximize-icon {
    position: relative;
    display: inline-block;
    font-size: 20px;
  }

  /* 过渡动画 */
  .icon-fade-enter-active,
  .icon-fade-leave-active {
    transition:
      opacity 0.3s,
      transform 0.3s;
  }
  .icon-fade-enter-from {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
  }
  .icon-fade-enter-to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  .icon-fade-leave-from {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  .icon-fade-leave-to {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }
</style>
