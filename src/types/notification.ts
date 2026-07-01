import type { Booking } from '@/types/booking'

export type NotificationType =
  | 'booking_approved'
  | 'booking_cancelled'
  | 'booking_expired'
  | 'booking_reminder'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  is_read: boolean
  read_at: string | null
  created_at: string | null
  timezone: string
  booking: Booking | null
}

export interface NotificationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface NotificationListResponse {
  message: string
  data: Notification[]
  meta: NotificationMeta
}

export interface UnreadCountResponse {
  unread_count: number
}
