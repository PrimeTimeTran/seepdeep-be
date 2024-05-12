<script setup>
definePageMeta({
  layoutTransition: true,
})
</script>
<template>
  <div class="flex flex-col min-h-screen justify-between dark:bg-gray-900">
    <TheNavbar />
    <div class="min-h-screen pl-0 mt-24 px-6 md:px-8 lg:px-64">
      <slot />
    </div>
  </div>
</template>
