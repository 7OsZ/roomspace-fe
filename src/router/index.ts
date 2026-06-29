import { createRouter, createWebHistory } from 'vue-router'

import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { tokenStorage } from '@/utils/tokenStorage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: 'Home',
          },
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: () => import('@/views/rooms/RoomsView.vue'),
          meta: {
            title: 'Rooms',
          },
        },
        {
          path: 'rooms/:slug',
          name: 'room-detail',
          component: () => import('@/views/rooms/RoomDetailView.vue'),
          meta: {
            title: 'Room Detail',
          },
        },
        {
          path: '/rooms/:slug/booking/confirm',
          name: 'booking-confirmation',
          component: () => import('@/views/bookings/BookingConfirmationView.vue'),
          meta: {
            title: 'Confirm Booking',
          },
        },

        {
          path: 'bookings/success',
          name: 'booking-success',
          component: () => import('@/views/bookings/BookingSuccessView.vue'),
          meta: {
            title: 'Booking Success',
          },
        },
        {
          path: 'bookings',
          name: 'my-bookings',
          component: () => import('@/views/bookings/MyBookingsView.vue'),
          meta: {
            title: 'My Bookings',
          },
        },

        {
          path: 'bookings/:id',
          name: 'booking-detail',
          component: () => import('@/views/bookings/BookingDetailView.vue'),
          meta: {
            title: 'Booking Detail',
          },
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('@/views/NotificationsView.vue'),
          meta: {
            title: 'Notifications',
          },
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/AccountView.vue'),
          meta: {
            title: 'Account',
          },
        },
      ],
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
