<script setup lang="ts">

import AddTodo from "./main/AddTodo.vue";
import TodoList from "./main/TodoList.vue";
import Pagination from "./main/Pagination.vue";
</script>

<template>
  <main class="main bg-neutral-600 p-5 rounded-md" >
    <AddTodo />
    <TodoList />
    <Pagination />
  </main>
</template>

<style scoped>

</style>