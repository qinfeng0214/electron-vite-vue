import type { EChartsOption } from 'echarts'

import type EchartsUI from './echarts-ui.vue'

import type { Ref } from 'vue'
import { computed, nextTick, watch } from 'vue'

import echarts from './echarts'

type EchartsUIType = typeof EchartsUI | undefined

type EchartsThemeType = 'dark' | 'light' | null

function useEcharts(chartRef: Ref<EchartsUIType>) {
  let chartInstance: echarts.ECharts | null = null
  let cacheOptions: EChartsOption = {}

  const isDark = useDark()
  const { height, width } = useWindowSize()
  const resizeHandler: () => void = useDebounceFn(resize, 200)

  const getOptions = computed((): EChartsOption => {
    if (!isDark.value) {
      return cacheOptions
    }

    return {
      backgroundColor: 'transparent',
      ...cacheOptions
    }
  })

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el
    if (!el) {
      return
    }
    chartInstance = echarts.init(el, t || isDark.value ? 'dark' : null)

    return chartInstance
  }

  const renderEcharts = (options: EChartsOption, clear = true) => {
    cacheOptions = options
    return new Promise(resolve => {
      if (chartRef.value?.offsetHeight === 0) {
        useTimeoutFn(() => {
          renderEcharts(getOptions.value)
          resolve(null)
        }, 30)
        return
      }
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            const instance = initCharts()
            if (!instance) return
          }
          clear && chartInstance?.clear()
          chartInstance?.setOption(getOptions.value)
          resolve(null)
        }, 30)
      })
    })
  }

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  watch([width, height], () => {
    resizeHandler?.()
  })

  useResizeObserver(chartRef as never, resizeHandler)

  watch(isDark, () => {
    if (chartInstance) {
      chartInstance.dispose()
      initCharts()
      renderEcharts(cacheOptions)
      resize()
    }
  })

  tryOnUnmounted(() => {
    // 销毁实例，释放资源
    chartInstance?.dispose()
  })
  return {
    renderEcharts,
    resize
  }
}

export { useEcharts }

export type { EchartsUIType }
