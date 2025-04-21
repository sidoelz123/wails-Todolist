import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, SigninView, SignupView } from '@/views'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
    meta: { guestOnly: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: { guestOnly: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/signin')
  } else if (to.meta.guestOnly && token) {
    next('/')
  } else {
    next()
  }
})

export default router
