<script setup lang="ts">
import { TrashIcon, PencilIcon, CheckIcon} from '@heroicons/vue/24/outline'
import type {PropType} from "vue";
import type {Todo} from "../../../stores/todo.ts"
import {useTodoStore} from "../../../stores/todo.ts"
import {ref} from "vue"
import DeleteModal from "./DeleteModal.vue"

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true
  },
})

const todoStore = useTodoStore();
const isEditing = ref(false);
const newTitle = ref(props.todo.title);
const deleteModal = ref(false)
const error = ref('')

function toggleEdit(): void {
  if (isEditing.value) {
    error.value = ''
    newTitle.value = newTitle.value.trim()

    if(newTitle.value === '') {
      error.value = 'Title cannot be empty'
      return
    }

    todoStore.updateTodo(props.todo.id, newTitle.value)
  }

  isEditing.value = !isEditing.value;
}

function escapeEdit(): void {
  isEditing.value = false
  newTitle.value = props.todo.title
  error.value = ''
}

</script>

<template>

  <DeleteModal v-if="deleteModal"
               :todoId="props.todo.id"
               @close="deleteModal = false"
  />

  <li class="px-3 py-1 grid grid-cols-7 sm:grid-cols-12 items-center
              bg-neutral-200 rounded-md text-start text-black min-w-0">

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
    <!-- Start editing by double clicking the text -->
    <p class="col-span-4 sm:col-span-9 break-words min-w-0"
       :class="props.todo.completed ? 'line-through' : ''"
       v-if="!isEditing"
       @dblclick="toggleEdit()"
    >
      {{props.todo.title}}
    </p>

    <!-- during editing the title of task the input is shown instead of plain text -->
    <!-- save changes by clicking enter -->
    <input v-else
              type="text"
              v-model="newTitle"
              class="border px-1 rounded col-span-4 sm:col-span-9 resize-y"
              @keyup.enter="toggleEdit"
              @keyup.esc="escapeEdit"
              maxlength="200"
    />

    <!-- Edit button -->
    <button class="rounded-md py-3 flex
                   flex-col items-center justify-center
                 hover:bg-neutral-300"
                   @click="toggleEdit"
    >
      <PencilIcon v-if="!isEditing" class="w-5 h-5" />
      <CheckIcon v-else class="w-5 h-5" />
    </button>

    <!-- Delete button -->
    <button class="rounded-md py-3 flex
                  flex-col items-center justify-center
                hover:bg-neutral-300"
            @click="deleteModal = true"
    >
      <TrashIcon class="w-5 h-5"></TrashIcon>
    </button>

  </li>

  <p v-if="error" class="text-red-200 text-xs mt-1">
    {{ error }}
  </p>
</template>

<style scoped>

</style>