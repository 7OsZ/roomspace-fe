<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import HomeHero from '@/components/home/HomeHero.vue'
import RoomCard from '@/components/home/RoomCard.vue'
import UpNextCard from '@/components/home/UpNextCard.vue'

import HomeHeroSkeleton from '@/components/home/skeleton/HomeHeroSkeleton.vue'
import RoomCardSkeleton from '@/components/home/skeleton/RoomCardSkeleton.vue'
import UpNextCardSkeleton from '@/components/home/skeleton/UpNextCardSkeleton.vue'

import { bookingService } from '@/services/bookingService'
import { roomService } from '@/services/roomService'
import { useAuthStore } from '@/stores/auth'
import type { NextBooking } from '@/types/booking'
import type { Room } from '@/types/room'
import { formatReadableDate, formatTimeRange } from '@/utils/dateFormatter'
import { getGreetingByCurrentTime } from '@/utils/greetings'
import { getRoomFacilitiesText, getRoomImageUrl } from '@/utils/roomFormatter'

const authStore = useAuthStore()

const rooms = ref<Room[]>([])
const nextBooking = ref<NextBooking | null>(null)

const isLoadingHomepage = ref(true)
const homepageError = ref('')

const recommendedRooms = computed(() => {
  return rooms.value.slice(0, 3)
})

const firstName = computed(() => {
  return authStore.user?.name?.split(' ')[0] ?? 'Employee'
})

const greeting = computed(() => {
  return getGreetingByCurrentTime()
})

async function fetchHomepageData() {
  isLoadingHomepage.value = true
  homepageError.value = ''

  try {
    const [summary, roomList] = await Promise.all([
      bookingService.getSummary(),
      roomService.getRooms(),
    ])

    nextBooking.value = summary.next_booking
    rooms.value = roomList
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
    homepageError.value = 'Unable to load homepage data.'
  } finally {
    isLoadingHomepage.value = false
  }
}

onMounted(() => {
  fetchHomepageData()
})
</script>

<template>
  <div>
    <template v-if="isLoadingHomepage">
      <HomeHeroSkeleton />

      <section
        class="mt-8 grid grid-cols-4 gap-x-5 px-4 md:mt-12 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-12">
          <div class="h-6 w-20 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-4 grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6">
            <UpNextCardSkeleton v-for="item in 2" :key="item" class="col-span-4 md:col-span-4" />
          </div>
        </div>
      </section>

      <section
        class="mt-8 grid grid-cols-4 gap-x-5 px-4 pb-8 md:mt-12 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-12">
          <div class="h-6 w-40 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-4 grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6">
            <RoomCardSkeleton v-for="item in 3" :key="item" class="col-span-4 md:col-span-4" />
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <HomeHero :name="firstName" :greeting="greeting" />

      <section
        class="mt-8 grid grid-cols-4 gap-x-5 px-4 md:mt-12 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-12">
          <h2 class="text-lg font-semibold text-slate-900 md:text-2xl md:leading-6">Up Next</h2>

          <div
            v-if="homepageError"
            class="mt-4 rounded bg-red-50 px-3 py-4 text-sm text-red-700 md:mt-5"
          >
            {{ homepageError }}
          </div>

          <div
            v-else-if="nextBooking"
            class="mt-4 grid grid-cols-4 gap-x-5 gap-y-4 md:mt-5 md:grid-cols-12 md:gap-x-6"
          >
            <UpNextCard
              class="col-span-4 md:col-span-4"
              :title="nextBooking.title"
              :date="formatReadableDate(nextBooking.start_datetime)"
              :time="formatTimeRange(nextBooking.start_datetime, nextBooking.end_datetime)"
              :room="nextBooking.room?.name ?? '-'"
              :floor="nextBooking.room?.location ?? '-'"
            />
          </div>

          <div
            v-else
            class="mt-4 rounded bg-white px-3 py-4 text-sm text-slate-500 shadow-sm md:mt-5 md:w-96"
          >
            You have no upcoming bookings.
          </div>
        </div>
      </section>

      <section
        class="mt-8 grid grid-cols-4 gap-x-5 px-4 pb-8 md:mt-12 md:grid-cols-12 md:gap-x-6 md:px-16"
      >
        <div class="col-span-4 md:col-span-12">
          <h2 class="text-lg font-semibold text-slate-900 md:text-2xl md:leading-6">
            Recommended Rooms
          </h2>

          <div
            v-if="homepageError"
            class="mt-4 rounded bg-red-50 px-3 py-4 text-sm text-red-700 md:mt-5"
          >
            {{ homepageError }}
          </div>

          <div
            v-else-if="recommendedRooms.length"
            class="mt-4 grid grid-cols-4 gap-4 gap-x-5 gap-y-4 md:mt-5 md:grid-cols-12 md:gap-x-6"
          >
            <RoomCard
              v-for="room in recommendedRooms"
              :key="room.id"
              class="col-span-4 md:col-span-4"
              :slug="room.slug"
              :image="getRoomImageUrl(room.image)"
              :name="room.name"
              :floor="room.location"
              :capacity="`Up to ${room.capacity} People`"
              :facilities="getRoomFacilitiesText(room)"
            />
          </div>

          <div v-else class="mt-4 rounded bg-white px-3 py-4 text-sm text-slate-500 md:mt-5">
            No rooms available.
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
