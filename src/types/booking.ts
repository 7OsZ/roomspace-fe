export interface BookingSummary {
  upcoming_booking: UpcomingBooking | null
}

export interface UpcomingBooking {
  id: number
  booking_number: string
  title: string
  room: {
    id: number
    name: string
    location: string
  }
  start_datetime: string
  end_datetime: string
  status: string
}
