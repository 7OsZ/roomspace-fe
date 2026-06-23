<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
</script>

<template>
  <main class="min-h-svh bg-indigo-50">
    <AppNavbar />
    <div class="md:pt-18">
      <RouterView />
    </div>
  </main>
</template>
