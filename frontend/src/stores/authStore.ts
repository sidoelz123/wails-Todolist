// stores/authStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/config/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);
  const accessToken = ref<string | null>(null);
  const storedToken = sessionStorage.getItem("access_token");
  if (storedToken) {
    accessToken.value = storedToken;
  }
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.user && data.session?.access_token) {
      accessToken.value = data.session.access_token;
      user.value = data.user.user_metadata;
      sessionStorage.setItem("token", data.session.access_token);
    }

    return { data, error };
  };

  const register = async ({
    firstname,
    lastname,
    email,
    password,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstname,
          lastname,
        },
      },
    });

    if (data?.user && data.session?.access_token) {
      accessToken.value = data.session.access_token;
    }

    return { data, error };
  };
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      user.value = {
        firstname: data.user?.user_metadata?.firstname || "",
        lastname: data.user?.user_metadata?.lastname || "",
        email: data.user?.email,
      };
    }
    // console.log('state',data.user?.user_metadata);
    
    return { user: user.value, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    accessToken.value = null;
    sessionStorage.removeItem("token");
  };

  return {
    user,
    getUser,
    login,
    register,
    logout,
  };
});
