<template>
  <div class="min-h-screen z-50 flex items-center justify-center text-foreground px-4">
    <DarkModeToggle class="absolute bottom-10 right-10 z-50 border-2 rounded-full" />
    <form @submit.prevent="handleRegister" class="w-full max-w-md bg-muted p-8 rounded-xl shadow-md space-y-6">
      <h2 class="text-2xl font-bold text-center">Sign Up</h2>

      <input
        v-model="firstname"
        type="text"
        placeholder="First Name"
        required
        class="w-full p-3 rounded bg-background text-foreground outline-none"
      />

      <input
        v-model="lastname"
        type="text"
        placeholder="Last Name"
        required
        class="w-full p-3 rounded bg-background text-foreground outline-none"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full p-3 rounded bg-background text-foreground outline-none"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full p-3 rounded bg-background text-foreground outline-none"
      />

      <button
        type="submit"
        class="w-full p-3 rounded bg-foreground text-primary-foreground hover:bg-primary/90 transition"
      >
        Register
      </button>

      <p class="text-sm text-primary text-center">
        Sudah punya akun?
        <router-link to="/signin" class="text-primary underline">Login di sini</router-link>
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
const router = useRouter()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const { error } = await authStore.register({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Registrasi berhasil! Silakan cek email untuk verifikasi.')
    router.push("/signin")
  } catch (err: any) {
    toast.error(err.message || 'Registrasi gagal.')
  }
}
</script>
