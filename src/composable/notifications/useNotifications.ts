import { computed, ref } from 'vue'

import { notificationService } from '@/services/notificationService'
import { useNotificationStore } from '@/stores/notification'
import type { Notification, NotificationMeta } from '@/types/notification'

export function useNotifications() {
  const notifications = ref<Notification[]>([])
  const meta = ref<NotificationMeta | null>(null)
  const isLoading = ref(true)
  const isLoadingMore = ref(false)
  const isMarkingAll = ref(false)
  const error = ref('')

  const notificationStore = useNotificationStore()

  const hasMore = computed(() => {
    if (!meta.value) return false
    return meta.value.current_page < meta.value.last_page
  })

  const unreadCount = computed(() => notifications.value.filter((n) => !n.is_read).length)

  const hasUnread = computed(() => unreadCount.value > 0)

  async function fetchNotifications() {
    isLoading.value = true
    error.value = ''

    try {
      const response = await notificationService.getNotifications(1)
      notifications.value = response.data
      meta.value = response.meta
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
      error.value = 'Unable to load notifications.'
    } finally {
      isLoading.value = false
    }
  }

  async function loadMore() {
    if (!meta.value || isLoadingMore.value) return

    const nextPage = meta.value.current_page + 1

    isLoadingMore.value = true

    try {
      const response = await notificationService.getNotifications(nextPage)
      notifications.value.push(...response.data)
      meta.value = response.meta
    } catch (err) {
      console.error('Failed to load more notifications:', err)
    } finally {
      isLoadingMore.value = false
    }
  }

  async function markAsRead(id: number) {
    const index = notifications.value.findIndex((n) => n.id === id)
    const notification = notifications.value[index]

    if (index === -1 || !notification || notification.is_read) return

    try {
      const updated = await notificationService.markAsRead(id)
      notifications.value[index] = updated
      notificationStore.fetchUnreadCount()
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  async function markAllAsRead() {
    if (isMarkingAll.value || !hasUnread.value) return

    isMarkingAll.value = true

    try {
      await notificationService.markAllAsRead()
      notifications.value = notifications.value.map((n) => ({
        ...n,
        is_read: true,
        read_at: new Date().toISOString(),
      }))
      notificationStore.clearUnreadCount()
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    } finally {
      isMarkingAll.value = false
    }
  }

  return {
    notifications,
    meta,
    isLoading,
    isLoadingMore,
    isMarkingAll,
    error,
    hasMore,
    unreadCount,
    hasUnread,
    fetchNotifications,
    loadMore,
    markAsRead,
    markAllAsRead,
  }
}
