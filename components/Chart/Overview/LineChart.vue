<script setup>
Number.prototype.comma_formatter = function () {
  return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

const options = {
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value, index, array) {
          return value > 1000 ? (value < 1000000 ? value / 1000 + 'K' : value / 1000000 + 'M') : value
        },
      },
    },
  },
}

const bgColorPlugin = {
  id: 'bgColorArea',
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, width, bottom },
      scales: { x, y },
      data: { datasets },
    } = chart

    datasets.forEach((dataset) => {
      const datasetBackgroundColor = dataset.backgroundColor
      const data = dataset.data

      ctx.save()
      ctx.fillStyle = datasetBackgroundColor
      ctx.beginPath()

      for (let i = 0; i < data.length; i++) {
        const xValue = x.getPixelForValue(i)
        const yValue = y.getPixelForValue(data[i])

        if (i === 0) {
          ctx.moveTo(xValue, bottom)
        }

        ctx.lineTo(xValue, yValue)
      }

      ctx.lineTo(x.getPixelForValue(data.length - 1), bottom)
      ctx.fill()
      ctx.restore()
    })
  },
}

function getData() {
  fetch('https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json')
    .then((res) => res.json())
    .then((res) => {
      chartData.data = res.dates
      chartData.chart = renderCharts()
    })
}

const selectedOption = ref(0)
const chartDataset = reactive(null)
let showDropdown = ref(false)
const dropdownOptions = ref([
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Last 7 Days',
    value: '7days',
  },
  {
    label: 'Last 30 Days',
    value: '30days',
  },
  {
    label: 'Last 6 Months',
    value: '6months',
  },
  {
    label: 'This Year',
    value: 'year',
  },
])

function selectOption(index) {
  chartData.selectedOption = index
  chartData.date = chartData.options[index].value
  renderCharts()
}

const reactiveGuy = {
  date: 'today',
  fetch: () => {},
  options: dropdownOptions,
  selectedOption: selectedOption,
  data: chartDataset,
}
let chartData = reactive(reactiveGuy)
onMounted(() => {
  chartData = reactive(reactiveGuy)
  getData()
})
async function renderCharts() {
  let c = false
  Chart.helpers.each(Chart.instances, function (instance) {
    if (instance.canvas.id == 'canvas') {
      c = instance
    }
  })

  if (c) {
    c.destroy()
  }
  const data = [
    {
      label: 'Income',
      borderColor: 'rgba(102, 126, 234, 1)',
      pointBackgroundColor: 'rgba(102, 126, 234, 1)',
      data: chartData.data[chartData.date].data.income,
      backgroundColor: 'rgba(102, 126, 234, 0.25)',
    },
    {
      label: 'Expenses',
      borderColor: 'rgba(237, 100, 166, 1)',
      pointBackgroundColor: 'rgba(237, 100, 166, 1)',
      data: chartData.data[chartData.date].data.expenses,
      backgroundColor: 'rgba(237, 100, 166, 0.25)',
    },
  ]

  let ctx = document.getElementById('canvas').getContext('2d')
  await new Chart(ctx, {
    type: 'line',
    data: {
      datasets: data,
      labels: chartData.data[chartData.date].data.labels,
    },
    plugins: [bgColorPlugin],
    options,
  })
  toggleDropdown()
}
function toggleDropdown() {
  showDropdown.value = !showDropdown
}
function switchCharts(idx) {
  selectOption(idx)
}
</script>

<template>
  <div class="flex flex-1 flex-col min-h-full p-4 rounded-lg shadow-xl">
    <div class="flex flex-wrap items-end rounded-full">
      <div class="flex-1">
        <h3 class="text-xl text-gray-500 dark:text-gray-500 font-bold leading-tight">Income</h3>
      </div>
      <div class="relative">
        <button
          class="text-xs hover:text-gray-300 h-6 focus:outline-none text-gray"
          @click="showDropdown = !showDropdown"
        >
          <span class="text-gray-500 dark:text-white" v-text="chartData.options[chartData.selectedOption].label" />
          <i class="ml-1 mdi mdi-chevron-down" />
        </button>
        <div
          class="shadow-lg rounded text-sm absolute top-auto right-0 min-w-full w-32 z-30 mt-1 -mr-3 bg-white"
          :class="{
            hidden: !showDropdown,
          }"
        >
          <span class="absolute top-0 right-0 w-3 h-3 transform rotate-45 -mt-1 mr-3" />
          <div class="rounded w-full relative z-10 py-1">
            <ul class="list-reset text-xs">
              <template v-for="(item, index) in chartData.options">
                <li
                  class="px-4 py-2 hover: text-gray-500 hover:text-gray-300 dark:text-white dark:hover:text-white cursor-pointer"
                  @click="() => switchCharts(index)"
                >
                  <span v-text="item.label"></span>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 items-end mb-5">
      <h4
        class="text-xl lg:text-2xl text-gray-400 dark:text-gray-600 dark:text-white-500/100 font-semibold leading-tight inline-block mr-2"
        v-text="'$' + (chartData.data ? chartData.data[chartData.date].total.comma_formatter() : 0)"
      ></h4>
      <span
        class="inline-block"
        :class="chartData.data && chartData.data[chartData.date].upDown < 0 ? 'text-red-500' : 'text-green-500'"
        ><span v-text="chartData.data && chartData.data[chartData.date].upDown < 0 ? '▼' : '▲'"></span>
        <span v-text="chartData.data ? chartData.data[chartData.date].upDown : 0"></span>%</span
      >
    </div>
    <div>
      <canvas id="canvas" class="w-100" />
    </div>
  </div>
</template>
