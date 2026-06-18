<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

interface Props {
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  error?: string
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  error: '',
  autocomplete: 'off',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-slate-900">
      {{ label }}
    </label>

    <div class="relative">
      <EnvelopeIcon
        class="pointer-events-none absolute top-1/2 left-2 size-6 -translate-y-1/2 text-slate-500 stroke-2"
      />

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="h-11 w-full rounded-sm border bg-white pl-10 pr-4 text-base font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:ring-2"
        :class="
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
        "
        @input="handleInput"
      />
    </div>

    <p v-if="error" :id="`${id}-error`" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
