<template>
  <div class="flex flex-col space-y-2 space-x-0 md:space-x-0">
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2">
      <ChartOverviewLineChart />
      <ChartOverviewBarChart />
    </div>
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2">
      <ChartOverviewDoughnutChart />
      <div class="flex flex-1 flex-col justify-between min-h-full p-4 rounded-lg"></div>
    </div>
  </div>
</template>
