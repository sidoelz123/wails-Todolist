<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000"
  >
    <Motion
      as="h1"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :class="cn(
        'text-2xl md:text-5xl font-bold text-zinc-700 dark:text-zinc-100'
      )"
      layout
    >
      <div class="flex items-center gap-5">
        Good {{ greeting }},
        <TextGenerateEffect words="User 👋" />
      </div>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { Motion } from 'motion-v';
import { TextGenerateEffect } from '../index.ts';
import { cn } from '@/lib/utils';

defineProps<{ show: boolean }>();

const greeting = ref('');

// Fungsi untuk menentukan salam berdasarkan waktu lokal
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Good Night';
}

onMounted(() => {
  greeting.value = getGreeting();
});
</script>
