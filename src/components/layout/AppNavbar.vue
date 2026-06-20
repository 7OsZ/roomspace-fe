<script setup lang="ts">
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="bg-white">
    <div
      class="grid h-12 grid-cols-4 items-center gap-x-5 px-4 md:h-18 md:grid-cols-12 md:gap-x-6 md:px-16"
    >
      <div class="col-span-2 md:col-span-3">
        <RouterLink :to="{ name: 'home' }" class="text-xl font-bold text-indigo-700 md:text-2xl">
          Roomspace
        </RouterLink>
      </div>

      <nav class="hidden md:col-span-6 md:flex md:items-center md:justify-center md:gap-6">
        <RouterLink v-slot="{ isExactActive }" :to="{ name: 'home' }">
          <span
            class="text-sm font-medium transition hover:text-indigo-800"
            :class="isExactActive ? 'text-indigo-700' : 'text-slate-500'"
          >
            Home
          </span>
        </RouterLink>

        <RouterLink v-slot="{ isActive }" :to="{ name: 'rooms' }">
          <span
            class="text-sm font-medium transition hover:text-indigo-800"
            :class="isActive ? 'text-indigo-700' : 'text-slate-500'"
          >
            Rooms
          </span>
        </RouterLink>

        <button
          type="button"
          class="text-sm font-medium text-slate-500 transition hover:text-indigo-800"
        >
          My Bookings
        </button>
      </nav>

      <div
        class="col-span-2 flex items-center justify-end gap-6 text-slate-600 md:col-start-12 md:col-span-1"
      >
        <button type="button" aria-label="Open notifications">
          <BellIcon class="size-5 md:size-6" />
        </button>

        <button type="button" aria-label="Open profile" class="hidden md:block">
          <UserCircleIcon class="size-7 text-slate-900" />
        </button>

        <button type="button" aria-label="Open menu" class="md:hidden">
          <Bars3Icon class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>
