<template>
  <EchartsUI ref="chartRef" :options="chartOptions" style="height: 400px" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { EchartsUI, type EchartsUIType, useEcharts } from '@/components/echarts'
import type { EChartsOption } from 'echarts'
// import { getVisitTrendData } from '@/api/dashboard'

const chartRef = ref<EchartsUIType>()
const { renderEcharts } = useEcharts(chartRef)

const chartOptions = ref<EChartsOption>({
  grid: {
    bottom: 0,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2 %'
  },
  series: [
    {
      barMaxWidth: 80,
      // color: '#4f69fd',
      data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
      type: 'bar'
    }
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        // color: '#4f69fd',
        width: 1
      }
    },
    trigger: 'axis'
  },
  xAxis: {
    data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`),
    type: 'category'
  },
  yAxis: {
    max: 8000,
    splitNumber: 4,
    type: 'value'
  }
})

onMounted(async () => {
  try {
    // const data = await getVisitTrendData()
    // chartOptions.value.series[0].data = data
    renderEcharts(chartOptions.value as any)
  } catch (error) {
    console.error('获取访问量趋势数据失败:', error)
  }
})
</script>
