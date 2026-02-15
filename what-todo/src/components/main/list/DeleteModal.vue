<script setup lang="ts">
import {useTodoStore} from "../../../stores/todo.ts"


const todoStore = useTodoStore()

const props = defineProps({
  todoId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

function deleteTodo(): void {
  todoStore.deleteTodo(props.todoId)
  emit('close')
}

function closeModal(): void {
  emit('close')
}
</script>

<template>

  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <!-- Modal -->
    <div class="bg-neutral-800 rounded-xl shadow-xl w-full max-w-sm p-6">

      <!-- Modal texts -->
      <h2 class="text-lg font-semibold text-white mb-4">Are you sure?</h2>
      <p class="text-neutral-300 mb-6">This action cannot be undone.</p>

      <!-- Back Button -->
      <div class="flex justify-center gap-3">
        <button
            class="px-4 py-2 rounded-md border border-neutral-500
            text-neutral-300 hover:bg-neutral-700"
            @click="closeModal"
        >
          Back
        </button>

        <!-- Delete Button -->
        <button
            class="px-4 py-2 rounded-md bg-red-600
            text-white hover:bg-red-700"
            @click="deleteTodo"
        >
          Delete
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>