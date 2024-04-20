<template>
  <div
    :style="`width: ${percent}%`"
    class="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-green-500"
  ></div>
</template>

<script setup>
const props = defineProps(['percent'])
</script>
