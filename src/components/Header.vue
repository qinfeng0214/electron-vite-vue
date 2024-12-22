<template>
  <div class="header-container" @dblclick="toggleMaximize">
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
        </span>
        <template #dropdown>
          <el-card>
            <template #header>
              <el-avatar :size="48" src="https://avatars.githubusercontent.com/u/1?v=4" />
              <span class="username">{{ userInfo?.username }}</span>
            </template>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-card>
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
          @click="handleWindowControl('fullscreen')"
          :title="isFullscreen ? '退出全屏' : '全屏'"
        >
          <IconMdiFullscreenExit v-if="isFullscreen" class="restore-icon" />
          <IconMdiFullscreen v-else class="maximize-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { throttle } from 'lodash-es'
  import { getUserInfoApi } from '@/api/user'

  const props = defineProps<{
    isCollapse: boolean
    toggleSidebar: () => void
  }>()

  const toggleSidebar = () => {
    props.toggleSidebar()
  }

  const router = useRouter()

  // 获取用户信息
  interface UserInfo {
    username: string
    user_id: string
    createdAt: string
  }
  // 获取用户信息
  const userInfo = ref<UserInfo | null>(null)
  const getUserInfo = async () => {
    try {
      const response = await getUserInfoApi()
      if (response.success) {
        userInfo.value = response.data || null
      } else {
        ElMessage.error(response.message || '获取用户信息失败')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    getUserInfo()
  })
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
    1000,
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

  const isFullscreen = ref(false)

  let cleanup: any = null
  const handleWindowControl = (type: 'close' | 'minimize' | 'fullscreen') => {
    switch (type) {
      case 'close':
        window.electronAPI.closeWindow('main')
        break
      case 'minimize':
        window.electronAPI.minimizeWindow('main')
        break
      case 'fullscreen':
        window.electronAPI.fullscreenWindow()
        cleanup = window.electronAPI.onFullscreenChange((fullscreen: boolean) => {
          console.log('fullscreen', fullscreen)
          isFullscreen.value = fullscreen
        })
        break
    }
  }

  onUnmounted(() => {
    cleanup?.()
  })

  const toggleMaximize = throttle(
    () => {
      window.electronAPI.maximizeWindow('main')
    },
    1000,
    { leading: true, trailing: false }
  )
</script>

<style scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    user-select: none;
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
    font-size: 14px;
    font-weight: 500;
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
    align-items: center;
    -webkit-app-region: no-drag; /* 确保按钮可点击 */
    svg {
      opacity: 0;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
      transform: scale(0.8);
    }
  }
  .window-controls:hover svg {
    opacity: 1;
    transform: scale(1);
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
    font-size: 20px;
    font-weight: 700;
  }
  .maximize-icon {
    font-size: 20px;
    font-weight: 700;
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
