<script setup lang="ts">
import { ClockIcon, IdentificationIcon, MapPinIcon, UsersIcon } from '@heroicons/vue/24/outline'

import type { Room } from '@/types/room'
import { getRoomImageUrl } from '@/utils/roomFormatter'

const props = defineProps<{
  room: Room
}>()

const roomImageUrl = props.room.image ? getRoomImageUrl(props.room.image) : ''

const roomMetaText = `${props.room.location} • Up to ${props.room.capacity} People • ${props.room.code}`
</script>

<template>
  <div>
    <div class="h-53.5 w-full overflow-hidden rounded bg-slate-200 shadow-sm md:h-96">
      <img
        v-if="roomImageUrl"
        :src="roomImageUrl"
        :alt="room.name"
        class="h-full w-full object-cover"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500"
      >
        No image available
      </div>
    </div>

    <div class="mt-4">
      <h1 class="text-3xl leading-10 font-semibold text-slate-900 md:text-4xl md:leading-11">
        {{ room.name }}
      </h1>

      <p class="mt-1 text-sm leading-5 font-normal text-slate-500">
        {{ roomMetaText }}
      </p>
    </div>

    <div
      v-if="room.is_under_maintenance || !room.is_active"
      class="mt-5 rounded bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800 shadow-xs"
    >
      <template v-if="room.is_under_maintenance">
        This room is currently under maintenance.
      </template>
      <template v-else> This room is currently inactive. </template>
    </div>

    <article class="mt-4 rounded bg-white px-4 py-4 shadow-xs border border-slate-100">
      <h2 class="text-sm leading-5 font-semibold text-slate-700 uppercase">About this room</h2>

      <p class="mt-2 text-xs leading-4 font-normal text-slate-700">
        {{ room.description || 'No description available.' }}
      </p>
    </article>

    <article class="mt-4 rounded bg-white px-4 py-4 shadow-xs border border-slate-100">
      <h2 class="text-sm leading-5 font-semibold text-slate-700 uppercase">Room Information</h2>

      <div class="mt-4 space-y-3">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-2 text-slate-600">
            <MapPinIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Location</p>
          </div>

          <p class="max-w-48 text-right text-sm leading-5 font-medium text-slate-900">
            {{ room.location }}
          </p>
        </div>

        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-2 text-slate-600">
            <UsersIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Capacity</p>
          </div>

          <p class="max-w-48 text-right text-sm leading-5 font-medium text-slate-900">
            Up to {{ room.capacity }} People
          </p>
        </div>

        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-2 text-slate-600">
            <ClockIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Operating Hours</p>
          </div>

          <p class="max-w-48 text-right text-sm leading-5 font-medium text-slate-900">
            08:00 - 18:00
          </p>
        </div>

        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-2 text-slate-600">
            <IdentificationIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
            <p class="text-sm leading-5 font-normal">Room Code</p>
          </div>

          <p class="max-w-48 text-right text-sm leading-5 font-medium text-slate-900">
            {{ room.code }}
          </p>
        </div>
      </div>

      <div v-if="room.facilities.length" class="mt-6">
        <h3 class="text-sm leading-5 font-semibold text-slate-700 uppercase">Facilities</h3>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="facility in room.facilities"
            :key="facility.id"
            class="inline-flex h-7.5 items-center gap-1.5 rounded-full bg-slate-50 px-3 text-xs font-medium text-slate-700 border border-slate-200"
          >
            <span class="size-1.5 rounded-full bg-indigo-700"></span>
            {{ facility.name }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>
