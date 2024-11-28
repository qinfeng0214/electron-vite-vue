<template>
  <div class="stats-cards">
    <base-card
      v-for="(card, index) in statsData"
      :key="index"
      :title="card.title"
      :body="card.value"
      :icon="card.icon"
      class="stat-card"
    >
    </base-card>
  </div>
</template>

<script setup lang="ts">
  import BaseCard from '@/components/BaseCard.vue'
  const statsData = shallowRef([
    { title: '用户量', value: '230', icon: 'solar:user-bold' },
    { title: '访问量', value: '3420', icon: 'twemoji:money-bag' },
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }

  @media screen and (width <= 1024px) {
    .stats-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (width <= 768px) {
    .stats-cards {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
