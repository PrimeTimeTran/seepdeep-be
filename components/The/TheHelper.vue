<script setup>
const props = defineProps(['object', 'position'])
const object = reactive(props.object)
</script>
<template>
  <div
    class="absolute bg-white helper"
    :class="{
      'bottom-10': position === 'bottomLeft',
      'left-10': position === 'bottomLeft',
    }"
  >
    <pre>{{ object }}</pre>
  </div>
</template>

<style>
.helper {
  width: 30vw;
}
</style>
