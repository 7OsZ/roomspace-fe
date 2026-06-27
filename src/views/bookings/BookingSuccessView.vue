<script setup lang="ts">
import BookingSuccessActions from '@/components/bookings/BookingSuccessAction.vue'
import BookingSuccessHero from '@/components/bookings/BookingSuccessHero.vue'
import BookingSuccessSummary from '@/components/bookings/BookingSuccessSummary.vue'
import { useBookingSuccess } from '@/composable/bookings/useBookingSuccess'

const { bookingSuccessData, dateLabel, timeLabel, goHome, goRooms } = useBookingSuccess()
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-8 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-6 md:col-start-4">
        <BookingSuccessHero :booking-number="bookingSuccessData.bookingNumber" />

        <BookingSuccessSummary
          class="mt-5"
          :meeting-title="bookingSuccessData.meetingTitle"
          :room-name="bookingSuccessData.roomName"
          :location="bookingSuccessData.location"
          :date-label="dateLabel"
          :time-label="timeLabel"
          :participant-count="bookingSuccessData.participantCount"
          :duration="bookingSuccessData.duration"
        />

        <BookingSuccessActions class="mt-5" @primary="goHome" @secondary="goRooms" />
      </div>
    </section>
  </div>
</template>
