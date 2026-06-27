<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import BookingListCard from '@/components/bookings/BookingListCard.vue'
import type { BookingTab } from '@/composable/bookings/useMyBookings'
import { useMyBookings } from '@/composable/bookings/useMyBookings'

const {
  activeTab,
  filteredBookings,
  upcomingBookings,
  pastBookings,
  cancelledBookings,
  emptyStateTitle,
  emptyStateDescription,
  isLoadingBookings,
  bookingsError,
  setActiveTab,
  fetchBookings,
} = useMyBookings()

const tabs: { label: string; value: BookingTab }[] = [
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
  {
    label: 'Past',
    value: 'past',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
]

function getTabCount(tab: BookingTab): number {
  if (tab === 'past') {
    return pastBookings.value.length
  }

  if (tab === 'cancelled') {
    return cancelledBookings.value.length
  }

  return upcomingBookings.value.length
}

function getTabClass(tab: BookingTab): string {
  if (activeTab.value === tab) {
    return 'bg-indigo-700 text-white'
  }

  return 'bg-white text-slate-600 outline-1 -outline-offset-1 outline-slate-200 hover:text-indigo-700 hover:outline-indigo-300'
}

onMounted(() => {
  fetchBookings()
})
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-7 md:grid-cols-12 md:gap-x-6 md:px-16 md:pt-8">
      <div class="col-span-4 md:col-span-8">
        <h1 class="text-3xl leading-10 font-bold text-slate-900 md:text-4xl md:leading-11">
          My Bookings
        </h1>

        <p class="mt-1 text-base leading-6 font-normal text-slate-500 md:mt-2">
          View and manage your meeting room bookings.
        </p>
      </div>
    </section>

    <section class="mt-6 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-12">
        <div class="flex gap-3 overflow-x-auto pb-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="flex h-10 shrink-0 items-center gap-2 rounded px-3 text-sm font-semibold shadow-xs transition"
            :class="getTabClass(tab.value)"
            @click="setActiveTab(tab.value)"
          >
            {{ tab.label }}
            <span
              class="rounded-full px-2 py-0.5 text-xs"
              :class="
                activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              "
            >
              {{ getTabCount(tab.value) }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="mt-5 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-12">
        <template v-if="isLoadingBookings">
          <div class="grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6">
            <div
              v-for="item in 4"
              :key="item"
              class="col-span-4 h-72 animate-pulse rounded bg-white shadow-xs md:col-span-6"
            ></div>
          </div>
        </template>

        <template v-else-if="bookingsError">
          <div class="rounded bg-white px-4 py-5 shadow-xs md:w-96">
            <h2 class="text-base font-semibold text-slate-900">Unable to load bookings</h2>

            <p class="mt-1 text-sm leading-5 text-slate-500">Please try again in a moment.</p>

            <button
              type="button"
              class="mt-4 inline-flex h-10 items-center justify-center rounded bg-indigo-700 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
              @click="fetchBookings"
            >
              Retry
            </button>
          </div>
        </template>

        <template v-else-if="filteredBookings.length">
          <div class="grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6">
            <BookingListCard
              v-for="booking in filteredBookings"
              :key="booking.id"
              :booking="booking"
              class="col-span-4 md:col-span-6"
            />
          </div>
        </template>

        <template v-else>
          <div class="rounded bg-white px-4 py-6 text-center shadow-xs md:w-96 md:text-left">
            <h2 class="text-base font-semibold text-slate-900">
              {{ emptyStateTitle }}
            </h2>

            <p class="mt-1 text-sm leading-5 text-slate-500">
              {{ emptyStateDescription }}
            </p>

            <RouterLink
              v-if="activeTab === 'upcoming'"
              :to="{ name: 'rooms' }"
              class="mt-4 inline-flex h-10 items-center justify-center rounded bg-indigo-700 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
            >
              Find a Room
            </RouterLink>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
