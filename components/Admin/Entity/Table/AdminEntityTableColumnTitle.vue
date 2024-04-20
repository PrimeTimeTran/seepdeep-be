<script setup>
const props = defineProps(['deleteItem', 'attribute', 'state'])
const emit = defineEmits(['toggleSort', 'hideColumn'])
</script>
<template>
  <div class="dropdown w-full rounded">
    <div tabindex="0" role="button" class="btn btn-xs btn-ghost text-left">
      <span v-text="attribute.label" />
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <button class="btn btn-xs btn-ghost flex justify-start" @click="$emit('toggleSort', attribute.name, 'ASC')">
        <FontAwesomeIcon class="mr-2 text-gray-600 dark:text-white" icon="fa-solid fa-caret-up" /> Ascending
      </button>
      <button class="btn btn-xs btn-ghost flex justify-start" @click="$emit('toggleSort', attribute.name, 'DESC')">
        <FontAwesomeIcon class="mr-2 text-gray-600 dark:text-white" icon="fa-solid fa-caret-down" /> Descending
      </button>
      <button @click="emit('hideColumn', attribute.name)" class="btn btn-xs btn-ghost flex justify-start">
        <FontAwesomeIcon class="mr-2 text-gray-600 dark:text-white" icon="fa-solid fa-eye-slash" /> Hide
      </button>
    </ul>
  </div>
</template>
