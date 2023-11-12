import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import DashboardAdmin from '@/views/DashBoard.vue'
import ConfigsAdmin from '@/views/ConfigsPage.vue'
import Signup from '@/views/SignUp.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'HomePage',
    },
    {
      path: '/register',
      component: Signup,
      name: 'SignUp',
    },
    {
      path: '/dashboard',
      component: DashboardAdmin,
      name: 'Dashboard',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/configs',
      component: ConfigsAdmin,
      name: 'Configurações',
      meta: {
        requiresAuth: true
      }
    },
  ],
})
