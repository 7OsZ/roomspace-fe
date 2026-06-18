import axios from 'axios'

import type { ApiErrorResponse } from '@/types/api'

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return 'Something went wrong. Please try again.'
  }

  if (!error.response) {
    return 'Unable to connect. Check your connection and try again.'
  }

  const status = error.response.status
  const message = error.response.data?.message

  if (status === 401) {
    return 'The email or password you entered is incorrect.'
  }

  if (status === 422) {
    return message || 'Please check your input and try again.'
  }

  if (status === 429) {
    return 'Too many login attempts. Please try again later.'
  }

  if (status >= 500) {
    return 'We couldn’t sign you in. Please try again.'
  }

  return message || 'Something went wrong. Please try again.'
}

export function getValidationErrors(error: unknown): Record<string, string[]> {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {}
  }

  return error.response?.data?.errors ?? {}
}
