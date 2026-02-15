<script setup lang="ts">
import TodoItem from "./list/TodoItem.vue";
import { useTodoStore } from "../../stores/todo.ts";
import Spinner from "./list/Spinner.vue";

const todoStore = useTodoStore();

</script>

<template>
  <section class="px-4">

    <!-- Header for the list -->
    <div class="grid grid-cols-7 sm:grid-cols-12 mx-3">
      <span class="col-span-5 sm:col-span-10 text-start">Task</span>
      <span>Edit</span>
      <span>Delete</span>
    </div>

    <div
        v-if="todoStore.loading"
        class="flex justify-center items-center p-8"
    >
      <Spinner/>
    </div>

    <!-- List items -->
    <ul v-else-if="todoStore.pageTodos.length !== 0" class="mt-3 space-y-3">
      <TodoItem
          v-for="todo in todoStore.pageTodos"
          :todo="todo"
          :key="todo.id"
      />
    </ul>
    <p v-else-if="!todoStore.error" class="text-neutral-400"> No more tasks for today! </p>

    <p v-else class="text-red-200 pt-8">!! {{ todoStore.error}} !!</p>

  </section>
</template>

<style scoped>

</style>