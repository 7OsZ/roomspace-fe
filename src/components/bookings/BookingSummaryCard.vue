<script setup lang="ts">
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline'

import type { Room } from '@/types/room'
import { getRoomImageUrl } from '@/utils/roomFormatter'

const props = defineProps<{
  room: Room
  dateLabel: string
  timeLabel: string
  durationLabel: string
}>()

const roomImageUrl = props.room.image ? getRoomImageUrl(props.room.image) : ''
</script>

<template>
  <section class="overflow-hidden rounded bg-white shadow-xs">
    <div class="relative h-48 bg-slate-200">
      <img
        v-if="roomImageUrl"
        :src="roomImageUrl"
        :alt="room.name"
        class="h-full w-full object-cover"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500"
      >
        No image available
      </div>

      <div
        class="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/70 to-transparent px-4 py-4"
      >
        <p class="text-xs leading-4 font-bold tracking-wide text-white uppercase">Selected Room</p>

        <h2 class="mt-1 text-2xl leading-7 font-semibold text-white">
          {{ room.name }}
        </h2>
      </div>
    </div>

    <div class="px-5 py-5">
      <h2 class="text-xl leading-8 font-bold text-slate-900">Booking Summary</h2>

      <div class="mt-4 divide-y divide-slate-100">
        <div class="flex items-center justify-between gap-4 py-3">
          <div class="flex items-center gap-2 text-slate-500">
            <MapPinIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Location</p>
          </div>

          <p class="text-right text-base leading-6 font-medium text-slate-900">
            {{ room.location }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-4 py-3">
          <div class="flex items-center gap-2 text-slate-500">
            <CalendarDaysIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Date</p>
          </div>

          <p class="text-right text-base leading-6 font-medium text-slate-900">
            {{ dateLabel }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-4 py-3">
          <div class="flex items-center gap-2 text-slate-500">
            <ClockIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Time</p>
          </div>

          <p class="text-right text-base leading-6 font-medium text-slate-900">
            {{ timeLabel }}
          </p>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-4">
        <div class="rounded bg-indigo-50 px-3 py-4 text-center">
          <p class="text-sm leading-5 font-normal text-slate-500">Duration</p>
          <p class="mt-1 text-base leading-6 font-medium text-slate-900">
            {{ durationLabel }}
          </p>
        </div>

        <div class="rounded bg-indigo-50 px-3 py-4 text-center">
          <p class="text-sm leading-5 font-normal text-slate-500">Capacity</p>
          <p class="mt-1 text-base leading-6 font-medium text-slate-900">
            {{ room.capacity }} People
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
