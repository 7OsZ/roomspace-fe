<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

import type { HomeHeroProps } from '@/types/home'

defineProps<HomeHeroProps>()
</script>

<template>
  <section class="mr-4 grid grid-cols-4">
    <div
      class="col-span-4 rounded-br-3xl rounded-bl-3xl rounded-tr-3xl bg-indigo-700 px-4 py-10 shadow-sm"
    >
      <h1 class="w-full text-3xl leading-10 font-bold text-white">{{ greeting }}, {{ name }}!</h1>

      <p class="mt-1 text-base leading-7 font-normal text-white">
        Book a meeting room that fits your schedule today.
      </p>

      <RouterLink
        :to="{ name: 'rooms' }"
        class="mt-4 inline-flex h-12 items-center gap-2 rounded bg-indigo-50 px-2.5 text-base font-semibold text-indigo-700 shadow-xs"
      >
        <MagnifyingGlassIcon class="size-6" />
        Find a Room
      </RouterLink>
    </div>
  </section>
</template>
