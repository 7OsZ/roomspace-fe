import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { LoginData, LoginPayload, User } from '@/types/auth'

export const authService = {
  async login(payload: LoginPayload): Promise<LoginData> {
    const response = await api.post<ApiResponse<LoginData>>('/login', payload)

    return response.data.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<{ user: User }>>('/me')

    return response.data.data.user
  },

  async logout(): Promise<void> {
    await api.post('/logout')
  },
}
