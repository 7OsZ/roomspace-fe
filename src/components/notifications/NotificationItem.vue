<script setup lang="ts">
import { BellAlertIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

import type { Notification, NotificationType } from '@/types/notification'

const props = defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  read: [id: number]
}>()

const iconMap: Record<NotificationType, object> = {
  booking_approved: CheckCircleIcon,
  booking_cancelled: XCircleIcon,
  booking_expired: ClockIcon,
  booking_reminder: BellAlertIcon,
}

const colorMap: Record<NotificationType, string> = {
  booking_approved: 'bg-emerald-50 text-emerald-600',
  booking_cancelled: 'bg-red-50 text-red-600',
  booking_expired: 'bg-amber-50 text-amber-600',
  booking_reminder: 'bg-indigo-50 text-indigo-600',
}

const icon = computed(() => iconMap[props.notification.type] ?? BellAlertIcon)
const iconColor = computed(() => colorMap[props.notification.type] ?? 'bg-slate-50 text-slate-600')

const timeLabel = computed(() => {
  if (!props.notification.created_at) return ''

  const date = new Date(props.notification.created_at)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
})

function handleClick() {
  emit('read', props.notification.id)
}
</script>

<template>
  <article
    class="flex cursor-pointer gap-3 px-5 py-4 transition hover:bg-slate-50"
    :class="{ 'bg-indigo-50/40': !notification.is_read }"
    @click="handleClick"
  >
    <div class="flex size-9 shrink-0 items-center justify-center rounded-full" :class="iconColor">
      <component :is="icon" class="size-4 stroke-2" />
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <p
          class="text-sm leading-5"
          :class="
            notification.is_read ? 'font-normal text-slate-700' : 'font-semibold text-slate-900'
          "
        >
          {{ notification.title }}
        </p>

        <div class="flex shrink-0 items-center gap-1.5">
          <span class="text-xs leading-4 text-slate-400">{{ timeLabel }}</span>
          <span v-if="!notification.is_read" class="size-2 shrink-0 rounded-full bg-indigo-600" />
        </div>
      </div>

      <p class="mt-0.5 text-sm leading-5 text-slate-500">{{ notification.message }}</p>
    </div>
  </article>
</template>
