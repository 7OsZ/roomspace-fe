<script setup lang="ts">
import type { AvailableDate, AvailableTimeSlot } from '@/types/availability'

defineProps<{
  isRoomUnavailable: boolean
  roomAvailabilityText: string
  availableDates: AvailableDate[]
  startTimeSlots: AvailableTimeSlot[]
  endTimeSlots: AvailableTimeSlot[]
  selectedDate: AvailableDate | null
  selectedStartSlot: AvailableTimeSlot | null
  selectedEndSlot: AvailableTimeSlot | null
  isLoadingDates: boolean
  isLoadingStartTimes: boolean
  isLoadingEndTimes: boolean
  availabilityError: string
  durationText: string
  hasCompleteBookingSelection: boolean
}>()

const emit = defineEmits<{
  selectDate: [date: AvailableDate]
  selectStartSlot: [slot: AvailableTimeSlot]
  selectEndSlot: [slot: AvailableTimeSlot]
  continueBooking: []
}>()

function formatDateParts(value: string): { dayMonth: string; year: string } {
  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return {
      dayMonth: value,
      year: '',
    }
  }

  return {
    dayMonth: date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    }),
    year: date.toLocaleDateString('en-US', {
      year: 'numeric',
    }),
  }
}

function getDateCardClass(date: AvailableDate, selectedDate: AvailableDate | null): string {
  const isSelected = selectedDate?.date === date.date

  if (!date.is_available) {
    return 'cursor-not-allowed bg-slate-100 text-slate-400 outline-slate-200'
  }

  if (isSelected) {
    return 'bg-indigo-700 text-white outline-indigo-700'
  }

  return 'bg-white text-slate-800 border border-slate-300 hover:text-indigo-700 hover:outline-indigo-300'
}

function getTimeSlotClass(slot: AvailableTimeSlot, isSelected: boolean): string {
  if (isSelected) {
    return 'bg-indigo-700 text-white outline-indigo-700 shadow-xs'
  }

  if (!slot.available) {
    return 'cursor-not-allowed bg-slate-200 text-slate-500 outline-slate-200'
  }

  return 'bg-white text-slate-700 outline-slate-200 hover:text-indigo-700 hover:outline-indigo-300'
}
</script>

<template>
  <div class="rounded bg-white px-4 py-4 shadow-xs border border-slate-100">
    <h2 class="text-lg leading-7 font-semibold text-slate-900">Book This Room</h2>

    <p class="mt-1 text-sm leading-5 font-normal text-slate-600">
      Choose your preferred date and time.
    </p>

    <div
      v-if="isRoomUnavailable"
      class="mt-5 rounded bg-slate-50 px-4 py-4 text-sm leading-5 text-slate-600"
    >
      {{ roomAvailabilityText }}
    </div>

    <div v-else class="mt-5">
      <div
        v-if="availabilityError"
        class="rounded bg-red-50 px-3 py-3 text-sm leading-5 text-red-700"
      >
        {{ availabilityError }}
      </div>

      <div>
        <h3 class="text-sm leading-5 font-semibold text-slate-600">Select Date</h3>

        <div v-if="isLoadingDates" class="mt-3 grid grid-cols-2 gap-3">
          <div v-for="item in 2" :key="item" class="h-20 animate-pulse rounded bg-slate-100"></div>
        </div>

        <div v-else-if="availableDates.length" class="mt-3 grid grid-cols-2 gap-3">
          <button
            v-for="date in availableDates"
            :key="date.date"
            type="button"
            class="h-20 rounded px-3 py-3 text-left transition"
            :class="getDateCardClass(date, selectedDate)"
            :disabled="!date.is_available"
            @click="emit('selectDate', date)"
          >
            <p class="text-xs leading-4 font-semibold uppercase">
              {{ date.label }}
            </p>

            <p class="mt-1 text-sm leading-5 font-semibold">
              {{ formatDateParts(date.date).dayMonth }}
            </p>

            <p class="text-xs leading-4 font-semibold">
              {{ formatDateParts(date.date).year }}
            </p>
          </button>
        </div>

        <div v-else class="mt-3 rounded bg-slate-50 px-3 py-3 text-sm text-slate-500">
          No available dates.
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-sm leading-5 font-semibold text-slate-600">Start Time</h3>

        <div v-if="isLoadingStartTimes" class="mt-3 grid grid-cols-4 gap-2">
          <div
            v-for="item in 10"
            :key="item"
            class="h-9.5 animate-pulse rounded bg-slate-100"
          ></div>
        </div>

        <div v-else-if="startTimeSlots.length" class="mt-3 grid grid-cols-4 gap-2">
          <button
            v-for="slot in startTimeSlots"
            :key="slot.datetime"
            type="button"
            class="h-9.5 rounded text-sm font-medium outline-1 -outline-offset-1 transition"
            :class="getTimeSlotClass(slot, selectedStartSlot?.datetime === slot.datetime)"
            :disabled="!slot.available"
            @click="emit('selectStartSlot', slot)"
          >
            {{ slot.time }}
          </button>
        </div>

        <div v-else class="mt-3 rounded bg-slate-50 px-3 py-3 text-sm leading-5 text-slate-500">
          Select an available date to view start times.
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-sm leading-5 font-semibold text-slate-600">End Time</h3>

        <div v-if="isLoadingEndTimes" class="mt-3 grid grid-cols-4 gap-2">
          <div v-for="item in 8" :key="item" class="h-10 animate-pulse rounded bg-slate-100"></div>
        </div>

        <div v-else-if="endTimeSlots.length" class="mt-3 grid grid-cols-4 gap-2">
          <button
            v-for="slot in endTimeSlots"
            :key="slot.datetime"
            type="button"
            class="h-9.5 rounded text-sm font-medium shadow-xs outline-1 -outline-offset-1 transition"
            :class="getTimeSlotClass(slot, selectedEndSlot?.datetime === slot.datetime)"
            :disabled="!slot.available"
            @click="emit('selectEndSlot', slot)"
          >
            {{ slot.time }}
          </button>
        </div>

        <div v-else class="mt-3 rounded bg-slate-50 px-3 py-3 text-sm leading-5 text-slate-500">
          Select a start time to view end times.
        </div>
      </div>

      <div
        v-if="durationText"
        class="mt-8 rounded bg-indigo-50 px-3 py-3 text-sm leading-5 text-slate-600"
      >
        <span class="font-normal">Duration: </span>
        <span class="font-semibold text-indigo-600">{{ durationText }}</span>
      </div>
    </div>

    <button
      type="button"
      class="mt-8 flex h-11 w-full items-center justify-center rounded px-1.5 py-2.5 text-base font-semibold shadow-xs transition"
      :class="
        hasCompleteBookingSelection && !isRoomUnavailable
          ? 'bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900'
          : 'cursor-not-allowed bg-slate-200 text-slate-400'
      "
      :disabled="!hasCompleteBookingSelection || isRoomUnavailable"
      @click="emit('continueBooking')"
    >
      Continue Booking
    </button>
  </div>
</template>
