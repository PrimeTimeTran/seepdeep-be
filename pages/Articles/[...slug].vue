<script setup>
// Going directly to page throws error on local but not prod.
definePageMeta({
  layout: 'articles-layout',
})
</script>
<template>
  <div id="pageContent" class="flex flex-col flex-grow items-center overflow-auto scrollbar-hide">
    <h1>Hello World!</h1>
    <ContentDoc class="prose dark:prose-invert pb-32 w-11/12 nuxt-content" />
  </div>
</template>
