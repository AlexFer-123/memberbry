import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './global.css'
import { createPinia } from 'pinia'

import Home from './views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'HomePage',
    },
  ],
})


const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)
app.mount('#app')
