import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { BookingSummary } from '@/types/booking'

export const bookingService = {
  async getSummary(): Promise<BookingSummary> {
    const response = await api.get<ApiResponse<BookingSummary>>('/employee/bookings/summary')

    return response.data.data
  },
}
