<template>
  <div v-bind="$attrs" class="chart"></div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string
    width?: string
  }>(),
  {
    height: '300px',
    width: '100%'
  }
)
</script>
<style>
.chart {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
