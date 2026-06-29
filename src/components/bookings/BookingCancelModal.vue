<script setup lang="ts">
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  isCancelling: boolean
  cancelError: string
}>()

const reason = defineModel<string>('reason', { default: '' })

const emit = defineEmits<{
  confirm: []
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-0 pb-0 md:items-center md:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-modal-title"
      @click.self="emit('close')"
    >
      <div
        class="w-full rounded-t-2xl bg-white px-5 pt-6 pb-8 shadow-xl md:max-w-md md:rounded-2xl"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
              <ExclamationTriangleIcon class="size-5 stroke-2 text-red-600" />
            </div>

            <h2 id="cancel-modal-title" class="text-base font-semibold text-slate-900">
              Cancel Booking
            </h2>
          </div>

          <button
            type="button"
            class="text-slate-400 transition hover:text-slate-600"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <XMarkIcon class="size-5 stroke-2" />
          </button>
        </div>

        <p class="mt-3 text-sm leading-5 text-slate-500">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </p>

        <div class="mt-5">
          <label for="cancel-reason" class="text-sm font-medium text-slate-700">
            Reason
            <span class="ml-1 font-normal text-slate-400">(optional)</span>
          </label>

          <textarea
            id="cancel-reason"
            v-model="reason"
            rows="3"
            maxlength="255"
            placeholder="Let others know why you're cancelling..."
            class="mt-1.5 w-full resize-none rounded border border-slate-200 px-3 py-2.5 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
        </div>

        <p v-if="cancelError" class="mt-3 rounded bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {{ cancelError }}
        </p>

        <div class="mt-5 flex gap-3">
          <button
            type="button"
            class="flex h-10 flex-1 items-center justify-center rounded bg-white text-sm font-semibold text-slate-700 shadow-xs outline-1 -outline-offset-1 outline-slate-200 transition hover:bg-slate-50 active:bg-slate-100"
            :disabled="isCancelling"
            @click="emit('close')"
          >
            Keep Booking
          </button>

          <button
            type="button"
            class="flex h-10 flex-1 items-center justify-center rounded text-sm font-semibold text-white shadow-xs transition"
            :class="
              isCancelling
                ? 'cursor-not-allowed bg-red-400'
                : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
            "
            :disabled="isCancelling"
            @click="emit('confirm')"
          >
            {{ isCancelling ? 'Cancelling...' : 'Yes, Cancel' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
