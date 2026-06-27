import { computed, ref } from 'vue'

import { bookingService } from '@/services/bookingService'
import type { Booking } from '@/types/booking'

export type BookingTab = 'upcoming' | 'past' | 'cancelled'

export function useMyBookings() {
  const bookings = ref<Booking[]>([])
  const activeTab = ref<BookingTab>('upcoming')

  const isLoadingBookings = ref(true)
  const bookingsError = ref('')

  const upcomingBookings = computed(() => {
    const now = new Date()

    return bookings.value
      .filter((booking) => {
        const startDate = parseDateTime(booking.start_datetime)
        const endDate = parseDateTime(booking.end_datetime)

        if (!startDate || !endDate) {
          return false
        }

        return booking.status === 'approved' && endDate >= now
      })
      .sort((a, b) => {
        const firstStartDate = parseDateTime(a.start_datetime)
        const secondStartDate = parseDateTime(b.start_datetime)

        return (firstStartDate?.getTime() ?? 0) - (secondStartDate?.getTime() ?? 0)
      })
  })

  const pastBookings = computed(() => {
    const now = new Date()

    return bookings.value
      .filter((booking) => {
        const endDate = parseDateTime(booking.end_datetime)

        if (!endDate) {
          return false
        }

        return booking.status === 'expired' || (booking.status === 'approved' && endDate < now)
      })
      .sort((a, b) => {
        const firstStartDate = parseDateTime(a.start_datetime)
        const secondStartDate = parseDateTime(b.start_datetime)

        return (secondStartDate?.getTime() ?? 0) - (firstStartDate?.getTime() ?? 0)
      })
  })

  const cancelledBookings = computed(() => {
    return bookings.value
      .filter((booking) => booking.status === 'cancelled')
      .sort((a, b) => {
        const firstStartDate = parseDateTime(a.start_datetime)
        const secondStartDate = parseDateTime(b.start_datetime)

        return (secondStartDate?.getTime() ?? 0) - (firstStartDate?.getTime() ?? 0)
      })
  })

  const filteredBookings = computed(() => {
    let selectedBookings: Booking[] = []

    if (activeTab.value === 'past') {
      selectedBookings = pastBookings.value
    } else if (activeTab.value === 'cancelled') {
      selectedBookings = cancelledBookings.value
    } else {
      selectedBookings = upcomingBookings.value
    }

    return selectedBookings.filter((booking) => {
      return booking && booking.id && booking.title && booking.room
    })
  })

  const emptyStateTitle = computed(() => {
    if (activeTab.value === 'past') {
      return 'No past bookings'
    }

    if (activeTab.value === 'cancelled') {
      return 'No cancelled bookings'
    }

    return 'No upcoming bookings'
  })

  const emptyStateDescription = computed(() => {
    if (activeTab.value === 'past') {
      return 'Completed or expired bookings will appear here.'
    }

    if (activeTab.value === 'cancelled') {
      return 'Cancelled bookings will appear here.'
    }

    return 'You have no scheduled meeting room bookings.'
  })

  function setActiveTab(tab: BookingTab) {
    activeTab.value = tab
  }

  async function fetchBookings() {
    isLoadingBookings.value = true
    bookingsError.value = ''

    try {
      bookings.value = await bookingService.getBookings()
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      bookingsError.value = 'Unable to load your bookings.'
    } finally {
      isLoadingBookings.value = false
    }
  }

  function parseDateTime(value: string): Date | null {
    const normalizedValue = value.includes('T') ? value : value.replace(' ', 'T')
    const date = new Date(normalizedValue)

    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date
  }

  return {
    bookings,
    activeTab,
    filteredBookings,
    upcomingBookings,
    pastBookings,
    cancelledBookings,
    emptyStateTitle,
    emptyStateDescription,
    isLoadingBookings,
    bookingsError,
    setActiveTab,
    fetchBookings,
  }
}
