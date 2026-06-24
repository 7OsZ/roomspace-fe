<script setup lang="ts">
const props = defineProps<{
  meetingTitle: string
  participantCount: string
  description: string
  capacity: number
}>()

const emit = defineEmits<{
  'update:meetingTitle': [value: string]
  'update:participantCount': [value: string]
  'update:description': [value: string]
}>()

function updateMeetingTitle(event: Event) {
  emit('update:meetingTitle', (event.target as HTMLInputElement).value)
}

function updateParticipantCount(event: Event) {
  emit('update:participantCount', (event.target as HTMLInputElement).value)
}

function updateDescription(event: Event) {
  emit('update:description', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <section class="rounded bg-white px-4 py-4 shadow-xs">
    <h2 class="text-base leading-5 font-semibold text-slate-600 uppercase">Meeting Details</h2>

    <div class="mt-4">
      <label for="meeting-title" class="text-sm leading-5 font-medium text-slate-700">
        Meeting Title
      </label>

      <input
        id="meeting-title"
        :value="props.meetingTitle"
        type="text"
        placeholder="eg. Code Review"
        class="mt-2 flex h-12 w-full rounded bg-slate-50 px-3 text-sm text-slate-900 shadow-xs outline-1 -outline-offset-1 outline-slate-300 transition placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-700"
        @input="updateMeetingTitle"
      />
    </div>

    <div class="mt-4">
      <div class="flex items-center justify-between gap-4">
        <label for="participant-count" class="text-sm leading-5 font-medium text-slate-700">
          Participant Count
        </label>

        <p class="text-xs leading-4 text-slate-500">Max {{ props.capacity }} people</p>
      </div>

      <input
        id="participant-count"
        :value="props.participantCount"
        type="number"
        min="1"
        :max="props.capacity"
        placeholder="eg. 6"
        class="mt-2 flex h-12 w-full rounded bg-slate-50 px-3 text-sm text-slate-900 shadow-xs outline-1 -outline-offset-1 outline-slate-300 transition placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-700"
        @input="updateParticipantCount"
      />
    </div>

    <div class="mt-4">
      <label for="meeting-description" class="text-sm leading-5 font-medium text-slate-700">
        Description
      </label>

      <textarea
        id="meeting-description"
        :value="props.description"
        rows="5"
        placeholder="Add meeting notes or agenda"
        class="mt-2 w-full resize-none rounded bg-slate-50 px-3 py-3 text-sm leading-5 text-slate-900 shadow-xs outline-1 -outline-offset-1 outline-slate-300 transition placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-700"
        @input="updateDescription"
      ></textarea>
    </div>
  </section>
</template>
