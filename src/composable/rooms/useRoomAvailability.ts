import { computed, ref } from 'vue'

import { roomService } from '@/services/roomService'
import type { AvailableDate, AvailableTimeSlot } from '@/types/availability'

export function useRoomAvailability(roomSlug: string) {
  const availableDates = ref<AvailableDate[]>([])
  const startTimeSlots = ref<AvailableTimeSlot[]>([])
  const endTimeSlots = ref<AvailableTimeSlot[]>([])

  const selectedDate = ref<AvailableDate | null>(null)
  const selectedStartSlot = ref<AvailableTimeSlot | null>(null)
  const selectedEndSlot = ref<AvailableTimeSlot | null>(null)

  const isLoadingDates = ref(false)
  const isLoadingStartTimes = ref(false)
  const isLoadingEndTimes = ref(false)

  const availabilityError = ref('')

  const hasCompleteBookingSelection = computed(() => {
    return (
      selectedDate.value !== null &&
      selectedStartSlot.value !== null &&
      selectedEndSlot.value !== null
    )
  })

  const durationInMinutes = computed(() => {
    if (!selectedStartSlot.value || !selectedEndSlot.value) {
      return 0
    }

    const startDate = parseDateTime(selectedStartSlot.value.datetime)
    const endDate = parseDateTime(selectedEndSlot.value.datetime)

    if (!startDate || !endDate) {
      return 0
    }

    return Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000))
  })

  const durationText = computed(() => {
    const minutes = durationInMinutes.value

    if (!minutes || !selectedStartSlot.value || !selectedEndSlot.value) {
      return ''
    }

    const hours = minutes / 60
    const hourLabel = hours === 1 ? 'Hour' : 'Hours'

    return `${hours} ${hourLabel} (${selectedStartSlot.value.time} - ${selectedEndSlot.value.time})`
  })

  function parseDateTime(value: string): Date | null {
    const normalizedValue = value.includes('T') ? value : value.replace(' ', 'T')
    const date = new Date(normalizedValue)

    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date
  }

  async function fetchAvailableDates() {
    isLoadingDates.value = true
    availabilityError.value = ''

    try {
      availableDates.value = await roomService.getAvailableDates(roomSlug)

      const firstAvailableDate = availableDates.value.find((date) => date.is_available)

      if (firstAvailableDate) {
        selectedDate.value = firstAvailableDate
        await fetchAvailableStartTimes(firstAvailableDate.date)
      }
    } catch (error) {
      console.error('Failed to fetch available dates:', error)
      availabilityError.value = 'Unable to load available dates.'
    } finally {
      isLoadingDates.value = false
    }
  }

  async function fetchAvailableStartTimes(date: string) {
    isLoadingStartTimes.value = true
    availabilityError.value = ''

    try {
      startTimeSlots.value = await roomService.getAvailableStartTimes(roomSlug, date)
    } catch (error) {
      console.error('Failed to fetch available start times:', error)
      availabilityError.value = 'Unable to load available start times.'
    } finally {
      isLoadingStartTimes.value = false
    }
  }

  async function fetchAvailableEndTimes(date: string, startDatetime: string) {
    isLoadingEndTimes.value = true
    availabilityError.value = ''

    try {
      endTimeSlots.value = await roomService.getAvailableEndTimes(roomSlug, date, startDatetime)
    } catch (error) {
      console.error('Failed to fetch available end times:', error)
      availabilityError.value = 'Unable to load available end times.'
    } finally {
      isLoadingEndTimes.value = false
    }
  }

  async function selectDate(date: AvailableDate) {
    if (!date.is_available || selectedDate.value?.date === date.date) {
      return
    }

    selectedDate.value = date
    selectedStartSlot.value = null
    selectedEndSlot.value = null
    startTimeSlots.value = []
    endTimeSlots.value = []

    await fetchAvailableStartTimes(date.date)
  }

  async function selectStartSlot(slot: AvailableTimeSlot) {
    if (!slot.available || selectedStartSlot.value?.datetime === slot.datetime) {
      return
    }

    selectedStartSlot.value = slot
    selectedEndSlot.value = null
    endTimeSlots.value = []

    if (selectedDate.value) {
      await fetchAvailableEndTimes(selectedDate.value.date, slot.datetime)
    }
  }

  function selectEndSlot(slot: AvailableTimeSlot) {
    if (!slot.available || selectedEndSlot.value?.datetime === slot.datetime) {
      return
    }

    selectedEndSlot.value = slot
  }

  return {
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
  }
}
