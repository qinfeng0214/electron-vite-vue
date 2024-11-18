<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-form>
        <el-form-item>
          <el-input v-model="formState.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formState.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%"> 登录 </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const loading = ref(false)
const formState = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    loading.value = true
    // 模拟登录验证逻辑
    if (formState.username && formState.password) {
      window.electronAPI.login()
    } else {
      throw new Error('用户名和密码不能为空')
    }
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--el-bg-color);
  .login-card {
    width: 350px;
  }
}
</style>
