import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'

// styles
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// create app
const app = createApp(App)

// use plugins
app.use(router)
app.use(ElementPlus)

// mount app
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
