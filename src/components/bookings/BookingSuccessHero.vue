<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{
  bookingNumber: string
}>()
</script>

<template>
  <section class="rounded bg-white px-5 py-6 text-center shadow-xs md:px-8 md:py-8">
    <div class="mx-auto flex size-16 items-center justify-center rounded-full bg-indigo-50">
      <CheckCircleIcon class="size-10 stroke-2 text-indigo-700" />
    </div>

    <h1 class="mt-5 text-3xl leading-10 font-bold text-slate-900">Booking Confirmed</h1>

    <p class="mt-2 text-base leading-6 text-slate-500">
      Your meeting room has been successfully booked.
    </p>

    <div class="mt-5 rounded bg-slate-50 px-4 py-4">
      <p class="text-xs leading-4 font-bold tracking-wide text-slate-500 uppercase">
        Booking Number
      </p>

      <p class="mt-1 text-lg leading-7 font-semibold text-slate-900">
        {{ bookingNumber || '-' }}
      </p>
    </div>
  </section>
</template>
