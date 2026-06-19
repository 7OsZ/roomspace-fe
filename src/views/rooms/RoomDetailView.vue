<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const roomSlug = computed(() => {
  return String(route.params.slug)
})
</script>

<template>
  <div class="grid grid-cols-4 gap-x-5 px-4 py-6">
    <div class="col-span-4">
      <h1 class="text-xl font-semibold text-slate-900">Room Detail</h1>

      <p class="mt-2 text-sm leading-5 text-slate-600">
        Selected room:
        <span class="font-medium text-slate-900">{{ roomSlug }}</span>
      </p>
    </div>
  </div>
</template>
