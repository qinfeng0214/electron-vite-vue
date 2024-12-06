<template>
  <div class="dashboard-container">
    <!-- 顶部统计卡片 -->
    <StatisticsCards />

    <!-- 流量趋势图 -->
    <div class="chart-container">
      <el-card>
        <div class="chart-header">
          <el-radio-group v-model="selectedChart">
            <el-radio-button value="flow">流量趋势</el-radio-button>
            <el-radio-button value="visit">月访问量</el-radio-button>
          </el-radio-group>
        </div>
        <flow-trend-chart v-if="selectedChart === 'flow'" />
        <visit-trend-chart v-else />
      </el-card>
    </div>
    <!-- 底部统计图表 -->
    <div class="bottom-charts">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card header="访问数量">
            <!-- <EchartsUI ref="radarChartRef" /> -->
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <!-- <EchartsUI ref="pieChartRef" /> -->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FlowTrendChart from './FlowTrendChart.vue'
  import VisitTrendChart from './VisitTrendChart.vue'
  import StatisticsCards from './StatisticsCards.vue'

  const selectedChart = ref('flow')
</script>

<style scoped>
  .chart-container {
    margin-bottom: 20px;
  }
  .chart-header {
    display: flex;
    margin-bottom: 10px;
  }
  .bottom-charts {
    margin-top: 20px;
  }
</style>
