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
          <IconSolarSunBold v-if="!isDark" />
          <IconSolarMoonBold v-else />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const handleToggleDark = (event: MouseEvent): void => {
  const { clientX, clientY } = event

  // 启动视图过渡
  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  // 在过渡准备好后，执行自定义动画
  transition.ready.then(() => {
    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    )
    const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]

    const isDarkMode = document.documentElement.classList.contains('dark')

    // 自定义动画
    document.documentElement.animate(
      {
        clipPath: isDarkMode ? clipPath.reverse() : clipPath
      },
      {
        duration: 500,
        pseudoElement: isDarkMode ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
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

/* .el-button:not(.is-disabled):hover,
.el-button:not(.is-disabled):focus {
  background: transparent !important;
  border: none;
} */
</style>
