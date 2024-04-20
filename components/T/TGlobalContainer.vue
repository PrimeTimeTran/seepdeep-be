<script setup>
const props = defineProps({})
</script>

<template>
  <div class="drawer">
    <input id="tLeftDrawerToggle" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <slot name="navbar" />
      <label for="tLeftDrawerToggle"></label>
      <div class="drawer lg:drawer-open max-h-screen overflow-auto scrollbar-hide bg-base-100">
        <input id="tLeftSidebarToggle" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content p-2">
          <div class="drawer drawer-end">
            <input id="tRightDrawerToggle" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
              <slot />
            </div>
            <div class="drawer-side z-50">
              <label for="tRightDrawerToggle" aria-label="close sidebar" class="drawer-overlay"></label>
              <ul class="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                <slot name="drawer-right" />
              </ul>
            </div>
          </div>
        </div>
        <slot name="left-sidebar" />
      </div>
      <AdminTheRightDrawer />
    </div>
    <slot name="drawer-left" />
    <slot name="scripts" />
  </div>
</template>
