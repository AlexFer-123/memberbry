import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './global.css'

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
app.use(router)
app.mount('#app')
