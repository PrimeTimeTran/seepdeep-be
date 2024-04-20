<script setup>
import { useHead } from 'unhead'
definePageMeta({
  layout: 't-main-layout',
})
useHead({
  script: [
    {
      innerHTML: 'console.log("Admin Index loading...")',
      tagPosition: 'head',
    },
  ],
})
</script>
<template>
  <ContentDoc class="prose dark:prose-invert pb-32 w-11/12 nuxt-content" />
</template>
