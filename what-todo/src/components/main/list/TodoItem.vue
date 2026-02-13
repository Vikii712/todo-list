<script setup lang="ts">
import { TrashIcon, PencilIcon} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
})

</script>

<template>
  <li class="px-3 py-1 grid grid-cols-12 items-center
              bg-neutral-200 rounded-md text-start text-black">

    <!-- Checkbox -->
    <input type="checkbox" id="checkbox" name="checkbox" class="w-5 h-5"/>

    <!-- Task title -->
    <p class="col-span-9">{{props.title}}</p>

    <!-- Edit button -->
    <button class="col-span-1 rounded-md py-3 flex flex-col items-center justify-center
                hover:bg-neutral-300">
      <PencilIcon class="w-5 h-5"></PencilIcon>
    </button>

    <!-- Delete button -->
    <button class="col-span-1 rounded-md py-3 flex flex-col items-center justify-center
                hover:bg-neutral-300">
      <TrashIcon class="w-5 h-5"></TrashIcon>
    </button>

  </li>
</template>

<style scoped>

</style>