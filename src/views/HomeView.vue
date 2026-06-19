<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import HomeHero from '@/components/home/HomeHero.vue'
import RoomCard from '@/components/home/RoomCard.vue'

import HomeHeroSkeleton from '@/components/home/skeleton/HomeHeroSkeleton.vue'
import RoomCardSkeleton from '@/components/home/skeleton/RoomCardSkeleton.vue'
import UpNextCardSkeleton from '@/components/home/skeleton/UpNextCardSkeleton.vue'

import { roomService } from '@/services/roomService'
import { useAuthStore } from '@/stores/auth'
import { getGreetingByCurrentTime } from '@/utils/greetings'
import { getRoomFacilitiesText, getRoomImageUrl } from '@/utils/roomFormatter'

import type { Room } from '@/types/room'

const authStore = useAuthStore()

const rooms = ref<Room[]>([])
const isLoadingRooms = ref(true)
const roomsError = ref('')

const firstName = computed(() => {
  return authStore.user?.name?.split(' ')[0] ?? 'Employee'
})

const greeting = computed(() => {
  return getGreetingByCurrentTime()
})

async function fetchRooms() {
  isLoadingRooms.value = true
  roomsError.value = ''

  try {
    rooms.value = await roomService.getRooms()
  } catch (error) {
    console.error('Failed to fetch rooms:', error)
    roomsError.value = 'Unable to load rooms.'
  } finally {
    isLoadingRooms.value = false
  }
}

onMounted(() => {
  fetchRooms()
})
</script>

<template>
  <div>
    <template v-if="isLoadingRooms">
      <HomeHeroSkeleton />

      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4">
        <div class="col-span-4">
          <div class="h-6 w-20 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-4 flex flex-col gap-4">
            <UpNextCardSkeleton v-for="item in 2" :key="item" />
          </div>
        </div>
      </section>

      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4 pb-8">
        <div class="col-span-4">
          <div class="h-6 w-40 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-4 flex flex-col gap-4">
            <RoomCardSkeleton v-for="item in 3" :key="item" />
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <HomeHero :name="firstName" :greeting="greeting" />

      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4">
        <div class="col-span-4">
          <h2 class="text-lg font-semibold text-slate-900">Up Next</h2>

          <div class="mt-4 rounded bg-white px-3 py-4 text-sm text-slate-500 shadow-sm">
            You have no upcoming bookings.
          </div>
        </div>
      </section>

      <section class="mt-8 grid grid-cols-4 gap-x-5 px-4 pb-8">
        <div class="col-span-4">
          <h2 class="text-lg font-semibold text-slate-900">Recommended Rooms</h2>

          <div v-if="roomsError" class="mt-4 rounded bg-red-50 px-3 py-4 text-sm text-red-700">
            {{ roomsError }}
          </div>

          <div v-else-if="rooms.length" class="mt-4 flex flex-col gap-4">
            <RoomCard
              v-for="room in rooms"
              :key="room.id"
              :slug="room.slug"
              :image="getRoomImageUrl(room.image)"
              :name="room.name"
              :floor="room.location"
              :capacity="`Up to ${room.capacity} People`"
              :facilities="getRoomFacilitiesText(room)"
            />
          </div>

          <div v-else class="mt-4 rounded bg-white px-3 py-4 text-sm text-slate-500">
            No rooms available.
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
