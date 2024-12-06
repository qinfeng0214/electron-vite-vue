<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside :class="['layout-aside', { collapsed: isCollapse }]">
        <Sidebar :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <Header :is-collapse="isCollapse" :toggle-sidebar="toggleSidebar" />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import Sidebar from '../components/Sidebar.vue'
  import Header from '../components/Header.vue'

  const isCollapse = ref(false)

  const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value
  }
</script>

<style scoped>
  .common-layout,
  .layout-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    color: var(--el-text-color-primary);
    background-color: var(--el-bg-color);
    border-right: 1px solid var(--el-border-color);
  }
  .layout-aside {
    width: auto;
    transition: width 0.3s;
  }
  .el-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-base);
  }
  .el-main {
    padding: 20px;
    background-color: var(--el-bg-color);
  }
</style>
