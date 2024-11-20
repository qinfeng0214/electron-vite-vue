import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'

// styles
import './styles/index.scss'

// create app
const app = createApp(App)

// use plugins
app.use(router)
app.use(ElementPlus)

// mount app
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
