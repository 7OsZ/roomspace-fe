<script setup lang="ts">
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/40"
        aria-hidden="true"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div class="flex h-14 items-center justify-between px-5">
          <RouterLink :to="{ name: 'home' }" class="text-xl font-bold text-indigo-700">
            Roomspace
          </RouterLink>

          <button
            type="button"
            class="text-slate-400 transition hover:text-slate-600"
            aria-label="Close menu"
            @click="emit('close')"
          >
            <XMarkIcon class="size-5 stroke-2" />
          </button>
        </div>

        <div class="h-px bg-slate-100" />

        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <ul class="space-y-2">
            <li>
              <RouterLink v-slot="{ isExactActive }" :to="{ name: 'home' }">
                <span
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    isExactActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  "
                >
                  <HomeIcon class="size-5 shrink-0 stroke-2" />
                  Home
                </span>
              </RouterLink>
            </li>

            <li>
              <RouterLink v-slot="{ isActive }" :to="{ name: 'rooms' }">
                <span
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  "
                >
                  <CalendarDaysIcon class="size-5 shrink-0 stroke-2" />
                  Rooms
                </span>
              </RouterLink>
            </li>

            <li>
              <RouterLink v-slot="{ isActive }" :to="{ name: 'my-bookings' }">
                <span
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  "
                >
                  <CalendarDaysIcon class="size-5 shrink-0 stroke-2" />
                  My Bookings
                </span>
              </RouterLink>
            </li>

            <li>
              <RouterLink v-slot="{ isActive }" :to="{ name: 'notifications' }">
                <span
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  "
                >
                  <BellIcon class="size-5 shrink-0 stroke-2" />
                  Notifications
                </span>
              </RouterLink>
            </li>

            <li>
              <RouterLink v-slot="{ isActive }" :to="{ name: 'account' }">
                <span
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  "
                >
                  <UserCircleIcon class="size-5 shrink-0 stroke-2" />
                  Account
                </span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="h-px bg-slate-100" />

        <div class="px-3 py-4">
          <div v-if="authStore.user" class="mb-3 px-3 py-2">
            <p class="text-sm font-semibold text-slate-900">{{ authStore.user.name }}</p>
            <p class="mt-0.5 text-xs text-slate-400">{{ authStore.user.email }}</p>
          </div>

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            @click="handleLogout"
          >
            <ArrowRightStartOnRectangleIcon class="size-5 shrink-0 stroke-2" />
            Log out
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
