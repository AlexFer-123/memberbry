import { createApp } from 'vue'
import App from './App.vue'
import './global.css'
import { createPinia } from 'pinia'
import { router } from './router/index.js'

const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)
app.mount('#app')
