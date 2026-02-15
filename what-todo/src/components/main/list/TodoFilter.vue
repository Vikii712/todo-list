<script setup lang="ts">
import { useTodoStore } from "../../../stores/todo.ts";

const todoStore = useTodoStore();
</script>

<template>
  <section class="m-4 mt-8 flex justify-start">

    <!-- Radio button for filtering tasks -->
    <div class="inline-flex gap-4 border border-neutral-200 rounded-lg">

      <!--All tasks -->
      <label class="flex items-center px-2 py-1 rounded-md"
             :class="todoStore.filter === 'all' ? 'text-black bg-neutral-200': 'text-neutral-200 bg-none' "
      >
        <input type="radio"
               name="filter"
               class="appearance-none"
               value="all"
               v-model="todoStore.filter"
        />
        <span>All</span>
      </label>

      <!-- Completed tasks only -->
      <label class="flex items-center px-2 py-1 rounded-md"
             :class="todoStore.filter === 'completed' ? 'text-black bg-neutral-200': 'text-neutral-200 bg-none' "

      >
        <input type="radio"
               name="filter"
               class="appearance-none"
               value="completed"
               v-model="todoStore.filter"
        />
        <span>Completed</span>
      </label>

      <!-- Uncompleted tasks only -->
      <label class="flex items-center px-2 py-1 rounded-md"
             :class="todoStore.filter === 'uncompleted' ? 'text-black bg-neutral-200': 'text-neutral-200 bg-none' "
      >
        <input type="radio"
               name="filter"
               class="appearance-none"
               value="uncompleted"
               v-model="todoStore.filter"
        />
        <span>Uncompleted</span>
      </label>
    </div>
  </section>
</template>

<style scoped>

</style>