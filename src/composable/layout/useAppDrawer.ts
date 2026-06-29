import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useAppDrawer() {
  const isOpen = ref(false)
  const route = useRoute()

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  // Close drawer on every route change
  watch(
    () => route.fullPath,
    () => {
      isOpen.value = false
    },
  )

  return {
    isOpen,
    open,
    close,
  }
}
