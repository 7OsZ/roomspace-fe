<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

interface Props {
  id: string
  label: string
  modelValue: string
  placeholder?: string
  error?: string
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  error: '',
  autocomplete: 'current-password',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isVisible = ref(false)

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-slate-900">
      {{ label }}
    </label>

    <div class="relative">
      <LockClosedIcon
        class="pointer-events-none absolute top-1/2 left-2 size-6 -translate-y-1/2 text-slate-500 stroke-2"
      />

      <input
        :id="id"
        :type="isVisible ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="h-11 w-full rounded-sm border bg-white pl-10 pr-11 text-base font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:ring-2"
        :class="
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
        "
        @input="handleInput"
      />

      <button
        type="button"
        class="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        :aria-label="isVisible ? 'Hide password' : 'Show password'"
        @click="toggleVisibility"
      >
        <EyeSlashIcon v-if="isVisible" class="size-5" />
        <EyeIcon v-else class="size-5" />
      </button>
    </div>

    <p v-if="error" :id="`${id}-error`" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
