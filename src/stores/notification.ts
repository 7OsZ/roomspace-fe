import { defineStore } from 'pinia'
import { ref } from 'vue'

import { notificationService } from '@/services/notificationService'

export const useNotificationStore = defineStore('notification', () => {
  const unreadCount = ref(0)

  async function fetchUnreadCount(): Promise<void> {
    try {
      unreadCount.value = await notificationService.getUnreadCount()
    } catch {
      // Fail silently — badge is non-critical
    }
  }

  function clearUnreadCount(): void {
    unreadCount.value = 0
  }

  return {
    unreadCount,
    fetchUnreadCount,
    clearUnreadCount,
  }
})
