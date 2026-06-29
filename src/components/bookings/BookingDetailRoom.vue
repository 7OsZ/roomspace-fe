<script setup lang="ts">
import { BuildingOffice2Icon, MapPinIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

import type { BookingRoom } from '@/types/booking'

defineProps<{
  room: BookingRoom
}>()
</script>

<template>
  <section class="rounded bg-white px-5 py-5 shadow-xs">
    <h2 class="text-base leading-6 font-semibold text-slate-500">Room</h2>

    <div class="mt-3">
      <p class="text-lg leading-7 font-semibold text-slate-900">{{ room.name }}</p>
      <p class="mt-0.5 text-sm leading-5 text-slate-500">{{ room.code }}</p>
    </div>

    <div class="mt-4 divide-y divide-slate-100">
      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <MapPinIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Location</p>
        </div>
        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ room.location }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <UserGroupIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Capacity</p>
        </div>
        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ room.capacity }} People
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <BuildingOffice2Icon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Status</p>
        </div>
        <span
          class="inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold"
          :class="
            room.is_under_maintenance
              ? 'bg-amber-50 text-amber-700'
              : 'bg-emerald-50 text-emerald-700'
          "
        >
          {{ room.is_under_maintenance ? 'Under Maintenance' : 'Available' }}
        </span>
      </div>
    </div>
  </section>
</template>
