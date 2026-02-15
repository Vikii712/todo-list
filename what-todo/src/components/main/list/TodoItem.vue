<script setup lang="ts">
import { TrashIcon, PencilIcon} from '@heroicons/vue/24/outline'
import type {PropType} from "vue";
import type {Todo} from "../../../stores/todo.ts"
import {useTodoStore} from "../../../stores/todo.ts"


const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true
  },
})

const todoStore = useTodoStore();
</script>

<template>
  <li class="px-3 py-1 grid grid-cols-12 items-center
              bg-neutral-200 rounded-md text-start text-black">

    <!-- Checkbox, toggles task completion -->
    <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        class="w-5 h-5 accent-green-500"
        :checked="props.todo.completed"
        @click="todoStore.toggleCompleted(props.todo.id)"
    />

    <!-- Task title, crossed out if completed -->
    <p class="col-span-9"
       :class="props.todo.completed ? 'line-through' : ''"
    >
      {{props.todo.title}}
    </p>

    <!-- Edit button -->
    <button class="col-span-1 rounded-md py-3 flex flex-col items-center justify-center
                hover:bg-neutral-300">
      <PencilIcon class="w-5 h-5"></PencilIcon>
    </button>

    <!-- Delete button -->
    <button class="col-span-1 rounded-md py-3 flex
                  flex-col items-center justify-center
                hover:bg-neutral-300"
            @click="todoStore.deleteTodo(props.todo.id)"
    >
      <TrashIcon class="w-5 h-5"></TrashIcon>
    </button>

  </li>
</template>

<style scoped>

</style>