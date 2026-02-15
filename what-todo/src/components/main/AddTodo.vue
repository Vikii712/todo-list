<script setup lang="ts">
import { useTodoStore } from "../../stores/todo.ts";
import {ref} from "vue";

const todoStore = useTodoStore();
const newTitle = ref('');

//clear input when new task is added, prevents adding empty task
function addTodo(){
  if(newTitle.value !== ''){
    todoStore.addTodo(newTitle.value)
  }

  newTitle.value = ''
}
</script>

<template>
  <section class="flex w-auto mx-4 justify-center my-2">

    <!-- form should not refresh when pressing enter -->
    <form class="flex w-full items-center gap-2"
          @submit.prevent="addTodo"
    >

      <!-- only visible for screen readers -->
      <label for="addTask" class="sr-only">
        New Task:
      </label>

      <!-- Input, task can be added by pressing enter -->
      <input type="text"
             id="addTask"
             name="addTask"
             v-model="newTitle"
             class="bg-neutral-200 px-3 py-2 text-black
                      rounded-md w-full"
             placeholder="Add new task..."
      />

      <!-- Add button, cannot -->
      <button type="button"
              @click="addTodo"
              :disabled="!newTitle"
              class="font-bold text-black rounded-md
                    bg-neutral-200 px-3 pt-1 pb-2
                    hover:bg-neutral-300 text-xl
                     focus:outline-none focus:ring-2 focus:ring-white"
      >+</button>
    </form>

  </section>
</template>

<style scoped>

</style>