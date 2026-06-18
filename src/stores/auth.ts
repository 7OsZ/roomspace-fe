import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authService } from '@/services/authService'
import type { LoginPayload, User } from '@/types/auth'
import { tokenStorage } from '@/utils/tokenStorage'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(tokenStorage.get())
  const isLoading = ref(false)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => {
    return token.value !== null && user.value !== null
  })

  async function login(payload: LoginPayload): Promise<void> {
    isLoading.value = true

    try {
      const data = await authService.login(payload)

      tokenStorage.set(data.token)
      token.value = data.token
      user.value = data.user
      isInitialized.value = true
    } catch (error) {
      tokenStorage.remove()
      token.value = null
      user.value = null
      isInitialized.value = true

      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCurrentUser(): Promise<void> {
    token.value = tokenStorage.get()

    if (!token.value) {
      user.value = null
      isInitialized.value = true
      return
    }

    try {
      user.value = await authService.getCurrentUser()
    } catch {
      tokenStorage.remove()
      token.value = null
      user.value = null
    } finally {
      isInitialized.value = true
    }
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout()
    } finally {
      tokenStorage.remove()
      token.value = null
      user.value = null
      isInitialized.value = true
    }
  }

  return {
    user,
    token,
    isLoading,
    isInitialized,
    isAuthenticated,
    login,
    fetchCurrentUser,
    logout,
  }
})
