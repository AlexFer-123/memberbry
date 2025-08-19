import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import DashboardAdmin from '@/views/DashBoard.vue'
import LessonEdit from '@/views/LessonEdit.vue'
import ConfigsAdmin from '@/views/ConfigsPage.vue'
import Signup from '@/views/SignUp.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      name: 'HomePage',
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'Login',
    },
    {
      path: '/register',
      component: RegisterPage,
      name: 'Register',
    },
    {
      path: '/signup',
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
      path: '/lessons/:id',
      component: LessonEdit,
      name: 'LessonEdit',
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
