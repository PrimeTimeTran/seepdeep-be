<script setup>
onMounted(async () => {
  const data = {
    labels: ['JavaScript', 'Python', 'Ruby'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(133, 105, 241)', 'rgb(164, 101, 241)', 'rgba(102, 126, 234, 1)'],
        hoverOffset: 4,
      },
    ],
  }
  const options = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
        legend: {
          position: 'left',
        },
      },
    },
  }
  const chart = await new Chart(document.getElementById('chartDoughnut'), options)
})
</script>

<template>
  <div class="flex flex-1 flex-col justify-between min-h-full shadow-xl p-4 rounded-lg">
    <div class="text-xl text-gray-500 dark:text-gray-500 font-bold leading-tight">Languages</div>
    <p class="mb-2 text-gray-400 dark:text-gray-600 text-xl lg:text-2xl">Most Popular</p>
    <canvas id="chartDoughnut" />
  </div>
</template>
