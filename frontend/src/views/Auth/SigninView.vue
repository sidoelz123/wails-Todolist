<template>
  <div class="flex z-50 min-h-screen items-center justify-center text-foreground px-4">
    <DarkModeToggle class="absolute bottom-10 right-10 z-50 border-2 rounded-full" />
    <form @submit.prevent="handleLogin" class="w-full max-w-md bg-muted p-8 rounded-xl shadow-md space-y-6">
      <h2 class="text-2xl font-bold text-center">Sign In</h2>

      <input v-model="email" type="email" placeholder="Email" required
        class="w-full p-3 rounded bg-background text-foreground outline-none" />

      <input v-model="password" type="password" placeholder="Password" required
        class="w-full p-3 rounded bg-background text-foreground outline-none" />

      <button type="submit" :disabled="loading"
        class="w-full p-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>

      <p class="text-sm text-center">
        Belum punya akun?
        <router-link to="/signup" class="text-primary underline">Daftar di sini</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'
import { DarkModeToggle } from '@/components/ui'
import { useRouter } from 'vue-router'


const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  const toastId = toast.loading('Sedang login...')

  try {
    const { data, error } = await authStore.login({
      email: email.value,
      password: password.value
    })

    if (error) {
      toast.update(toastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 3000
      })
      return
    }

    toast.update(toastId, {
      render: 'Login berhasil!',
      type: 'success',
      isLoading: false,
      autoClose: 2000
    })
    router.push('/')
  } catch (error: any) {
    toast.update(toastId, {
      render: error.message || 'Terjadi kesalahan saat login!',
      type: 'error',
      isLoading: false,
      autoClose: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>
