<template>
  <div class="reset-password-form">
    <div class="header">
      <p class="title">重置密码</p>
      <p class="subtitle">请输入您的邮箱以重置密码。</p>
    </div>
    <el-form :model="resetForm" :rules="resetRules" ref="resetFormRef" class="form">
      <!-- 账号 -->
      <el-form-item prop="account_id">
        <el-input class="input-field" v-model="resetForm.account_id" placeholder="账号">
          <template #prefix>
            <IconMdiUser />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="security_key" class="form-item">
        <el-input class="input-field" v-model="resetForm.security_key" placeholder="安全密钥">
          <template #prefix>
            <IconMdiSecurity />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input class="input-field" v-model="resetForm.password" type="password" placeholder="新密码">
          <template #prefix>
            <IconMdiPassword />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword" class="form-item">
        <el-input class="input-field" v-model="resetForm.confirmPassword" type="password" placeholder="再次输入密码">
          <template #prefix>
            <IconMdiPassword />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <router-link to="/login" class="link">返回登录</router-link>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button class="submit-button" type="primary" @click="onSubmit">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { resetPassword } from '@/api/user'
  import type { FormInstance } from 'element-plus'

  const router = useRouter()

  const resetFormRef = ref<FormInstance>()
  const resetForm = reactive({
    account_id: '',
    // 密钥Security Key
    security_key: '',
    // 新密码
    password: '',
    // 确认密码
    confirmPassword: ''
  })

  const resetRules = ref({
    email: [{ required: true, message: '请输入安全密钥', trigger: 'blur' }]
  })

  const onSubmit = async () => {
    if (!resetFormRef.value) return

    try {
      await resetFormRef.value.validate()
      // 构建重置密码参数
      const resetParams = {
        account_id: resetForm.account_id,
        security_key: resetForm.security_key,
        password: resetForm.password
      }
      const response = await resetPassword(resetParams)

      if (response.success) {
        ElMessage.success('密码重置成功！')
        router.push('/login')
      } else {
        ElMessage.error(response.message || '密码重置失败')
      }
    } catch (error) {
      console.error('重置密码失败:', error)
    }
  }
</script>

<style scoped lang="scss">
  .reset-password-form {
    width: 400px;
    padding: 32px;
    background: linear-gradient(117.76deg, rgb(255 255 255 / 70%) -7.21%, rgb(255 255 255 / 50%) 118.08%);
    backdrop-filter: blur(8px);
    border-radius: var(--el-border-radius-base);
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  }
  .header {
    margin-bottom: 24px;
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
    gap: 16px;
  }
  .form-item {
    width: 100%;
  }
  :deep(.el-form-item__content) {
    display: flex;
    justify-content: flex-end;
  }
  .input-field {
    width: 100%;
    height: 48px;
    border-color: #d4d4d8;
  }
  .submit-button {
    width: 100%;
    height: 48px;
    font-size: 20px;
    letter-spacing: 3px;
  }
  .link {
    font-size: 16px;
    color: #f56692;
  }
</style>
