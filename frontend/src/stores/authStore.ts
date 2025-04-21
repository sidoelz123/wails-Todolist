// stores/authStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/config/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const login = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data?.user) {
      user.value = data.user
    }

    return { data, error }
  }

  const register = async ({
    firstname,
    lastname,
    email,
    password,
  }: {
    firstname: string
    lastname: string
    email: string
    password: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
  
    if (data?.user) {
      const { error: profileError } = await supabase.from('users').upsert([
        {
          id: data.user.id,
          firstname,
          lastname,
          display_name: `${firstname} ${lastname}`,
        },
      ])
  
      if (profileError) {
        return { error: profileError }
      }
  
      user.value = data.user
    }
  
    return { data, error }
  }
  
  const getCurrentUser = async () => {
    const { data: userData, error } = await supabase.auth.getUser()
    if (userData) {
      user.value = userData
    }
    return { user: user.value, error }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  return {
    user,
    login,
    register,
    getCurrentUser,
    logout,
  }
})
