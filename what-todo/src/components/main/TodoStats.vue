<script setup lang="ts">
import {useTodoStore} from "../../stores/todo.ts"

const todoStore = useTodoStore()
</script>

<template>
  <section class="relative bg-red-900 overflow-hidden h-8 m-4
                  border-2 border-neutral-800">

    <!-- Green progress bar of completed tasks -->
    <div
        class="bg-green-800 h-full"
        :style="{ width: todoStore.completedPercent + '%' }"
    >
    </div>

    <!-- Text - stats of completed tasks -->
    <div class=" absolute inset-0 font-semibold text-white">
      {{ todoStore.completedTodos }} / {{ todoStore.totalTodos }}
      ({{ todoStore.completedPercent }}%)
    </div>

  </section>
</template>

<style scoped>

</style>