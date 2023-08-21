import { createApp } from 'vue'
import './assets/css/tailwind'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const store = createPinia()
app.use(store)
app.use(router)
app.mount('#app')
