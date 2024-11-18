<template>
  <el-switch
    v-model="isDark"
    inline-prompt
    active-color="var(--el-fill-color-dark)"
    inactive-color="var(--el-color-primary)"
    @change="toggleDark"
  />
  <el-button>哈哈哈哈哈<IconSolarSunBold /></el-button>
</template>

<script setup lang="ts">
//  import IconEpSunny from '~icons/ep/sunny';
//  import IconEpMoon from '~icons/ep/moon';

const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>
