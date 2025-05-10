<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-primary transition-opacity duration-1000"
  >
    <Motion
      as="h1"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :class="cn(
        'text-2xl md:text-5xl font-bold text-primary-foreground'
      )"
      layout
    >
      <div class="flex items-center gap-5">
        Good {{ greeting }},
        <TextGenerateEffect class="" :words="username" />
      </div>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Motion } from 'motion-v';
import TextGenerateEffect from '../TextGenerateEffect/TextGenerateEffect.vue';
import { cn } from '@/lib/utils';

const props = defineProps<{ show: boolean, username: string}>();
const greeting = ref('');

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
