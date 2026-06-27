<script setup lang="ts">
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

defineProps<{
  meetingTitle: string
  roomName: string
  location: string
  dateLabel: string
  timeLabel: string
  participantCount: string
  duration: string
}>()
</script>

<template>
  <section class="rounded bg-white px-5 py-5 shadow-xs md:px-6">
    <h2 class="text-lg leading-6 font-semibold text-slate-900">Booking Summary</h2>

    <div class="mt-5">
      <p class="text-sm leading-5 text-slate-500">Meeting Title</p>
      <p class="mt-1 text-base leading-6 font-semibold text-slate-900">
        {{ meetingTitle || '-' }}
      </p>
    </div>

    <div class="mt-5 divide-y divide-slate-100">
      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <MapPinIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Room</p>
        </div>

        <div class="text-right">
          <p class="text-base leading-6 font-semibold text-slate-900">
            {{ roomName || '-' }}
          </p>
          <p class="text-sm leading-5 text-slate-500">
            {{ location || '-' }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <CalendarDaysIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Date</p>
        </div>

        <p class="text-right text-base leading-6 font-semibold text-slate-900">
          {{ dateLabel }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <ClockIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Time</p>
        </div>

        <p class="text-right text-base leading-6 font-semibold text-slate-900">
          {{ timeLabel }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <UserGroupIcon class="size-5 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Participants</p>
        </div>

        <p class="text-right text-base leading-6 font-semibold text-slate-900">
          {{ participantCount || '-' }} People
        </p>
      </div>
    </div>

    <div class="mt-5 rounded bg-indigo-50 px-4 py-4 text-center">
      <p class="text-sm leading-5 text-slate-500">Duration</p>
      <p class="mt-1 text-base leading-6 font-semibold text-slate-900">
        {{ duration || '-' }}
      </p>
    </div>
  </section>
</template>
