import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { bookingService } from '@/services/bookingService'
import type { Booking } from '@/types/booking'
import { formatReadableDate, formatTimeRange } from '@/utils/dateFormatter'

export function useBookingDetail() {
  const router = useRouter()

  const booking = ref<Booking | null>(null)
  const isLoading = ref(true)
  const error = ref('')

  const dateLabel = computed(() => {
    if (!booking.value) return '-'
    return formatReadableDate(booking.value.start_datetime)
  })

  const timeLabel = computed(() => {
    if (!booking.value) return '-'
    return formatTimeRange(booking.value.start_datetime, booking.value.end_datetime)
  })

  const durationLabel = computed(() => {
    if (!booking.value) return '-'
    const hours = booking.value.duration_in_hours
    return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`
  })

  const canCancel = computed(() => {
    if (!booking.value) return false
    if (booking.value.status !== 'approved') return false
    return new Date(booking.value.end_datetime) > new Date()
  })

  async function fetchBooking(id: number) {
    isLoading.value = true
    error.value = ''

    try {
      booking.value = await bookingService.getBookingById(id)
    } catch (err) {
      console.error('Failed to fetch booking detail:', err)
      error.value = 'Unable to load booking details.'
    } finally {
      isLoading.value = false
    }
  }

  function goBack() {
    router.push({ name: 'my-bookings' })
  }

  return {
    booking,
    isLoading,
    error,
    dateLabel,
    timeLabel,
    durationLabel,
    canCancel,
    fetchBooking,
    goBack,
  }
}
