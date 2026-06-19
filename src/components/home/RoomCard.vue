<script setup lang="ts">
import { Cog6ToothIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

import type { RoomCardProps } from '@/types/home'

defineProps<RoomCardProps>()
</script>

<template>
  <article class="rounded-md bg-white px-2.5 py-3 shadow-xs">
    <div class="h-39.5 w-full overflow-hidden rounded bg-slate-200">
      <img v-if="image" :src="image" :alt="name" class="h-full w-full object-cover" />

      <div
        v-else
        class="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500"
      >
        No image
      </div>
    </div>

    <div class="mt-4">
      <div class="flex items-start justify-between">
        <div class="min-w-0">
          <h3 class="text-base leading-4 font-semibold text-slate-900">
            {{ name }}
          </h3>

          <p class="mt-1 text-xs leading-4 font-normal text-slate-900">
            {{ floor }}
          </p>
        </div>

        <div class="flex shrink-0 items-center gap-1.5 pt-1 text-slate-950">
          <UserGroupIcon class="size-5" />

          <p class="text-[13px] leading-5">
            {{ capacity }}
          </p>
        </div>
      </div>

      <div class="mt-2 flex items-center gap-2 text-slate-950">
        <Cog6ToothIcon class="size-4.5 shrink-0" />

        <p class="text-xs leading-4 font-normal">
          {{ facilities }}
        </p>
      </div>

      <RouterLink
        :to="{ name: 'room-detail', params: { slug } }"
        class="mt-4 flex h-11 w-full items-center justify-center rounded bg-indigo-700 px-1.5 py-2.5 text-base font-semibold text-slate-50 shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
      >
        View Room
      </RouterLink>
    </div>
  </article>
</template>
