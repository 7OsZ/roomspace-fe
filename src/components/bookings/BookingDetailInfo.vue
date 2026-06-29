<script setup lang="ts">
import { CalendarDaysIcon, ClockIcon, HashtagIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

import BookingStatusBadge from '@/components/bookings/BookingStatusBadge.vue'
import type { Booking } from '@/types/booking'

defineProps<{
  booking: Booking
  dateLabel: string
  timeLabel: string
  durationLabel: string
}>()
</script>

<template>
  <section class="rounded bg-white px-5 py-5 shadow-xs">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 class="text-lg leading-7 font-semibold text-slate-900">
          {{ booking.title }}
        </h2>

        <div class="mt-1 flex items-center gap-1.5 text-slate-500">
          <HashtagIcon class="size-4 shrink-0 stroke-2" />
          <p class="text-xs leading-4">{{ booking.booking_number }}</p>
        </div>
      </div>

      <BookingStatusBadge :status="booking.status" />
    </div>

    <div v-if="booking.description" class="mt-4">
      <p class="text-sm leading-5 text-slate-500">Description</p>
      <p class="mt-1 text-sm leading-5 text-slate-700">{{ booking.description }}</p>
    </div>

    <div class="mt-5 divide-y divide-slate-100">
      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <CalendarDaysIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Date</p>
        </div>
        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ dateLabel }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <ClockIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Time</p>
        </div>
        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ timeLabel }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <UserGroupIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Participants</p>
        </div>
        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ booking.participant_count }} People
        </p>
      </div>
    </div>

    <div class="mt-5 rounded bg-indigo-50 px-4 py-4 text-center">
      <p class="text-xs leading-4 text-slate-500">Duration</p>
      <p class="mt-1 text-base leading-6 font-semibold text-slate-900">
        {{ durationLabel }}
      </p>
    </div>
  </section>
</template>
