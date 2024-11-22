<template>
  <transition name="slide-fade">
    <div class="container" v-if="showRegister">
      <div class="image-container">
        <div class="image-wrapper">
          <!-- <img src="../../../public/register.png" alt="" /> -->
        </div>
      </div>
      <div class="inner-container">
        <div class="header">
          <p class="title">注册</p>
          <p class="subtitle">期待与你在新の世界邂逅。</p>
        </div>
        <el-form class="form" ref="formRef" :model="registerForm" :rules="registerRules" status-icon>
          <el-form-item prop="nickname" class="form-item">
            <el-input class="input-field" v-model="registerForm.nickname" placeholder="用户名">
              <template #prefix>
                <IconMdiUser />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="username" class="form-item">
            <el-input class="input-field" v-model="registerForm.username" placeholder="账号">
              <template #prefix>
                <IconMdiUser />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y form-item" prop="password">
            <el-input class="input-field" v-model="registerForm.password" type="password" placeholder="密码">
              <template #prefix>
                <IconMdiPassword />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y form-item" prop="confirmPassword">
            <el-input
              class="input-field"
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="再次输入密码"
            >
              <template #prefix>
                <IconMdiPassword />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y form-item" prop="security_key">
            <el-input class="input-field" v-model="registerForm.security_key" type="password" placeholder="安全密钥">
              <template #prefix>
                <IconMdiSecurity />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="space-y half-width-right">
            <router-link to="/login" class="link">已有账号?登录</router-link>
          </el-form-item>
          <el-form-item class="space-y full-width">
            <el-button class="submit-button" type="primary" @click="onSubmit">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter()
const loading = ref(false)
const registerFormRef = ref<FormInstance>()
const registerForm = ref({
  nickname: '',
  username: '',
  password: '',
  confirmPassword: '',
  security_key: ''
})
const registerRules = ref<FormRules>({
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      pattern: /^[0-9]{6,10}$/,
      message: '账号必须是 6-10 位数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 密码必须包含大小写字母、数字、特殊符号中的两种以上，且长度为 8-16 位
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![^0-9a-zA-Z]+$).{8,16}$/,
      message: '密码必须包含大小写字母、数字、特殊符号中的两种以上，且长度为 8-16 位',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  security_key: [
    { required: true, message: '请输入安全密钥', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z]{6}$/,
      message: '安全密钥必须是 6 位数字、字母组成',
      trigger: 'blur'
    }
  ]
})

const showRegister = ref(false)
onMounted(() => (showRegister.value = true))

const onSubmit = async () => {
  if (!registerFormRef.value) return
  try {
    loading.value = true
    await registerFormRef.value.validate()
    // TODO
    console.log('register:', registerForm.value)
    // 注册成功，跳转到登录页
    router.push('/login')
  } catch (error) {
    console.error('Register failed:', error)
  } finally {
    loading.value = false
  }
}
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
  background: rgb(255 255 255 / 80%);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  margin-top: 28px;
}
.form-item {
  width: 100%;
}
.half-width-right {
  grid-column: 2 / 3; /* 占据第二列 */
}
.full-width {
  grid-column: span 2;
}
:deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
:deep(.el-form-item) {
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
.link {
  font-size: 16px;
  color: #f56692;
}
.submit-button {
  width: 100%;
  height: 48px;
  font-size: 20px;
  letter-spacing: 3px;
}
.image-container {
  width: 50%;
  background: linear-gradient(117.76deg, rgb(255 255 255 / 70%) -7.21%, rgb(255 255 255 / 50%) 118.08%);
  backdrop-filter: blur(8px);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
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
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
