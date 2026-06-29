<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

import BookingCancelModal from '@/components/bookings/BookingCancelModal.vue'
import BookingDetailInfo from '@/components/bookings/BookingDetailInfo.vue'
import BookingDetailRoom from '@/components/bookings/BookingDetailRoom.vue'
import { useBookingDetail } from '@/composable/bookings/useBookingDetail'
import { useCancelBooking } from '@/composable/bookings/useCancelBookings'

const route = useRoute()

const {
  booking,
  isLoading,
  error,
  dateLabel,
  timeLabel,
  durationLabel,
  canCancel,
  fetchBooking,
  goBack,
} = useBookingDetail()

const { isModalOpen, isCancelling, cancelError, reason, openModal, closeModal, confirmCancel } =
  useCancelBooking()

const bookingId = computed(() => Number(route.params.id))

function handleCancelSuccess(updated: typeof booking.value) {
  booking.value = updated
}

onMounted(() => {
  fetchBooking(bookingId.value)
})
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
          My Bookings
        </button>
      </div>
    </section>

    <template v-if="isLoading">
      <section class="mt-6 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-12">
          <div class="h-8 w-48 animate-pulse rounded bg-slate-200"></div>
          <div class="mt-2 h-5 w-32 animate-pulse rounded bg-slate-200"></div>
        </div>
      </section>

      <section
        class="mt-5 grid grid-cols-4 gap-x-5 gap-y-4 px-4 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 h-72 animate-pulse rounded bg-white shadow-xs md:col-span-7"></div>
        <div class="col-span-4 h-52 animate-pulse rounded bg-white shadow-xs md:col-span-5"></div>
      </section>
    </template>

    <template v-else-if="error || !booking">
      <section class="mt-6 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
        <div class="col-span-4 md:col-span-5">
          <div class="rounded bg-white px-4 py-5 shadow-xs">
            <h1 class="text-base font-semibold text-slate-900">Unable to load booking</h1>
            <p class="mt-1 text-sm leading-5 text-slate-500">Please try again in a moment.</p>
            <button
              type="button"
              class="mt-4 inline-flex h-10 items-center justify-center rounded bg-indigo-700 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
              @click="fetchBooking(bookingId)"
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
            Booking Detail
          </h1>
          <p class="mt-1 text-base leading-6 font-normal text-slate-500">
            View your meeting room booking details.
          </p>
        </div>
      </section>

      <section
        class="mt-5 grid grid-cols-4 gap-x-5 gap-y-4 px-4 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-7">
          <BookingDetailInfo
            :booking="booking"
            :date-label="dateLabel"
            :time-label="timeLabel"
            :duration-label="durationLabel"
          />
        </div>

        <aside class="col-span-4 md:col-span-5">
          <div class="md:sticky md:top-24">
            <BookingDetailRoom :room="booking.room" />

            <button
              v-if="canCancel"
              type="button"
              class="mt-4 flex h-11 w-full items-center justify-center rounded bg-white text-sm font-semibold text-red-600 shadow-xs outline-1 -outline-offset-1 outline-red-200 transition hover:bg-red-50 active:bg-red-100"
              @click="openModal"
            >
              Cancel Booking
            </button>
          </div>
        </aside>
      </section>
    </template>

    <BookingCancelModal
      v-if="isModalOpen"
      v-model:reason="reason"
      :is-cancelling="isCancelling"
      :cancel-error="cancelError"
      @confirm="confirmCancel(bookingId, handleCancelSuccess)"
      @close="closeModal"
    />
  </div>
</template>
