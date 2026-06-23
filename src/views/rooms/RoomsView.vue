<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import RoomCard from '@/components/home/RoomCard.vue'
import RoomCardSkeleton from '@/components/home/skeleton/RoomCardSkeleton.vue'

import { roomService } from '@/services/roomService'
import type { Room } from '@/types/room'
import { getRoomFacilitiesText, getRoomImageUrl } from '@/utils/roomFormatter'

type ActiveDropdown = 'capacity' | 'facility' | 'floor' | null

const rooms = ref<Room[]>([])
const searchKeyword = ref('')

const selectedCapacity = ref<number | null>(null)
const selectedFacilities = ref<string[]>([])
const selectedFloor = ref('')

const activeDropdown = ref<ActiveDropdown>(null)

const isLoadingRooms = ref(true)
const roomsError = ref('')

const capacityOptions = computed(() => {
  const capacities = rooms.value
    .map((room) => room.capacity)
    .filter((capacity) => Number.isFinite(capacity))

  return [...new Set(capacities)].sort((a, b) => a - b)
})

const facilityOptions = computed(() => {
  const facilities = rooms.value.flatMap((room) => {
    return Array.isArray(room.facilities)
      ? room.facilities.map((facility) => facility.name).filter(Boolean)
      : []
  })

  return [...new Set(facilities)].sort((a, b) => a.localeCompare(b))
})

const floorOptions = computed(() => {
  const floors = rooms.value.map((room) => room.location).filter(Boolean)

  return [...new Set(floors)].sort((a, b) => a.localeCompare(b))
})

const hasActiveFilter = computed(() => {
  return (
    searchKeyword.value.trim().length > 0 ||
    selectedCapacity.value !== null ||
    selectedFacilities.value.length > 0 ||
    selectedFloor.value !== ''
  )
})

function clearSearch() {
  searchKeyword.value = ''
}

const filteredRooms = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  return rooms.value.filter((room) => {
    const facilityNames = Array.isArray(room.facilities)
      ? room.facilities.map((facility) => facility.name)
      : []

    const searchableText = [
      room.name,
      room.slug,
      room.code,
      room.location,
      String(room.capacity),
      room.description ?? '',
      facilityNames.join(' '),
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch = keyword ? searchableText.includes(keyword) : true

    const matchesCapacity =
      selectedCapacity.value !== null ? room.capacity === selectedCapacity.value : true

    const matchesFacility = selectedFacilities.value.length
      ? selectedFacilities.value.every((facility) => facilityNames.includes(facility))
      : true

    const matchesFloor = selectedFloor.value ? room.location === selectedFloor.value : true

    return matchesSearch && matchesCapacity && matchesFacility && matchesFloor
  })
})

const capacityButtonLabel = computed(() => {
  return selectedCapacity.value !== null ? `Up to ${selectedCapacity.value}` : 'Capacity'
})

const facilityButtonLabel = computed(() => {
  if (!selectedFacilities.value.length) {
    return 'Facility'
  }

  if (selectedFacilities.value.length === 1) {
    return selectedFacilities.value[0]
  }

  return `${selectedFacilities.value.length} facilities`
})

const floorButtonLabel = computed(() => {
  return selectedFloor.value || 'Floor'
})

async function fetchRooms() {
  isLoadingRooms.value = true
  roomsError.value = ''
  activeDropdown.value = null

  try {
    rooms.value = await roomService.getRooms()
  } catch (error) {
    console.error('Failed to fetch rooms:', error)
    roomsError.value = 'Unable to load rooms.'
  } finally {
    isLoadingRooms.value = false
  }
}

