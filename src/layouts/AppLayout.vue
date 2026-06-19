<script setup lang="ts">
import MobileNavbar from '@/components/layout/MobileNavbar.vue'
</script>

<template>
  <main class="min-h-svh bg-indigo-50">
    <MobileNavbar />

    <RouterView />
  </main>
</template>
