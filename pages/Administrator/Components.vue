<script setup>
// Icons
// https://fontawesome.com/icons
// https://vue-hero-icons.netlify.app/
// https://icon-sets.iconify.design/ei/page-2.html
import { Icon } from '#components'
definePageMeta({
  layout: 't-main-layout',
  layoutTransition: true,
})
onMounted(() => {
  // toastEm({ val: 'Press opt/alt+s to sample a style', type: 'info', autoClose: false })
})

const FBIcon = h(Icon, { name: 'logos:facebook', color: 'black' })
const GoogleIcon = h(Icon, { name: 'logos:google', color: 'black' })
const MicrosoftIcon = h(Icon, { name: 'logos:microsoft', color: 'black' })
const GithubIcon = h(Icon, { name: 'logos:github', color: 'black' })
const AmazonIcon = h(Icon, { name: 'logos:amazon', color: 'black' })
const AppleIcon = h(Icon, { name: 'logos:apple', color: 'black' })
</script>
<template>
  <Demo.Table />
</template>
