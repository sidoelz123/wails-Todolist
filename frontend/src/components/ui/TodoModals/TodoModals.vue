<template>
  <Transition name="modal-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md"
    >
      <Transition name="modal-zoom">
        <div
          v-show="visible"
          class="bg-background z-50 text-foreground p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4 transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-center">
            {{ mode === 'edit' ? 'Edit Todo' : 'Add New Todo' }}
          </h2>
          <div class="space-y-2">
            <input
              v-model="title"
              type="text"
              placeholder="Todo title"
              class="w-full p-2 rounded bg-muted text-foreground outline-none"
            />
            <textarea
              v-model="description"
              placeholder="Description (optional)"
              class="w-full p-2 rounded bg-muted text-foreground outline-none"
              rows="3"
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="close" class="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400">Cancel</button>
            <button
              @click="submit"
              class="px-4 py-2 rounded"
              :class="mode === 'edit' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'"
            >
              {{ mode === 'edit' ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  mode: 'add' | 'edit'
  todo?: { title: string; description: string }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', todo: { title: string; description: string }): void
}>()

const title = ref('')
const description = ref('')

watch(
  () => props.todo,
  (todo) => {
    title.value = todo?.title || ''
    description.value = todo?.description || ''
  },
  { immediate: true }
)

const close = () => {
  emit('close')
  title.value = ''
  description.value = ''
}

const submit = () => {
  if (title.value.trim()) {
    emit('submit', {
      title: title.value,
      description: description.value,
    })
    close()
  }
}
</script>

<style scoped>
/* Fade for backdrop */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Zoom for modal content */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: all 0.3s ease;
}
.modal-zoom-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
