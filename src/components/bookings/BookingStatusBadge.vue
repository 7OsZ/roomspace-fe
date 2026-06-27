<script setup lang="ts">
import type { BookingStatus } from '@/types/booking'

defineProps<{
  status: BookingStatus
}>()

function getStatusLabel(status: BookingStatus): string {
  if (status === 'approved') {
    return 'Approved'
  }

  if (status === 'cancelled') {
    return 'Cancelled'
  }

  return 'Expired'
}

function getStatusClass(status: BookingStatus): string {
  if (status === 'approved') {
    return 'bg-indigo-50 text-indigo-700 outline-indigo-100'
  }

  if (status === 'cancelled') {
    return 'bg-red-50 text-red-700 outline-red-100'
  }

  return 'bg-slate-100 text-slate-600 outline-slate-200'
}
</script>

<template>
  <span
    class="inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold outline-1 -outline-offset-1"
    :class="getStatusClass(status)"
  >
    {{ getStatusLabel(status) }}
  </span>
</template>
