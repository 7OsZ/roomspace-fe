<script setup lang="ts">
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  IdentificationIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

import type { User } from '@/types/auth'

defineProps<{
  user: User
}>()
</script>

<template>
  <section class="rounded bg-white px-5 py-5 shadow-xs">
    <div class="flex items-center gap-4">
      <div class="flex size-14 shrink-0 items-center justify-center rounded-full bg-indigo-50">
        <UserCircleIcon class="size-8 text-indigo-700" />
      </div>

      <div class="min-w-0">
        <p class="truncate text-lg font-semibold leading-7 text-slate-900">{{ user.name }}</p>
        <p class="mt-0.5 truncate text-sm leading-5 text-slate-500">{{ user.email }}</p>
      </div>
    </div>

    <div class="mt-5 divide-y divide-slate-100">
      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <IdentificationIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Employee ID</p>
        </div>
        <p class="text-right text-sm font-medium leading-5 text-slate-900">
          {{ user.employee_id }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <EnvelopeIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Email</p>
        </div>
        <p class="max-w-[55%] truncate text-right text-sm font-medium leading-5 text-slate-900">
          {{ user.email }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <BuildingOfficeIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Department</p>
        </div>
        <p class="text-right text-sm font-medium leading-5 text-slate-900">
          {{ user.department?.name ?? '-' }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4 py-3">
        <div class="flex items-center gap-2 text-slate-500">
          <UserCircleIcon class="size-4 shrink-0 stroke-2 text-indigo-700" />
          <p class="text-sm leading-5">Role</p>
        </div>
        <span
          class="inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold capitalize"
          :class="
            user.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
          "
        >
          {{ user.role }}
        </span>
      </div>
    </div>
  </section>
</template>
