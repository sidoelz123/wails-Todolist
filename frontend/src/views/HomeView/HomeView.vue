<template>
  <SplashScreen :show="showSplash" class="transition-all duration-300"/>
  <div v-if="!showSplash" :class="[
    'flex w-full min-h-screen flex-col items-center px-4 py-8 gap-8 container max-w-screen-sm transition-all duration-300',
    showModal ? 'blur-sm pointer-events-none select-none scale-[0.98]' : ''
  ]">
    <div class="flex mb-2 text-center text-xl text-foreground sm:text-5xl">
      <TextGenerateEffect words="Todo List App" class="" />
      <DarkModeToggle />
    </div>
    <div>
      <VanishingInput v-model="text" :placeholders="placeholders" />
    </div>
    <div class="flex gap-3 items-center justify-between w-full">
      <MorphingTabs :tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event" />
      <div class=" border-2 flex gap-3">
        <InteractiveHoverButton text="Add" class="w-fit" @click="showModal = true" />
        <button>
          <AnimatedTooltip :items="item"  />
        </button>
      </div>
    </div>
    <section
      class="w-full relative min-h-32 rounded-xl bg-primary-foreground flex flex-col items-center justify-center">
      <GlowingEffect :spread="40" :glow="true" :disabled="false" :proximity="64" :inactive-zone="0.01" />
      <p class="py-1 px-6 rounded-lg text-foreground font-bold">
        <TextGenerateEffect words="Task Empty" class="" />
      </p>
    </section>
  </div>
  <TodoModals :visible="showModal" mode="edit" @close="showModal = false" @submit="handleAddTodo" />
</template>

<script setup lang="ts">
import {SplashScreen, AnimatedTooltip, TodoModals, GlowingEffect, DarkModeToggle, InteractiveHoverButton, MorphingTabs, TextGenerateEffect, VanishingInput } from "@/components/ui";
import { ref,onMounted } from "vue";
const placeholders = [
  "What should I do today?",
  "Don't forget to finish that thing...",
  "Buy milk... again?",
  "One task to rule them all",
  "Maybe later, maybe now?",
  "Clean my room (finally)",
  "Check off one more task!",
  "Add something productive here...",
  "Make a todo for making todos",
  "Is procrastination a task?",
];
const item = [
  {
    id: 1,
    name: 'Logout',
    designation: 'Keluar akun',
    image: 'LogOut'
  }
]
const text = ref("");
const showModal = ref(false)
const tabs = ["All", "Todo", "In Progress", "Done"];
const activeTab = ref(tabs[0]);
const handleAddTodo = (todo: { title: string; description: string }) => {
  console.log("New todo added:", todo)
}

const showSplash = ref(true);
onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  }, 2500);
});
</script>