<script setup lang="ts">
import {
  CalendarDaysIcon,
  ClockIcon,
  HashtagIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline'

import BookingStatusBadge from '@/components/bookings/BookingStatusBadge.vue'
import type { Booking } from '@/types/booking'
import { formatReadableDate, formatTimeRange } from '@/utils/dateFormatter'
import { useRouter } from 'vue-router'

const props = defineProps<{
  booking: Booking
}>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'booking-detail', params: { id: props.booking.id } })
}
</script>

<template>
  <article
    class="cursor-pointer rounded bg-white px-4 py-4 shadow-xs transition hover:shadow-md"
    role="button"
    :aria-label="`View booking ${booking.booking_number}`"
    @click="goToDetail"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 class="truncate text-base leading-6 font-semibold text-slate-900">
          {{ booking.title }}
        </h2>

        <div class="mt-1 flex items-center gap-1.5 text-slate-500">
          <HashtagIcon class="size-4 shrink-0 stroke-2" />
          <p class="truncate text-xs leading-4">
            {{ booking.booking_number }}
          </p>
        </div>
      </div>

      <BookingStatusBadge :status="booking.status" />
    </div>

    <div class="mt-4 rounded bg-slate-50 px-3 py-3">
      <p class="text-sm leading-5 font-semibold text-slate-900">
        {{ booking.room.name }}
      </p>

      <div class="mt-1 flex items-center gap-1.5 text-slate-500">
        <MapPinIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
        <p class="text-xs leading-4">
          {{ booking.room.location }}
        </p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-slate-500">
          <CalendarDaysIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Date</p>
        </div>

        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ formatReadableDate(booking.start_datetime) }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-slate-500">
          <ClockIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Time</p>
        </div>

        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ formatTimeRange(booking.start_datetime, booking.end_datetime) }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-slate-500">
          <UserGroupIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Participants</p>
        </div>

        <p class="text-right text-sm leading-5 font-medium text-slate-900">
          {{ booking.participant_count }} People
        </p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-3">
      <div class="rounded bg-indigo-50 px-3 py-3 text-center">
        <p class="text-xs leading-4 text-slate-500">Duration</p>
        <p class="mt-1 text-sm leading-5 font-semibold text-slate-900">
          {{ booking.duration_in_hours }}
          {{ booking.duration_in_hours === 1 ? 'Hour' : 'Hours' }}
        </p>
      </div>

      <div class="rounded bg-indigo-50 px-3 py-3 text-center">
        <p class="text-xs leading-4 text-slate-500">Capacity</p>
        <p class="mt-1 text-sm leading-5 font-semibold text-slate-900">
          {{ booking.room.capacity }} People
        </p>
      </div>
    </div>
  </article>
</template>
