import { ref } from 'vue'

import { bookingService } from '@/services/bookingService'
import type { Booking } from '@/types/booking'
import { getApiErrorMessage } from '@/utils/apiError'

export function useCancelBooking() {
  const isModalOpen = ref(false)
  const isCancelling = ref(false)
  const cancelError = ref('')
  const reason = ref('')

  function openModal() {
    reason.value = ''
    cancelError.value = ''
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
  }

  async function confirmCancel(
    bookingId: number,
    onSuccess: (updated: Booking) => void,
  ): Promise<void> {
    isCancelling.value = true
    cancelError.value = ''

    try {
      const updated = await bookingService.cancelBooking(
        bookingId,
        reason.value.trim() || undefined,
      )
      isModalOpen.value = false
      onSuccess(updated)
    } catch (error) {
      console.error('Failed to cancel booking:', error)
      cancelError.value = getApiErrorMessage(error)
    } finally {
      isCancelling.value = false
    }
  }

  return {
    isModalOpen,
    isCancelling,
    cancelError,
    reason,
    openModal,
    closeModal,
    confirmCancel,
  }
}
