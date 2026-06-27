import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface BookingSuccessQueryData {
  bookingNumber: string
  meetingTitle: string
  roomName: string
  location: string
  startDatetime: string
  endDatetime: string
  participantCount: string
  duration: string
}

export function useBookingSuccess() {
  const route = useRoute()
  const router = useRouter()

  const bookingSuccessData = computed<BookingSuccessQueryData>(() => {
    return {
      bookingNumber: getQueryString('booking_number'),
      meetingTitle: getQueryString('title'),
      roomName: getQueryString('room'),
      location: getQueryString('location'),
      startDatetime: getQueryString('start_datetime'),
      endDatetime: getQueryString('end_datetime'),
      participantCount: getQueryString('participant_count'),
      duration: getQueryString('duration'),
    }
  })

  const dateLabel = computed(() => {
    const date = parseDateTime(bookingSuccessData.value.startDatetime)

    if (!date) {
      return '-'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  })

  const timeLabel = computed(() => {
    const startTime = formatTimeFromDateTime(bookingSuccessData.value.startDatetime)
    const endTime = formatTimeFromDateTime(bookingSuccessData.value.endDatetime)

    if (!startTime || !endTime) {
      return '-'
    }

    return `${startTime} - ${endTime}`
  })

  function getQueryString(key: string): string {
    const value = route.query[key]

    if (typeof value !== 'string') {
      return ''
    }

    return value
  }

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

  function goHome() {
    router.push({ name: 'home' })
  }

  function goRooms() {
    router.push({ name: 'rooms' })
  }

  return {
    bookingSuccessData,
    dateLabel,
    timeLabel,
    goHome,
    goRooms,
  }
}
