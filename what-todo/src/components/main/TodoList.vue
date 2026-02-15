<script setup lang="ts">
import TodoItem from "./list/TodoItem.vue";
import { useTodoStore } from "../../stores/todo.ts";
import {onMounted} from "vue";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.loadTodos()
})

</script>

<template>
  <section class="container mx-auto px-4">

    <!-- Header for the list -->
    <div class="grid grid-cols-12 mx-3">
      <span class="col-span-10 text-start">Task</span>
      <span>Edit</span>
      <span>Delete</span>
    </div>

    <!-- List items -->
    <ul class="mt-3 space-y-3">
      <TodoItem
          v-for="todo in todoStore.selectedTodos"
          :todo="todo"
          :key="todo.id"
      />
    </ul>

  </section>
</template>

<style scoped>

</style>