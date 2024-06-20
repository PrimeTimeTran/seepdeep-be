<!-- https://content.nuxt.com/usage/markdown -->
<script setup>
import { useSlots } from 'vue'
const slots = useSlots()
</script>

<template>
  <div
    v-if="slots.info"
    class="flex flex-row items-center text-center p-0 px-2 border bg-green-700 text-white dark:bg-green-950 dark:border-gray-700 rounded-lg my-6"
  >
    <FontAwesomeIcon
      class="mr-2"
      color="white"
      icon="fa-solid fa-circle-info"
    />
    <slot name="info" />
  </div>
  <div
    v-if="slots.list"
    class="flex flex-col items-start text-left p-4 px-2 border bg-green-700 text-white dark:bg-green-950 dark:border-gray-700 rounded-lg my-6"
  >
    <FontAwesomeIcon
      class="mr-2"
      color="white"
      icon="fa-solid fa-circle-info"
    />
    <slot name="list" />
  </div>
</template>
