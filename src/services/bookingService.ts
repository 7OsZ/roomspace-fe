import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { Booking, BookingSummary, CreateBookingPayload, NextBooking } from '@/types/booking'

export const bookingService = {
  async getSummary(): Promise<BookingSummary> {
    const response = await api.get<ApiResponse<BookingSummary>>('/employee/bookings/summary')

    return response.data.data
  },

  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    const response = await api.post<ApiResponse<Booking>>('/employee/bookings', payload)

    return response.data.data
  },

  async getBookings(): Promise<Booking[]> {
    const response = await api.get<{
      message: string
      data: NextBooking[]
      meta: {
        current_page: number
        last_page: number
        per_page: number
        total: number
      }
    }>('/employee/bookings')

    return response.data.data
  },
}
