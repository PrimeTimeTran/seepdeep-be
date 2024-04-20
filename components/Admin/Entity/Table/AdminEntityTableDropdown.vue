<script setup>
const props = defineProps(['text'])
</script>
<template>
  <div class="dropdown dropdown-hover">
    <div class="m-1 line-clamp-2" v-text="text" />
    <div
      v-text="text"
      class="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-72 h-fit max-h-96 overflow-auto scrollbar-hide"
    />
  </div>
</template>
