<template>
  <div class="container">
    <div class="inner-container">
      <div class="header">
        <p class="title">登录</p>
        <p class="subtitle">每一次登录都是与你の邂逅。</p>
      </div>
      <form class="form">
        <div>
          <div class="input-block">
            <!-- <input
              class="input-field" placeholder="邮箱"
              type="email"> -->
            <el-input class="input-field" placeholder="账号"></el-input>
          </div>
          <div class="input-block space-y">
            <!-- <input class="input-field" placeholder="密码" type="password" /> -->
            <el-input class="input-field" placeholder="密码"></el-input>
          </div>
          <div class="checkbox-group space-y">
            <div class="checkbox-block">
              <label class="checkbox-container">
                <input type="checkbox" name="checked-demo" value="1" class="checkbox" />
                <span class="checkbox-label">记住密码</span>
              </label>
            </div>
            <div class="link-group">
              <a class="link" href="">忘记密码</a>
              <a class="separator">/</a>
              <router-link to="/register" class="link">注册</router-link>
            </div>
          </div>
        </div>
        <div class="button-block">
          <!-- <button class="submit-button" type="submit">登 录</button> -->
          <el-button class="submit-button">登 录</el-button>
        </div>
      </form>
    </div>
    <div class="image-container">
      <div class="image-wrapper">
        <img src="https://cdn.jsdelivr.net/gh/MarleneJiang/ImgHosting/img/202109080857232.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  color: #6b7280;
}
.form {
  margin-top: 28px;
}
.input-block {
  display: block;
}
.space-y {
  margin-top: 24px;
}
.input-field {
  width: 100%;
  height: 48px;
  border-color: #d4d4d8;
  border-radius: 8px !important;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.input-field:focus {
  border-color: #f56692;
  box-shadow: 0 0 0 1px #f56692;
}
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
}
.checkbox-block {
  grid-column: 1 / 4;
}
.checkbox-container {
  display: flex;
  gap: 12px;
  align-items: center;
}
.checkbox {
  width: 1rem;
  height: 1rem;
  appearance: none;
  background-color: #fff;
  border: 1px solid #d4d4d8;
  border-radius: 0.25rem;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}
.checkbox:checked {
  background-color: #f56692;
  border-color: transparent;
}
.checkbox:focus {
  outline: none;
}
.checkbox-label {
  font-weight: 500;
  color: #6b7280;
}
.link-group {
  grid-column: span 3 / span 3;
  grid-column-end: 8;
}
.link {
  color: #f56692;
}
.separator {
  margin: 0 8px;
}
.button-block {
  margin-top: 28px;
}
.submit-button {
  width: 100%;
  height: 48px;
  font-size: 1.5rem;
  color: #fff;
  letter-spacing: 0.1em;
  background-color: #f56692;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.submit-button:hover,
.submit-button:focus {
  background-color: #f34278;
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
  img{
    width:375px;
    height: 574.5px;
    margin-top: -80px;
    margin-left:16px;
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
