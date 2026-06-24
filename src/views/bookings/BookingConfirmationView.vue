<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

import BookingMeetingForm from '@/components/bookings/BookingMeetingForm.vue'
import BookingSummaryCard from '@/components/bookings/BookingSummaryCard.vue'
import { roomService } from '@/services/roomService'
import type { Room } from '@/types/room'

import { isAxiosError } from 'axios'

import { bookingService } from '@/services/bookingService'

const route = useRoute()
const router = useRouter()

const room = ref<Room | null>(null)
const meetingTitle = ref('')
const participantCount = ref('')
const description = ref('')

const isLoadingRoom = ref(true)
const roomError = ref('')
const formError = ref('')

const isSubmittingBooking = ref(false)
const submitError = ref('')

const roomSlug = computed(() => {
  return String(route.params.slug)
})

const selectedDate = computed(() => {
  return typeof route.query.date === 'string' ? route.query.date : ''
})

const startDatetime = computed(() => {
  return typeof route.query.start_datetime === 'string' ? route.query.start_datetime : ''
})

const endDatetime = computed(() => {
  return typeof route.query.end_datetime === 'string' ? route.query.end_datetime : ''
})

const hasRequiredQuery = computed(() => {
  return selectedDate.value !== '' && startDatetime.value !== '' && endDatetime.value !== ''
})

const participantCountNumber = computed(() => {
  return Number(participantCount.value)
})

const isFormValid = computed(() => {
  if (!room.value) {
    return false
  }

  return (
    meetingTitle.value.trim().length > 0 &&
    Number.isInteger(participantCountNumber.value) &&
    participantCountNumber.value >= 1 &&
    participantCountNumber.value <= room.value.capacity &&
    hasRequiredQuery.value
  )
})

const dateLabel = computed(() => {
  if (!selectedDate.value) {
    return '-'
  }

  const date = new Date(`${selectedDate.value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return selectedDate.value
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
})

const startTimeLabel = computed(() => {
  return formatTimeFromDateTime(startDatetime.value)
})

const endTimeLabel = computed(() => {
  return formatTimeFromDateTime(endDatetime.value)
})

const timeLabel = computed(() => {
  if (!startTimeLabel.value || !endTimeLabel.value) {
    return '-'
  }

  return `${startTimeLabel.value} - ${endTimeLabel.value}`
})

const durationLabel = computed(() => {
  const startDate = parseDateTime(startDatetime.value)
  const endDate = parseDateTime(endDatetime.value)

  if (!startDate || !endDate) {
    return '-'
  }

  const minutes = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000))
  const hours = minutes / 60
  const hourLabel = hours === 1 ? 'Hour' : 'Hours'

  return `${hours} ${hourLabel}`
})

function parseDateTime(value: string): Date | null {
  if (!value) {
    return null
  }

  const normalizedValue = value.includes('T') ? value : value.replace(' ', 'T')
  const date = new Date(normalizedValue)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

function formatTimeFromDateTime(value: string): string {
  const date = parseDateTime(value)

  if (!date) {
    return ''
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

async function fetchRoomDetail() {
  isLoadingRoom.value = true
  roomError.value = ''

  try {
    room.value = await roomService.getRoomDetail(roomSlug.value)
  } catch (error) {
    console.error('Failed to fetch room detail:', error)
    roomError.value = 'Unable to load booking confirmation.'
  } finally {
    isLoadingRoom.value = false
  }
}

function goBack() {
  router.back()
}

function validateForm(): boolean {
  formError.value = ''

  if (!hasRequiredQuery.value) {
    formError.value = 'Booking time is incomplete. Please select date and time again.'
    return false
  }

  if (!meetingTitle.value.trim()) {
    formError.value = 'Meeting title is required.'
    return false
  }

  if (!participantCount.value) {
    formError.value = 'Participant count is required.'
    return false
  }

  if (!Number.isInteger(participantCountNumber.value) || participantCountNumber.value < 1) {
    formError.value = 'Participant count must be at least 1.'
    return false
  }

  if (room.value && participantCountNumber.value > room.value.capacity) {
    formError.value = 'Participant count cannot exceed room capacity.'
    return false
  }

  return true
}

async function handleConfirmBooking() {
  submitError.value = ''

  if (!validateForm() || !room.value) {
    return
  }

  isSubmittingBooking.value = true

  try {
    await bookingService.createBooking({
      room_id: room.value.id,
      title: meetingTitle.value.trim(),
      description: description.value.trim() || null,
      participant_count: participantCountNumber.value,
      start_datetime: startDatetime.value,
      end_datetime: endDatetime.value,
    })

    router.push({ name: 'home' })
  } catch (error) {
    console.error('Failed to create booking:', error)
    submitError.value = getApiErrorMessage(error)
  } finally {
    isSubmittingBooking.value = false
  }
}

onMounted(() => {
  fetchRoomDetail()
})

function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const responseMessage = error.response?.data?.message

    if (typeof responseMessage === 'string') {
      return responseMessage
    }
  }

  return 'Unable to confirm booking. Please try again.'
}
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-12">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-indigo-700"
          @click="goBack"
        >
          <ArrowLeftIcon class="size-4 stroke-2" />
          Back
        </button>
      </div>
    </section>

    <template v-if="isLoadingRoom">
      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-12">
          <div class="h-10 w-64 animate-pulse rounded bg-slate-200"></div>
          <div class="mt-6 h-96 animate-pulse rounded bg-white shadow-xs"></div>
        </div>
      </section>
    </template>

    <template v-else-if="roomError || !room">
      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-5">
          <div class="rounded bg-white px-4 py-5 shadow-xs">
            <h1 class="text-base font-semibold text-slate-900">Unable to load confirmation</h1>

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

    <template v-else>
      <section class="mt-6 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-12">
          <h1 class="text-3xl leading-10 font-bold text-slate-900 md:text-4xl md:leading-11">
            Confirm Booking
          </h1>

          <p class="mt-1 text-base leading-6 font-normal text-slate-500">
            Review your meeting details before confirming the room booking.
          </p>
        </div>
      </section>

      <section
        class="mt-5 grid grid-cols-4 gap-x-5 gap-y-8 px-4 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-7">
          <BookingMeetingForm
            v-model:meeting-title="meetingTitle"
            v-model:participant-count="participantCount"
            v-model:description="description"
            :capacity="room.capacity"
          />

          <p v-if="formError" class="mt-4 rounded bg-red-50 px-3 py-3 text-sm text-red-700">
            {{ formError }}
          </p>

          <p v-if="submitError" class="mt-4 rounded bg-red-50 px-3 py-3 text-sm text-red-700">
            {{ submitError }}
          </p>
        </div>

        <aside class="col-span-4 md:col-span-5">
          <div class="md:sticky md:top-24">
            <BookingSummaryCard
              :room="room"
              :date-label="dateLabel"
              :time-label="timeLabel"
              :duration-label="durationLabel"
            />

            <button
              type="button"
              class="mt-5 flex h-12 w-full items-center justify-center rounded px-4 text-base font-semibold shadow-xs transition"
              :class="
                isFormValid && !isSubmittingBooking
                  ? 'bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              "
              :disabled="!isFormValid || isSubmittingBooking"
              @click="handleConfirmBooking"
            >
              {{ isSubmittingBooking ? 'Confirming...' : 'Confirm Booking' }}
            </button>
          </div>
        </aside>
      </section>
    </template>
  </div>
</template>
