import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import auth from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard/profile/:id',
      name: 'profile',
      component: () => import('../views/Dashboard/Profile.vue'),
      meta: {
        middleware: auth
      }
    },
    {
      path: '/dashboard/friends',
      name: 'friends',
      component: () => import('../views/Dashboard/Friends.vue')
    },
    {
      path: '/dashboard/inventory/:id',
      name: 'inventory',
      component: () => import('../views/Dashboard/Inventory.vue')
    },

  ]
})

export default router
