<script setup>
definePageMeta({
  layoutTransition: true,
})
</script>
<template>
  <div>
    <TGlobalContainer>
      <template v-slot:navbar>
        <!-- <TNavbar /> -->
      </template>
      <template v-slot:drawer-left>
        <TDrawerLeft />
      </template>
      <template v-slot:left-sidebar>
        <AdminTheLeftSidebar />
      </template>
      <template v-slot:drawer-right>
        <TDrawerRight />
      </template>
      <template v-slot:scripts />
      <template v-slot:default>
        <slot />
        <!-- <ChatBar /> -->
      </template>
    </TGlobalContainer>
  </div>
</template>
