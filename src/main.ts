import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

// create app
const app = createApp(App)

// use plugins
app.use(router)

// mount app
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
