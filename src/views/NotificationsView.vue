<script setup lang="ts">
import { onMounted } from 'vue'

import NotificationEmptyState from '@/components/notifications/NotificationEmptyState.vue'
import NotificationItem from '@/components/notifications/NotificationItem.vue'
import { useNotifications } from '@/composable/notifications/useNotifications'

const {
  notifications,
  isLoading,
  isLoadingMore,
  isMarkingAll,
  error,
  hasMore,
  hasUnread,
  fetchNotifications,
  loadMore,
  markAsRead,
  markAllAsRead,
} = useNotifications()

onMounted(() => {
  fetchNotifications()
})
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 flex items-start justify-between md:col-span-12">
        <div>
          <h1 class="text-3xl leading-10 font-bold text-slate-900 md:text-4xl md:leading-11">
            Notifications
          </h1>
          <p class="mt-1 text-base leading-6 text-slate-500">
            Stay updated on your booking activity.
          </p>
        </div>

        <button
          v-if="hasUnread && !isLoading"
          type="button"
          class="mt-2 text-sm font-medium text-indigo-700 transition hover:text-indigo-900 disabled:opacity-50"
          :disabled="isMarkingAll"
          @click="markAllAsRead"
        >
          {{ isMarkingAll ? 'Marking...' : 'Mark all as read' }}
        </button>
      </div>
    </section>

    <section class="mt-5 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 overflow-hidden rounded bg-white shadow-xs md:col-span-7">
        <template v-if="isLoading">
          <div
            v-for="i in 5"
            :key="i"
            class="flex gap-3 border-b border-slate-100 px-5 py-4 last:border-0"
          >
            <div class="size-9 shrink-0 animate-pulse rounded-full bg-slate-200" />
            <div class="flex-1 space-y-2 py-1">
              <div class="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div class="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </template>

        <template v-else-if="error">
          <div class="px-5 py-10 text-center">
            <p class="text-sm text-slate-500">{{ error }}</p>
            <button
              type="button"
              class="mt-4 text-sm font-medium text-indigo-700 hover:text-indigo-900"
              @click="fetchNotifications"
            >
              Try again
            </button>
          </div>
        </template>

        <template v-else-if="notifications.length === 0">
          <NotificationEmptyState />
        </template>

        <template v-else>
          <div class="divide-y divide-slate-100">
            <NotificationItem
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              @read="markAsRead"
            />
          </div>

          <div v-if="hasMore" class="border-t border-slate-100 px-5 py-4 text-center">
            <button
              type="button"
              class="text-sm font-medium text-indigo-700 transition hover:text-indigo-900 disabled:opacity-50"
              :disabled="isLoadingMore"
              @click="loadMore"
            >
              {{ isLoadingMore ? 'Loading...' : 'Load more' }}
            </button>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
