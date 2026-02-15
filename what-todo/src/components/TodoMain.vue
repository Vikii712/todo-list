<script setup lang="ts">

import AddTodo from "./main/AddTodo.vue";
import TodoList from "./main/TodoList.vue";
import Pagination from "./main/Pagination.vue";
import TodoFilter from "./main/list/TodoFilter.vue";
import {onMounted} from "vue";
import { useTodoStore } from "../stores/todo.ts";
import TodoStats from "./main/TodoStats.vue";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.loadTodos()
})
</script>

<template>
  <main class="mx-auto bg-neutral-600 p-5 rounded-md w-full" >
    <AddTodo />
    <TodoStats />
    <TodoFilter/>
    <TodoList />
    <Pagination />
  </main>
</template>

<style scoped>

</style>