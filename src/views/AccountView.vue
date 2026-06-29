<script setup lang="ts">
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

import AccountProfileCard from '@/components/account/AccountProfileCard.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-12">
        <h1 class="text-3xl leading-10 font-bold text-slate-900 md:text-4xl md:leading-11">
          Account
        </h1>
        <p class="mt-1 text-base leading-6 text-slate-500">Your profile and preferences.</p>
      </div>
    </section>

    <section class="mt-5 grid grid-cols-4 gap-x-5 gap-y-4 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-5">
        <AccountProfileCard v-if="authStore.user" :user="authStore.user" />
      </div>

      <div class="col-span-4 md:col-span-5">
        <section class="rounded bg-white px-5 py-5 shadow-xs">
          <h2 class="text-base font-semibold leading-6 text-slate-900">Danger Zone</h2>
          <p class="mt-1 text-sm leading-5 text-slate-500">
            Once you log out, you will need to sign in again to access RoomSpace.
          </p>

          <button
            type="button"
            class="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded bg-white text-sm font-semibold text-red-600 shadow-xs outline-1 -outline-offset-1 outline-red-200 transition hover:bg-red-50 active:bg-red-100 md:w-auto md:px-5"
            @click="handleLogout"
          >
            <ArrowRightStartOnRectangleIcon class="size-4 stroke-2" />
            Log out
          </button>
        </section>
      </div>
    </section>
  </div>
</template>
