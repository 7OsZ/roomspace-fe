<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

import RoomBookingPanel from '@/components/rooms/RoomBookingPanel.vue'
import RoomDetailInfo from '@/components/rooms/RoomDetailInfo.vue'
import { useRoomAvailability } from '@/composable/rooms/useRoomAvailability'
import { roomService } from '@/services/roomService'
import type { Room } from '@/types/room'

const route = useRoute()
const router = useRouter()

const room = ref<Room | null>(null)
const isLoadingRoom = ref(true)
const roomError = ref('')

const roomSlug = computed(() => {
  return String(route.params.slug)
})

const {
  availableDates,
  startTimeSlots,
  endTimeSlots,
  selectedDate,
  selectedStartSlot,
  selectedEndSlot,
  isLoadingDates,
  isLoadingStartTimes,
  isLoadingEndTimes,
  availabilityError,
  hasCompleteBookingSelection,
  durationText,
  fetchAvailableDates,
  selectDate,
  selectStartSlot,
  selectEndSlot,
} = useRoomAvailability(roomSlug.value)

const isRoomUnavailable = computed(() => {
  if (!room.value) {
    return false
  }

  return !room.value.is_active || room.value.is_under_maintenance
})

const roomAvailabilityText = computed(() => {
  if (!room.value) {
    return ''
  }

  if (room.value.is_under_maintenance) {
    return 'This room is currently under maintenance.'
  }

  if (!room.value.is_active) {
    return 'This room is currently inactive.'
  }

  return ''
})

async function fetchRoomDetail() {
  isLoadingRoom.value = true
  roomError.value = ''

  try {
    room.value = await roomService.getRoomDetail(roomSlug.value)

    if (room.value.is_active && !room.value.is_under_maintenance) {
      await fetchAvailableDates()
    }
  } catch (error) {
    console.error('Failed to fetch room detail:', error)
    roomError.value = 'Unable to load room detail.'
  } finally {
    isLoadingRoom.value = false
  }
}

function goBack() {
  router.back()
}

function handleContinueBooking() {
  if (
    !hasCompleteBookingSelection.value ||
    !selectedDate.value ||
    !selectedStartSlot.value ||
    !selectedEndSlot.value
  ) {
    return
  }

  router.push({
    name: 'booking-confirmation',
    params: {
      slug: roomSlug.value,
    },
    query: {
      date: selectedDate.value.date,
      start_datetime: selectedStartSlot.value.datetime,
      end_datetime: selectedEndSlot.value.datetime,
    },
  })
}

onMounted(() => {
  fetchRoomDetail()
})
</script>

<template>
  <div class="pb-12">
    <template v-if="isLoadingRoom">
      <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-12">
          <div class="h-5 w-20 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-5 h-54 w-full animate-pulse rounded bg-slate-200 md:h-96"></div>

          <div class="mt-5 h-10 w-56 animate-pulse rounded bg-slate-200"></div>
          <div class="mt-2 h-5 w-72 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-5 h-28 animate-pulse rounded bg-white shadow-xs"></div>
          <div class="mt-4 h-56 animate-pulse rounded bg-white shadow-xs"></div>
          <div class="mt-8 h-96 animate-pulse rounded bg-white shadow-xs"></div>
        </div>
      </section>
    </template>

    <template v-else-if="roomError">
      <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-5">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-indigo-700"
            @click="goBack"
          >
            <ArrowLeftIcon class="size-3 stroke-2" />
            Back
          </button>

          <div class="mt-5 rounded bg-white px-4 py-5 shadow-sm">
            <h1 class="text-base font-semibold text-slate-900">Unable to load room detail</h1>

            <p class="mt-1 text-sm leading-5 text-slate-500">Please try again in a moment.</p>

            <button
              type="button"
              class="mt-4 inline-flex h-10 items-center justify-center rounded bg-indigo-700 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
              @click="fetchRoomDetail"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else-if="room">
      <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-12">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-indigo-700"
            @click="goBack"
          >
            <ArrowLeftIcon class="size-3 stroke-2" />
            Back
          </button>
        </div>
      </section>

      <section class="mt-5 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-7">
          <RoomDetailInfo :room="room" />
        </div>

        <aside class="col-span-4 mt-8 md:col-span-5 md:mt-0">
          <RoomBookingPanel
            :is-room-unavailable="isRoomUnavailable"
            :room-availability-text="roomAvailabilityText"
            :available-dates="availableDates"
            :start-time-slots="startTimeSlots"
            :end-time-slots="endTimeSlots"
            :selected-date="selectedDate"
            :selected-start-slot="selectedStartSlot"
            :selected-end-slot="selectedEndSlot"
            :is-loading-dates="isLoadingDates"
            :is-loading-start-times="isLoadingStartTimes"
            :is-loading-end-times="isLoadingEndTimes"
            :availability-error="availabilityError"
            :duration-text="durationText"
            :has-complete-booking-selection="hasCompleteBookingSelection"
            @select-date="selectDate"
            @select-start-slot="selectStartSlot"
            @select-end-slot="selectEndSlot"
            @continue-booking="handleContinueBooking"
          />
        </aside>
      </section>
    </template>
  </div>
</template>
