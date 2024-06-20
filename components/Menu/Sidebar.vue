<script setup>
const props = defineProps(['isOpen'])
const emit = defineEmits(['toggled'])
</script>
<template>
  <div class="sidebar">
    <div v-if="isOpen" class="sidebar-backdrop overflow-auto scrollbar-hide" @click="$emit('toggled')" />
    <transition name="slide">
      <div v-if="isOpen" class="sidebar-panel dark:bg-slate-800 min-w-fit shadow">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  top: 25;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  position: fixed;
}

.sidebar-panel {
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: #fff;
  padding: 3rem 20px 2rem 20px;
}
</style>
