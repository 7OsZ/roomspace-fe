<script setup lang="ts">
import { Bars3Icon, BellIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="grid grid-cols-4 px-4 py-2 bg-white h-12">
    <div class="col-span-4 flex items-center justify-between">
      <p class="text-xl font-bold text-indigo-700">Roomspace</p>

      <div class="flex items-center gap-6 text-slate-600">
        <button type="button" aria-label="Open notifications">
          <BellIcon class="size-5" />
        </button>

        <button type="button" aria-label="Open menu">
          <Bars3Icon class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>
