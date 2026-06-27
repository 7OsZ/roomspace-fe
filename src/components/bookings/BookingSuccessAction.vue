<script setup lang="ts">
defineProps<{
  primaryLabel?: string
  secondaryLabel?: string
}>()

const emit = defineEmits<{
  primary: []
  secondary: []
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3">
    <button
      type="button"
      class="flex h-12 items-center justify-center rounded bg-indigo-700 px-4 text-base font-semibold text-white shadow-xs transition hover:bg-indigo-800 active:bg-indigo-900"
      @click="emit('primary')"
    >
      {{ primaryLabel ?? 'Back to Home' }}
    </button>

    <button
      type="button"
      class="flex h-12 items-center justify-center rounded bg-white px-4 text-base font-semibold text-slate-700 shadow-xs outline-1 -outline-offset-1 outline-slate-300 transition hover:bg-slate-50"
      @click="emit('secondary')"
    >
      {{ secondaryLabel ?? 'Book Another Room' }}
    </button>
  </div>
</template>
