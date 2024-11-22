<template>
  <div class="container">
    <div class="inner-container">
      <div class="header">
        <p class="title">登录</p>
        <p class="subtitle">每一次登录都是与你の邂逅。</p>
      </div>
      <el-form class="form" :model="form">
        <el-form-item>
          <el-input class="input-field" v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item class="space-y">
          <el-input class="input-field" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="space-y">
          <el-checkbox v-model="form.isRemember" label="记住密码" size="large" />
          <div class="link-group">
            <a class="link" href="">忘记密码</a>
            <a class="separator">/</a>
            <router-link to="/register" class="link">注册</router-link>
          </div>
        </el-form-item>
        <el-form-item class="space-y">
          <el-button class="submit-button" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="image-container">
      <div class="image-wrapper">
        <!-- <img src="https://cdn.jsdelivr.net/gh/MarleneJiang/ImgHosting/img/202109080857232.png" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  username: '',
  password: '',
  isRemember: false
})
</script>

<style>
.container {
  display: flex;
  flex-grow: 1;
  max-width: 820px;
}
.inner-container {
  width: 50%;
  padding: 32px 24px;
  background: rgb(255 255 255 / 80%);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
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
.el-form-item__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.el-checkbox__inner {
  width: 16px !important;
  height: 16px !important;
}
.el-checkbox__label {
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
  background: linear-gradient(117.76deg, rgb(255 255 255 / 70%) -7.21%, rgb(255 255 255 / 50%) 118.08%);
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
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://cdn.jsdelivr.net/gh/MarleneJiang/ImgHosting/img/202109041905856.png');
  background-attachment: fixed;
  background-size: cover;
}
</style>
