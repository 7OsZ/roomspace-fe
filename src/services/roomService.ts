import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { AvailableDate, AvailableTimeSlot } from '@/types/availability'
import type { Room } from '@/types/room'

export const roomService = {
  async getRooms(): Promise<Room[]> {
    const response = await api.get<ApiResponse<Room[]>>('/employee/rooms')

    return response.data.data
  },

  async getRoomDetail(slug: string): Promise<Room> {
    const response = await api.get<ApiResponse<Room>>(`/employee/rooms/${slug}`)

    return response.data.data
  },

  async getAvailableDates(slug: string): Promise<AvailableDate[]> {
    const response = await api.get<ApiResponse<AvailableDate[]>>(
      `/employee/rooms/${slug}/available-dates`,
    )

    return response.data.data
  },

  async getAvailableStartTimes(slug: string, date: string): Promise<AvailableTimeSlot[]> {
    const response = await api.get<ApiResponse<AvailableTimeSlot[]>>(
      `/employee/rooms/${slug}/available-times`,
      {
        params: {
          date,
        },
      },
    )

    return response.data.data
  },

  async getAvailableEndTimes(
    slug: string,
    date: string,
    startDatetime: string,
  ): Promise<AvailableTimeSlot[]> {
    const response = await api.get<ApiResponse<AvailableTimeSlot[]>>(
      `/employee/rooms/${slug}/available-end-times`,
      {
        params: {
          date,
          start_datetime: startDatetime,
        },
      },
    )

    return response.data.data
  },
}
