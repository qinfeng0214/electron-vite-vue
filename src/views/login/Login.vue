<template>
  <transition name="slide-right">
    <div class="container" v-if="showLogin">
      <div class="inner-container">
        <div class="header">
          <p class="title">登录</p>
          <p class="subtitle">每一次登录都是与你の邂逅。</p>
        </div>
        <el-form class="form" ref="formRef" :model="form" :rules="rules" status-icon>
          <el-form-item prop="username">
            <el-input class="input-field" v-model="form.username" placeholder="账号">
              <template #prefix>
                <IconMdiUser />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y" prop="password">
            <el-input class="input-field" v-model="form.password" type="password" placeholder="密码">
              <template #prefix>
                <IconMdiPassword />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y" prop="remember">
            <el-checkbox v-model="form.isRemember" label="记住密码" size="large" />
            <div class="link-group">
              <router-link to="/forget" class="link">忘记密码</router-link>
              <a class="separator">/</a>
              <router-link to="/register" class="link" @click="() => !showLogin">注册</router-link>
            </div>
          </el-form-item>
          <el-form-item class="space-y">
            <el-button class="submit-button" type="primary" @click="onSubmit">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="image-container">
        <div class="image-wrapper">
          <!-- <img src="https://cdn.jsdelivr.net/gh/MarleneJiang/ImgHosting/img/202109080857232.png" alt=""> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
onMounted(() => (showLogin.value = true))
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter()
const formRef = ref<FormInstance>()
const form = ref({
  username: '',
  password: '',
  isRemember: false
})
const rules = ref<FormRules>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const showLogin = ref(false)

const onSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    // 模拟登录成功
    window.electronAPI.login()
    router.push('/analytics')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
// const resetForm = () => {
//   if (!formRef.value) return
//   formRef.value.resetFields()
// }
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-grow: 1;
  max-width: 820px;
}
.inner-container {
  width: 50%;
  padding: 32px 24px;
  background: var(--base-bg-color);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
}
.header {
  margin-bottom: 1.75rem;
}
.title {
  margin-bottom: 8px;
  font-size: 36px;
  line-height: 40px;
  color: #f56692;
}
.subtitle {
  margin-top: 14px;
  color: #6b7280;
}
.form {
  margin-top: 28px;
}
.el-form-item {
  margin-bottom: 0;
}
.space-y {
  margin-top: 24px;
}
.input-field {
  width: 100%;
  height: 48px;
  border-color: #d4d4d8;
}
:deep(.el-form-item__content) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
:deep(.el-checkbox__inner) {
  width: 16px !important;
  height: 16px !important;
}
:deep(.el-checkbox__label) {
  font-size: 16px !important;
}
.link-group {
  display: flex;
  align-items: center;
}
.link {
  font-size: 16px;
  color: #f56692;
}
.separator {
  margin: 0 4px;
  font-size: 16px;
}
.submit-button {
  width: 100%;
  height: 48px;
  font-size: 20px;
  letter-spacing: 3px;
}
.image-container {
  width: 50%;
  background: var(--base-bg-color-1);
  backdrop-filter: blur(8px);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.image-wrapper {
  width: 83%;
  height: 100%;
  img {
    width: 375px;
    height: 574.5px;
    margin-top: -80px;
    margin-left: 16px;
  }
}
</style>
