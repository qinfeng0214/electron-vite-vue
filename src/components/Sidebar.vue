<template>
  <el-menu
    class="sidebar-menu"
    :default-active="route.path"
    background-color="var(--el-color-primary)"
    text-color="var(--el-color-white)"
    active-text-color="var(--el-color-primary-light-3)"
  >
    <el-menu-item index="/dashboard">
      <el-icon><IconIcBaselineDashboard /></el-icon>
      <span>Dashboard</span>
    </el-menu-item>
    <!-- 添加更多菜单项 -->
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  border-right: none;
}
</style>
