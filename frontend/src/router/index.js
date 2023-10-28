import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import DashboardAdmin from '../views/DashBoard.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home,
        name: 'HomePage',
      },
      {
        path: '/dashboard',
        component: DashboardAdmin,
        name: 'DashboardAdmin',
      },
    ],
  })