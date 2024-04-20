<script setup>
import { useRightDrawerStore } from '@/stores/drawerRightStore.js'
const store = useRightDrawerStore()
const focused = reactive({ ...store.focused })

import { useEventBus } from '@vueuse/core'
onMounted(() => {
  const bus = useEventBus('DrawerFocus')
  function listener(item) {
    Object.keys(item).forEach((key) => {
      focused[key] = item[key]
    })
  }
  const unsubscribe = bus.on(listener)
})

watch(
  () => focused._id,
  (neww, oldd) => {
    console.log('Focused value changed: neww', neww)
    console.log('Focused value changed: oldd', oldd)
  },
)
</script>
<template>
  <div class="drawer drawer-end z-auto">
    <input id="rightDrawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content"></div>
    <div class="drawer-side z-10">
      <label for="rightDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-9/12 min-h-full bg-base-100 text-base-content">
        <AdminEntityForm :entity="focused" :entityType="'users'" :formContext="'edit'" />
        <slot />
      </ul>
    </div>
  </div>
</template>
