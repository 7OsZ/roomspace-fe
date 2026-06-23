export type TimeSlotStatus = 'available' | 'booked' | 'past' | 'unavailable'

export interface AvailableDate {
  date: string
  label: string
  is_available: boolean
}

export interface AvailableTimeSlot {
  time: string
  datetime: string
  status: TimeSlotStatus
  available: boolean
}
