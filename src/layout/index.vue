<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside width="200px">
        <TheSidebar />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <TheHeader />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '../components/Sidebar.vue'
import TheHeader from '../components/Header.vue'
</script>

<style scoped>
.common-layout,
.layout-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  color: var(--el-color-white);
  background-color: var(--el-color-primary);
}
.el-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: var(--el-color-white);
  border-bottom: 1px solid var(--el-border-color-base);
}
.el-main {
  padding: 20px;
  background-color: var(--el-bg-color);
}
</style>
