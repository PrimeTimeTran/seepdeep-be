<script setup>
const hidden = ref(true)
function toggleHidden() {
  hidden.value = !hidden.value
}
</script>
<template>
  <div
    class="absolute left-5 bottom-5 h-1/2 w-1/2 bg-white dark:bg-slate-900 rounded-lg p-2 border"
    :class="{
      hidden: hidden,
    }"
  >
    <h1 class="dark:text-white">Light/Dark Mode</h1>
    <div id="devTools" @click="toggleHidden" />
  </div>
</template>
