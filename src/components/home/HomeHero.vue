<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

import type { HomeHeroProps } from '@/types/home'

defineProps<HomeHeroProps>()
</script>

<template>
  <section class="mr-4 grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6 md:px-16 md:mr-0">
    <div
      class="col-span-4 rounded-br-3xl rounded-bl-3xl rounded-tr-3xl bg-indigo-700 px-4 py-10 shadow-sm md:grid-cols-12 md:grid md:col-span-12 md:items-center md:gap-x-6 md:rounded-tr-none md:px-6 md:py-8 md:h-41.25 md:shadow"
    >
      <div class="md:col-span-9">
        <h1 class="w-full text-3xl leading-10 font-bold text-white md:text-3xl">
          {{ greeting }}, {{ name }}!
        </h1>

        <p class="mt-1 text-base leading-7 font-normal text-white md:text-base">
          Book a meeting room that fits your schedule today.
        </p>
      </div>

      <div class="mt-4 md:col-span-3 md:mt-0 md:flex md:justify-center">
        <RouterLink
          :to="{ name: 'rooms' }"
          class="inline-flex h-12 items-center gap-2 rounded bg-indigo-50 px-3 py-3.5 text-base font-semibold text-indigo-700 shadow-xs"
        >
          <MagnifyingGlassIcon class="size-6" />
          Find a Room
        </RouterLink>
      </div>
    </div>
  </section>
</template>
