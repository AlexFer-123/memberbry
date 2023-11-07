import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/main'
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
      meta: {
        requiresAuth: true
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('aqui no router')
    if (useAuthStore.getters.isAuthenticated) { 
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})