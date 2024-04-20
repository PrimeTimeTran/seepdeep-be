<script>
import { createHead, useHead } from 'unhead'
definePageMeta({
  layoutTransition: true,
})
createHead()

useHead({
  script: [
    {
      innerHTML: 'console.log("App.vue")',
      tagPosition: 'head',
    },
  ],
})
</script>

<!-- Info: Ignore Warning
  https://github.com/nuxt/nuxt/issues/15240
  "Using <NuxtLayout> inside app.vue will cause unwanted layout shifting in your application.
  Consider removing <NuxtLayout> from app.vue and using it in your pages."
-->
<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
      <TShortcuts />
    </NuxtLayout>
  </div>
</template>
