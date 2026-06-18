import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { tokenStorage } from '@/utils/tokenStorage'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true,
        title: 'Home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        guestOnly: true,
        title: 'Sign in',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'Page not found',
      },
    },
  ],

  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore(pinia)
  const hasToken = tokenStorage.get() !== null

  if (hasToken && !authStore.isAuthenticated) {
    await authStore.fetchCurrentUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return {
      name: 'home',
    }
  }

  return true
})

router.afterEach((to) => {
  const applicationName = 'Roomspace'
  const pageTitle = to.meta.title

  document.title = pageTitle ? `${pageTitle} | ${applicationName}` : applicationName
})

export default router
