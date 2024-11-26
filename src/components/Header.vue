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

        const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]

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
