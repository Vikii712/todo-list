<script setup lang="ts">

</script>

<template>
  <section class="text-xl flex justify-center my-2">

    <form class="flex items-center gap-2">

      <label for="addTask" class="sr-only">
        New Task:
      </label>

      <input type="text"
             id="addTask"
             name="addTask"
             class="bg-neutral-200 px-3 py-1 text-black
                      rounded-md "
             placeholder="Add new task..."
      />

      <button type="submit"
              class="font-bold text-black rounded-md
                    bg-neutral-200 px-3 py-1
                    hover:bg-neutral-300
                     focus:outline-none focus:ring-2 focus:ring-white"
      >+</button>
    </form>

  </section>
</template>

<style scoped>

</style>