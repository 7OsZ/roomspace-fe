<script setup lang="ts">
import { BellIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-col items-center justify-center px-4 py-16 text-center">
    <div class="flex size-14 items-center justify-center rounded-full bg-slate-100">
      <BellIcon class="size-6 stroke-2 text-slate-400" />
    </div>

    <p class="mt-4 text-base font-semibold text-slate-900">No notifications yet</p>
    <p class="mt-1 text-sm leading-5 text-slate-500">
      You'll be notified when your booking status changes.
    </p>
  </div>
</template>
