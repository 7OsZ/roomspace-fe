<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BuildingOffice2Icon } from '@heroicons/vue/24/outline'

import AuthInput from '@/components/auth/AuthInput.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import loginRoomImage from '@/assets/images/login-room.png'

import { useAuthStore } from '@/stores/auth'
import { getApiErrorMessage, getValidationErrors } from '@/utils/apiError'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const authError = ref('')

const isSubmitting = computed(() => authStore.isLoading)

watch(
  () => form.email,
  () => {
    errors.email = ''

    if (authError.value) {
      authError.value = ''
    }
  },
)

watch(
  () => form.password,
  () => {
    errors.password = ''

    if (authError.value) {
      authError.value = ''
    }
  },
)

function resetErrors() {
  errors.email = ''
  errors.password = ''
  authError.value = ''
}

function validateForm(): boolean {
  resetErrors()

  if (!form.email) {
    errors.email = 'Work email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  }

  return !errors.email && !errors.password
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    })

    const redirectPath =
      typeof route.query.redirect === 'string' && !route.query.redirect.startsWith('/login')
        ? route.query.redirect
        : '/'

    await router.replace(redirectPath)
  } catch (error) {
    const validationErrors = getValidationErrors(error)

    const emailError = validationErrors.email?.[0] ?? ''
    const passwordError = validationErrors.password?.[0] ?? ''

    errors.email = emailError
    errors.password = passwordError

    const hasFieldErrors = Boolean(emailError || passwordError)

    authError.value = hasFieldErrors ? '' : getApiErrorMessage(error)
  }
}
</script>

<template>
  <main class="min-h-svh bg-indigo-50 lg:h-svh lg:overflow-hidden">
    <div class="min-h-svh lg:grid lg:h-svh lg:grid-cols-12">
      <!-- Desktop Image Panel -->
      <section class="relative hidden h-svh overflow-hidden lg:col-span-6 lg:block">
        <img :src="loginRoomImage" alt="Modern meeting room" class="h-full w-full object-cover" />

        <div
          class="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
        ></div>

        <div class="absolute bottom-13.75 left-16.25 text-white">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center">
              <BuildingOffice2Icon class="size-6 text-white" />
            </div>

            <p class="text-2xl font-semibold text-white">Roomspace</p>
          </div>

          <p class="max-w-md text-sm leading-7 text-white/80">
            Enterprise meeting room coordination and scheduling.
          </p>
        </div>
      </section>

      <!-- Login Form Panel -->
      <section
        class="grid min-h-svh grid-cols-4 gap-x-5 px-4 pt-26 pb-8 lg:col-span-6 lg:flex lg:h-svh lg:min-h-0 lg:items-center lg:justify-center lg:px-0 lg:py-0"
      >
        <div class="col-span-4 w-full lg:w-98">
          <!-- Mobile Brand -->
          <div class="mb-7 flex items-center gap-2 lg:hidden">
            <div class="flex size-8 items-center justify-center rounded bg-indigo-700 text-white">
              <BuildingOffice2Icon class="size-5" />
            </div>

            <p class="text-xl font-semibold text-slate-900">Roomspace</p>
          </div>

          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-semibold leading-7 text-slate-900 lg:text-4xl">Sign in</h1>

            <p class="mt-1 text-base font-normal leading-7 text-slate-500 lg:mt-2 lg:text-lg">
              Enter your employee credentials to access Roomspace.
            </p>
          </div>

          <!-- Form -->
          <form novalidate @submit.prevent="handleSubmit">
            <div
              v-if="authError"
              class="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              role="alert"
            >
              {{ authError }}
            </div>

            <div class="flex flex-col gap-5">
              <AuthInput
                id="email"
                v-model="form.email"
                label="Work Email"
                type="email"
                placeholder="youremail@roomspace.com"
                autocomplete="email"
                :error="errors.email"
              />

              <PasswordInput
                id="password"
                v-model="form.password"
                label="Password"
                placeholder="password"
                autocomplete="current-password"
                :error="errors.password"
              />
            </div>

            <div class="mt-6 flex justify-end">
              <button
                type="button"
                class="text-sm font-medium leading-5 text-indigo-700 transition hover:text-indigo-900"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="mt-6 flex h-12 w-full items-center justify-center rounded bg-indigo-700 px-2.5 py-3 text-base font-semibold text-white transition hover:bg-indigo-800 active:bg-indigo-900 disabled:cursor-not-allowed disabled:bg-indigo-400 lg:rounded-md"
            >
              {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
            </button>
          </form>

          <!-- Footer Notice -->
          <div class="mt-14 flex items-center gap-3 lg:mt-16">
            <div class="h-px flex-1 bg-slate-400/70"></div>

            <p class="shrink-0 text-xs font-normal leading-4 text-slate-400">
              Internal Access Only
            </p>

            <div class="h-px flex-1 bg-slate-400/70"></div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
