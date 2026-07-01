<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'

import { onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

onMounted(() => {
  notificationStore.fetchUnreadCount()
})
</script>

<template>
  <main class="min-h-svh bg-indigo-50">
    <AppNavbar />

    <div class="md:pt-18">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
