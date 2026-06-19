<script setup lang="ts">
import type { UpNextCardProps } from '@/types/home'

defineProps<UpNextCardProps>()
</script>

<template>
  <article class="h-20 rounded border-l-2 border-indigo-700 bg-white px-3 py-2 shadow-sm">
    <h3 class="text-base leading-6 font-semibold text-slate-900">
      {{ title }}
    </h3>

    <div class="mt-1 grid grid-cols-2 gap-x-4 text-xs leading-4 font-normal text-slate-900">
      <div>
        <p>{{ date }}</p>
        <p>{{ time }}</p>
      </div>

      <div>
        <p>{{ room }}</p>
        <p>{{ floor }}</p>
      </div>
    </div>
  </article>
</template>
