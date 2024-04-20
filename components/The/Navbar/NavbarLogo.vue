<script setup>
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<template>
  <NuxtLink class="cursor-pointer" href="/">
    <img v-if="isDark" src="~/assets/images/logo-light.png" />
    <img v-else src="~/assets/images/logo-dark.png" />
  </NuxtLink>
</template>
