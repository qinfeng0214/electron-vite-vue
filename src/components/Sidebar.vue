<template>
  <!-- Logo 部分 -->
  <div class="sidebar-container">
    <div class="sidebar-logo">
      <div class="logo-image">
        <img src="../../public/logo-v1.webp" alt="logo" />
      </div>
      <span class="logo-text">QF</span>
    </div>

    <!-- 菜单部分 -->
    <el-menu class="sidebar-menu" :default-active="currentRoute" router>
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
            <Icon :icon="route.meta?.icon as string" class="route-icon" />
            <span>{{ route.meta?.title }}</span>
          </template>

          <el-menu-item v-for="child in route.children" :key="child.path" :index="route.path + child.path">
            <Icon :icon="child.meta?.icon as string" class="route-icon" />
            <template #title>{{ child.meta?.title }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { baseRoutes } from '@/router'

import { Icon } from '@iconify/vue'

const route = useRoute()
const currentRoute = route.path
</script>

<style scoped lang="scss">
.sidebar-container {
  border-right: 1px solid var(--el-border-color);
}
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
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
.sidebar-menu {
  height: calc(100vh - 50px); /* 100vh 减去 logo 部分的高度 */
  padding-top: 8px;
  border-right: none;
}
.el-menu-item {
  height: 42px;
  padding: 12px 20px 12px 32px;
  margin: 0 8px 2px;
  border-radius: var(--el-border-radius-base);
}
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-5);
}
.el-menu-item .el-icon {
  margin-right: 10px;
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
    height: calc(100vh - 60px);
  }
}
.route-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
