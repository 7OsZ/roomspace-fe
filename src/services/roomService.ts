import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { Room } from '@/types/room'

export const roomService = {
  async getRooms(): Promise<Room[]> {
    const response = await api.get<ApiResponse<Room[]>>('/employee/rooms')

    return response.data.data
  },
}