function toggleDropdown(dropdown: Exclude<ActiveDropdown, null>) {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

function selectCapacity(capacity: number) {
  selectedCapacity.value = capacity
  activeDropdown.value = null
}

function toggleFacility(facility: string) {
  if (selectedFacilities.value.includes(facility)) {
    selectedFacilities.value = selectedFacilities.value.filter((item) => item !== facility)
    return
  }

  selectedFacilities.value = [...selectedFacilities.value, facility]
}

function selectFloor(floor: string) {
  selectedFloor.value = floor
  activeDropdown.value = null
}

function resetFilters() {
  searchKeyword.value = ''
  selectedCapacity.value = null
  selectedFacilities.value = []
  selectedFloor.value = ''
  activeDropdown.value = null
}

onMounted(() => {
  fetchRooms()
})
</script>

<template>
  <div class="pb-12">
    <section class="grid grid-cols-4 gap-x-5 px-4 pt-7 md:grid-cols-12 md:gap-x-6 md:px-16 md:pt-8">
      <div class="col-span-4 md:col-span-8">
        <h1 class="text-3xl leading-10 font-semibold text-slate-900 md:text-4xl md:leading-12">
          Rooms
        </h1>

        <p class="mt-1 text-sm leading-5 font-normal text-slate-500 md:mt-2">
          Browse available meeting rooms and choose the best space for your schedule.
        </p>
      </div>
    </section>

    <section
      class="mt-6 grid grid-cols-4 gap-x-5 gap-y-4 px-4 md:grid-cols-12 md:items-start md:gap-x-6 md:px-16"
    >
      <div class="col-span-4 md:col-span-5">
        <label
          for="room-search"
          class="flex h-13 items-center gap-2 rounded bg-slate-50 px-2.5 py-3.5 text-base font-normal text-slate-600 shadow-xs transition focus-within:ring-1 focus-within:ring-indigo-700"
        >
          <MagnifyingGlassIcon class="size-4 shrink-0 text-slate-600 stroke-2" />

          <input
            id="room-search"
            v-model="searchKeyword"
            type="text"
            placeholder="Search rooms"
            class="h-full min-w-0 flex-1 bg-transparent text-base font-normal text-slate-700 outline-none placeholder:text-slate-500"
          />

          <button
            v-if="searchKeyword"
            type="button"
            aria-label="Clear search"
            class="flex size-5 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 active:bg-slate-300"
            @click="clearSearch"
          >
            <XMarkIcon class="size-4 stroke-2" />
          </button>
        </label>
      </div>

      <div class="col-span-4 flex flex-wrap items-start gap-3 md:col-span-7">
        <div class="relative">
          <button
            type="button"
            class="inline-flex h-11 items-center gap-2 rounded bg-slate-50 px-2.5 text-sm font-medium outline-1 -outline-offset-1 transition"
            :class="
              selectedCapacity !== null || activeDropdown === 'capacity'
                ? 'text-indigo-700 outline-indigo-700'
                : 'text-slate-600 outline-slate-300 hover:text-indigo-700 hover:outline-indigo-300'
            "
            @click="toggleDropdown('capacity')"
          >
            {{ capacityButtonLabel }}

            <ChevronDownIcon
              class="size-4 transition"
              :class="activeDropdown === 'capacity' ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="activeDropdown === 'capacity'"
            class="absolute left-0 z-20 mt-2 w-44 rounded bg-slate-50 py-2 shadow-lg outline-1 outline-slate-200"
          >
            <button
              v-for="capacity in capacityOptions"
              :key="capacity"
              type="button"
              class="flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-700"
              :class="
                selectedCapacity === capacity ? 'font-semibold text-indigo-700' : 'text-slate-600'
              "
              @click="selectCapacity(capacity)"
            >
              Up to {{ capacity }} people
            </button>
          </div>
        </div>

        <div class="relative">
          <button
            type="button"
            class="inline-flex h-11 items-center gap-2 rounded bg-slate-50 px-2.5 text-sm font-medium outline-1 -outline-offset-1 transition"
            :class="
              selectedFacilities.length || activeDropdown === 'facility'
                ? 'text-indigo-700 outline-indigo-700'
                : 'text-slate-600 outline-slate-300 hover:text-indigo-700 hover:outline-indigo-300'
            "
            @click="toggleDropdown('facility')"
          >
            <span class="truncate">
              {{ facilityButtonLabel }}
            </span>

            <ChevronDownIcon
              class="size-4 shrink-0 transition"
              :class="activeDropdown === 'facility' ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="activeDropdown === 'facility'"
            class="absolute left-0 z-20 mt-2 max-h-64 w-56 overflow-y-auto rounded bg-slate-50 py-2 shadow-lg outline-1 outline-slate-200"
          >
            <button
              v-for="facility in facilityOptions"
              :key="facility"
              type="button"
              class="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-700"
              :class="
                selectedFacilities.includes(facility)
                  ? 'font-semibold text-indigo-700'
                  : 'text-slate-600'
              "
              @click="toggleFacility(facility)"
            >
              <span class="truncate">
                {{ facility }}
              </span>

              <CheckIcon
                v-if="selectedFacilities.includes(facility)"
                class="size-4 shrink-0 stroke-2"
              />
            </button>
          </div>
        </div>

        <div class="relative">
          <button
            type="button"
            class="inline-flex h-11 items-center gap-2 rounded bg-slate-50 px-2.5 text-sm font-medium outline-1 -outline-offset-1 transition"
            :class="
              selectedFloor || activeDropdown === 'floor'
                ? 'text-indigo-700 outline-indigo-700'
                : 'text-slate-600 outline-slate-300 hover:text-indigo-700 hover:outline-indigo-300'
            "
            @click="toggleDropdown('floor')"
          >
            {{ floorButtonLabel }}

            <ChevronDownIcon
              class="size-4 transition"
              :class="activeDropdown === 'floor' ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="activeDropdown === 'floor'"
            class="absolute left-0 z-20 mt-2 max-h-64 w-56 overflow-y-auto rounded bg-slate-50 py-2 shadow-lg outline-1 outline-slate-200"
          >
            <button
              v-for="floor in floorOptions"
              :key="floor"
              type="button"
              class="flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-700"
              :class="selectedFloor === floor ? 'font-semibold text-indigo-700' : 'text-slate-600'"
              @click="selectFloor(floor)"
            >
              {{ floor }}
            </button>
          </div>
        </div>

        <button
          v-if="hasActiveFilter"
          type="button"
          class="h-11 text-sm font-medium text-slate-700 underline underline-offset-2 transition hover:text-indigo-700"
          @click="resetFilters"
        >
          <span class="md:hidden">Reset</span>
          <span class="hidden md:inline">Reset filters</span>
        </button>
      </div>
    </section>

    <section class="mt-6 grid grid-cols-4 gap-x-5 px-4 md:grid-cols-12 md:gap-x-6 md:px-16">
      <div class="col-span-4 md:col-span-12">
        <template v-if="isLoadingRooms">
          <div class="h-5 w-24 animate-pulse rounded bg-slate-200"></div>

          <div class="mt-4 grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6 md:gap-y-4">
            <RoomCardSkeleton v-for="item in 6" :key="item" class="col-span-4 md:col-span-4" />
          </div>
        </template>

        <template v-else-if="roomsError">
          <div class="rounded bg-white px-4 py-5 shadow-sm md:w-96">
            <h2 class="text-base font-semibold text-slate-900">Unable to load rooms</h2>

            <p class="mt-1 text-sm leading-5 text-slate-500">Please try again in a moment.</p>

            <button
              type="button"
              class="mt-4 inline-flex h-10 items-center justify-center rounded bg-indigo-700 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
              @click="fetchRooms"
            >
              Retry
            </button>
          </div>
        </template>

        <template v-else>
          <p class="text-xs leading-4 text-slate-900">
            <span class="font-semibold">{{ filteredRooms.length }}</span>
            <span class="font-normal">
              {{ filteredRooms.length === 1 ? ' room found' : ' rooms found' }}</span
            >
          </p>

          <div
            v-if="filteredRooms.length"
            class="mt-4 grid grid-cols-4 gap-x-5 gap-y-4 md:grid-cols-12 md:gap-x-6 md:gap-y-4"
          >
            <RoomCard
              v-for="room in filteredRooms"
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

          <div v-else class="mt-4 rounded bg-white px-4 py-5 shadow-sm md:w-96">
            <h2 class="text-base font-semibold text-slate-900">No rooms found</h2>

            <p class="mt-1 text-sm leading-5 text-slate-500">
              Try adjusting your search keyword or filters.
            </p>

            <button
              v-if="hasActiveFilter"
              type="button"
              class="mt-4 text-sm font-medium text-indigo-700 underline underline-offset-2 transition hover:text-indigo-900"
              @click="resetFilters"
            >
              Reset filters
            </button>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
