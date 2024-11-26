<template>
  <div class="stats-cards">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(card, index) in statsData" :key="index">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-title">{{ card.title }}</p>
              <p class="stat-value">{{ card.value }}</p>
            </div>
            <div class="stat-icon">
              <Icon :icon="card.icon" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const statsData = shallowRef([
  { title: '用户量', value: '230', icon: 'solar:user-bold' },
  { title: '访问量', value: '3420', icon: 'solar:user-bold' },
  { title: '下载量', value: '2340', icon: 'solar:user-bold' },
  { title: '使用量', value: '123', icon: 'solar:user-bold' }
])

onMounted(async () => {
  try {
    // const data = await getStatisticsData()
    // statsData.value = data.map((item, index) => ({
    //   ...item,
    //   icon: statsData.value[index].icon
    // }))
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
})
</script>

<style scoped>
.stats-cards {
  margin-bottom: 20px;
}
.stat-card {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-base);
}
.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-title {
  font-size: 16px;
  color: var(--el-text-color-primary);
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
.stat-icon {
  font-size: 32px;
}
</style>
