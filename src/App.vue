<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
const isLoggedIn = ref(false)
onMounted(() => {
  const savedDark = localStorage.getItem('isDark') === 'true'
  if (savedDark !== useDark().value) {
    useToggle(useDark())()
  }
  const userInfo = localStorage.getItem('userInfo')
  isLoggedIn.value = !!userInfo
})
</script>
