<script setup lang="ts">
import {useTodoStore} from "../../stores/todo.ts"

const todoStore = useTodoStore()
</script>

<template>
  <nav class="mt-5 flex gap-5 justify-center">

    <!-- Prev button -->
    <button class="w-20 border border-neutral-100
                  rounded-md py-1 px-3 hover:bg-neutral-700"
            @click="todoStore.prevPage()"
            :hidden="todoStore.currentPage === 1"
    >
      Prev
    </button>

    <!-- Next button -->
    <button class="w-20 border border-neutral-100
                  rounded-md py-1 px-3 hover:bg-neutral-700"
            @click="todoStore.nextPage()"
            :hidden="todoStore.currentPage === todoStore.totalPages"
    >
      Next
    </button>

  </nav>
</template>

<style scoped>

</style>