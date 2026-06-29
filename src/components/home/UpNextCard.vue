<script setup lang="ts">
import type { UpNextCardProps } from '@/types/home'
import { useRouter } from 'vue-router'

const props = defineProps<UpNextCardProps>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'booking-detail', params: { id: props.id } })
}
</script>

<template>
  <article
    class="h-20 cursor-pointer rounded border-l-2 border-indigo-700 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
    role="button"
    :aria-label="`View booking for ${title}`"
    @click="goToDetail"
  >
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
