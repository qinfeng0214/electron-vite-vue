<template>
  <!-- Logo 部分 -->
  <div :class="['sidebar-container', { collapsed: isCollapse }]">
    <div class="sidebar-logo">
      <div class="logo-image">
        <img src="../../public/logo-v1.webp" alt="logo" />
      </div>
      <span class="logo-text" v-if="!isCollapse">QF</span>
    </div>

    <!-- 菜单部分 -->
    <el-menu class="sidebar-menu" :collapse="isCollapse" :default-active="currentRoute" router>
      <template v-for="route in baseRoutes" :key="route.path">
        <!-- 处理一级菜单 -->
        <template v-if="route.children && route.children.length === 1">
          <el-menu-item :index="route.path + route.children[0].path">
            <Icon :icon="route.children[0].meta?.icon as string" class="route-icon" />
            <template #title>{{ route.children[0].meta?.title }}</template>
          </el-menu-item>
        </template>

        <!-- 处理带有子菜单的菜单项 -->
        <el-sub-menu v-else-if="route.children && route.children.length > 1" :index="route.path">
          <template #title>
            <el-icon>
              <Icon :icon="route.meta?.icon as string" class="route-icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </template>

          <el-menu-item v-for="child in route.children" :key="child.path" :index="route.path + child.path">
            <template #title>
              <el-icon><Icon :icon="child.meta?.icon as string" class="route-icon" /></el-icon>{{ child.meta?.title }}
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { baseRoutes } from '@/router'

  import { Icon } from '@iconify/vue'

  defineProps<{
    isCollapse: boolean
  }>()

  const route = useRoute()
  const currentRoute = route.path
</script>

<style scoped lang="scss">
  .sidebar-logo {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 12px;
    background-color: var(--el-menu-bg-color);
  }
  .logo-image {
    width: 32px;
    height: 27px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .logo-text {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .route-icon {
    width: 16px;
    height: 16px;
  }
  .sidebar-menu {
    margin: 0 8px;
    font-size: 14px;
  }
  .sidebar-menu:not(.el-menu--collapse) {
    width: 184px;
  }
  .el-menu-item {
    height: 42px;
    padding: 12px 20px 12px 32px;
    margin-bottom: 2px;
    border-radius: var(--el-border-radius-base);
  }
  .el-menu-item.is-active {
    background-color: var(--el-color-primary-light-5);
  }
  .el-menu-item .el-icon {
    margin-right: 10px;
  }
  :deep(.el-sub-menu__title) {
    height: 42px;
    margin-bottom: 2px;
    border-radius: var(--el-border-radius-base) !important;
  }
  .el-menu-item :deep(*) {
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  /* hover 时的放大效果 */
  .el-menu-item:hover :deep(svg) {
    transform: scale(1.1);
  }
  :deep(.el-sub-menu__title:hover) {
    svg {
      transition: transform 0.3s ease;
      transform: scale(1.1);
      transform-origin: center;
    }
  }

  /* 可选：如果只想对图标和文字应用效果 */
  .el-menu-item:hover :deep(.el-icon),
  .el-menu-item:hover :deep(span) {
    transform: scale(1.1);
  }

  /* 响应式设计 */
  @media (width <= 768px) {
    .sidebar-logo {
      justify-content: center;
    }
    .logo-text {
      display: none;
    }
    .sidebar-menu {
      height: calc(100vh - 58px);
    }
  }
</style>
