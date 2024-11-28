<template>
  <el-card class="base-card">
    <div class="card-content">
      <!-- 标题部分 -->
      <div class="card-header">
        <slot name="title">
          <h3 class="card-title">{{ title }}</h3>
        </slot>
      </div>

      <!-- 内容部分 -->
      <div class="card-body">
        <slot name="body">{{ body }}</slot>
      </div>

      <!-- 图标部分 -->
      <div class="card-icon" v-if="$slots.icon || icon">
        <slot name="icon">
          <Icon v-if="icon" :icon="icon" />
        </slot>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface Props {
    title?: string
    body?: string | number
    icon?: string
  }

  defineProps<Props>()
</script>

<style scoped>
  .base-card {
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-base);
    border-radius: 12px;
    transition: transform 0.3s ease;
  }
  .base-card:hover {
    transform: translateY(-2px);
  }
  .card-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
  .card-header {
    grid-column: 1 / -1;
    padding-bottom: 20px;
  }
  .card-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  .card-body {
    font-size: 24px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .card-icon {
    display: flex;
    align-items: center;
    font-size: 32px;
  }
</style>
