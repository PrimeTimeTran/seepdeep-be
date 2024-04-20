<script setup>
import Chart from 'chart.js/auto'

const props = defineProps(['type', 'data', 'config'])
const myChart = ref(null)
onMounted(() => {
  try {
    const canvas = myChart.value
    const ctx = canvas.getContext('2d')
    let chart = new Chart(ctx, props.config)
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <canvas ref="myChart" height="20vh" width="40vw" />
</template>
