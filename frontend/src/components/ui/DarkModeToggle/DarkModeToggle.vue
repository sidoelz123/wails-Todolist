<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Motion } from 'motion-v'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(localStorage.getItem('theme') === 'dark')
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})
</script>

<template>
  <Motion
    :initial="{ rotate: 0 }"
    :animate="{ rotate: isDark ? 360 : 0 }"
    :transition="{ duration: 0.9 }"
  >
    <button
      @click="isDark = !isDark"
      class="rounded-full p-2 border border-background bg-background text-foreground shadow shadow-primary-foreground transition-all duration-300"
    >
      <component :is="isDark ? Moon : Sun" class="w-5 h-5" />
    </button>
  </Motion>
</template>
