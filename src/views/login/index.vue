<template>
  <div class="container">
    <div class="inner-container">
      <div class="header">
        <p class="title">登录</p>
        <p class="subtitle">每一次登录都是与你の邂逅。</p>
      </div>
      <form class="form">
        <div class="form-group">
          <div class="input-block">
            <input class="input-field" placeholder="邮箱" type="email" />
          </div>
          <div class="input-block">
            <input class="input-field" placeholder="密码" type="password" />
          </div>
          <div class="checkbox-group">
            <div class="checkbox-block">
              <label class="checkbox-container">
                <input type="checkbox" name="checked-demo" value="1" class="checkbox" />
                <span class="checkbox-label">记住密码</span>
              </label>
            </div>
            <div class="link-group">
              <a class="link" href="">忘记密码</a>
              <a class="separator"> / </a>
              <router-link to="/register" class="link">注册</router-link>
            </div>
          </div>
        </div>
        <div class="button-block">
          <button class="submit-button" type="submit">登 录</button>
        </div>
      </form>
    </div>
    <div class="image-container">
      <div class="image-wrapper">
        <img src="https://cdn.jsdelivr.net/gh/MarleneJiang/ImgHosting/img/202109080857232.png" alt="" class="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--el-bg-color);
}
.image-section {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: var(--el-color-primary-light-9);
  transition: all 0.5s ease-in-out;
}
.image-section.right {
  order: 2;
}
.image-section.left {
  order: 1;
}
.image-section img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: all 0.5s ease-in-out;
}
.form-section {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  order: 1;
  padding: 20px;
  transition: all 0.5s ease-in-out;
}
.register-mode .form-section {
  order: 2;
}
.form-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
}
.title {
  margin-bottom: 30px;
  color: var(--el-text-color-primary);
  text-align: center;
}
.switch-form {
  margin-top: 20px;
  color: var(--el-color-primary);
  text-align: center;
  cursor: pointer;
}
.title-bar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
.title-bar button {
  padding: 5px 10px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  background: none;
  border: none;
  transition: background-color 0.3s;
}
.title-bar button:hover {
  background-color: var(--el-color-primary-light-8);
}
</style>
