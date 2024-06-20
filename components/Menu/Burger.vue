<template>
  <div
    @click.prevent="toggle"
    :class="{ active: isOpen }"
  >
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['isOpen'])
const emit = defineEmits(['toggled'])
let isOpen = ref(props.isOpen)
watch(
  () => props.isOpen,
  (newValue) => {
    isOpen.value = newValue
  }
)
</script>

<script>
export default {
  data() {
    return {
      change: false,
    }
  },
  methods: {
    toggle() {
      this.$emit('toggled')
      this.change = !this.change
    },
  },
}
</script>
<style>
.hamburger {
  cursor: pointer;
  display: inline-block;
}

.bar1,
.bar2,
.bar3 {
  width: 30px;
  height: 5px;
  margin: 3px 0;
  transition: 0.4s;
  background-color: white;
}

.active .bar1 {
  transform: translate(0, 8px) rotate(-45deg);
}

.active .bar2 {
  opacity: 0;
}

.active .bar3 {
  transform: translate(0, -8px) rotate(45deg);
}
</style>
