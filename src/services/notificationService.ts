import api from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type {
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
} from '@/types/notification'

export const notificationService = {
  async getNotifications(page = 1): Promise<NotificationListResponse> {
    const response = await api.get<NotificationListResponse>('/employee/notifications', {
      params: { page },
    })

    return response.data
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get<ApiResponse<UnreadCountResponse>>(
      '/employee/notifications/unread-count',
    )

    return response.data.data.unread_count
  },

  async markAsRead(id: number): Promise<Notification> {
    const response = await api.patch<ApiResponse<Notification>>(
      `/employee/notifications/${id}/read`,
    )

    return response.data.data
  },

  async markAllAsRead(): Promise<void> {
    await api.patch('/employee/notifications/read-all')
  },
}
