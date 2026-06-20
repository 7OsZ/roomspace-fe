export type BookingStatus = 'approved' | 'cancelled' | 'expired'

export interface BookingRoom {
  id: number
  name: string
  slug: string
  code: string
  location: string
  capacity: number
  description: string | null
  image: string | null
  is_active: boolean
  is_under_maintenance: boolean
}

export interface NextBooking {
  id: number
  booking_number: string
  title: string
  description: string | null
  participant_count: number
  status: BookingStatus
  start_datetime: string
  end_datetime: string
  timezone: string
  duration_in_minutes: number
  duration_in_hours: number
  cancelled_at: string | null
  cancelled_by: number | null
  cancellation_reason: string | null
  expired_at: string | null
  room: BookingRoom
}

export interface BookingSummary {
  upcoming_count: number
  cancelled_count: number
  expired_count: number
  next_booking: NextBooking | null
}
