<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
    },
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
      tagPosition: 'head',
    },
  ],
})

function getData() {
  return {
    chartData: [112, 10, 225, 134, 101, 80, 50, 100, 200],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],

    tooltipContent: '',
    tooltipOpen: false,
    tooltipX: 0,
    tooltipY: 0,
    showTooltip(e) {
      this.tooltipContent = e.target.textContent
      this.tooltipX = e.target.offsetLeft - e.target.clientWidth
      this.tooltipY = e.target.clientHeight + e.target.clientWidth
    },
    hideTooltip(e) {
      this.tooltipContent = ''
      this.tooltipOpen = false
      this.tooltipX = 0
      this.tooltipY = 0
    },
  }
}
let chartData = ref({})
chartData.value = getData().chartData

const APP = ref(getData())

let chartLabels = ref([])
chartLabels.value = getData().labels
</script>

<template>
  <div class="flex flex-1 flex-col justify-between min-h-full shadow-xl p-4 rounded-lg text-gray-500">
    <div class="md:flex md:justify-between md:items-center">
      <div>
        <h2 class="text-xl text-gray-500 dark:text-gray-500 font-bold leading-tight">Sales</h2>
        <p class="mb-2 text-gray-400 dark:text-gray-600 text-xl lg:text-2xl">Monthly Average</p>
      </div>

      <!-- Legends -->
      <div class="mb-4">
        <div class="flex items-center">
          <div class="w-2 h-2 bg-blue-600 mr-2 rounded-full"></div>
          <div class="text-sm text-gray-700 dark:text-gray-400">Sales</div>
        </div>
      </div>
    </div>

    <div class="line my-8 relative">
      <!-- Tooltip -->
      <template v-if="APP.tooltipOpen">
        <div
          x-ref="tooltipContainer"
          class="p-0 m-0 z-10 shadow-lg rounded-lg absolute h-auto block"
          :style="`bottom: ${APP.tooltipY}px; left: ${APP.tooltipX}px`"
        >
          <div class="shadow-xs rounded-lg p-2">
            <div class="flex items-center justify-between text-sm">
              <div>Sales:</div>
              <div class="font-bold ml-2">
                <span v-text="APP.tooltipContent"></span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Bar Chart -->
      <div class="flex flex-grow items-end mb-2">
        <template :key="chartData" v-for="data in chartData">
          <div class="px-2 w-1/6">
            <div
              :style="{
                height: `${data}px`,
                backgroundColor: 'rgba(102, 126, 234, 1)',
              }"
              class="transition ease-in duration-200 hover:bg-blue-400 relative"
              @mouseenter="
                ($event) => {
                  APP.showTooltip($event)
                  APP.tooltipOpen = true
                }
              "
              @mouseleave="APP.hideTooltip($event)"
            >
              <div
                v-text="data"
                class="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 dark:text-gray-300 text-sm"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Labels -->
      <div
        class="border-t border-gray-400 dark:border-t-gray-950 mx-auto"
        :style="`height: 1px; width: ${100 - (1 / chartData.length) * 100 + 3}%`"
      />
      <div class="flex items-end">
        <template v-for="label in chartLabels">
          <div class="px-2 w-1/6">
            <div class="bg-red-600 relative">
              <div class="text-center absolute top-0 left-0 right-0 h-2 bg-neutral-400 mx-auto" style="width: 1px" />
              <div
                v-text="label"
                class="text-center absolute top-0 left-0 right-0 mt-3 text-gray-700 text-sm mr-100 dark:text-gray-300"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bg-color-dark: #111;
  --bg-color-light: #eee;
}

.line {
  background: repeating-linear-gradient(
    to bottom,
    var(--bg-color-light),
    var(--bg-color-light) 1px,
    transparent 1px,
    transparent 8%
  );
}

.tick {
  background: repeating-linear-gradient(
    to right,
    var(--bg-color-light),
    var(--bg-color-light) 1px,
    transparent 1px,
    transparent 5%
  );
}

.dark-mode {
  --bg-color-light: #111;
}
</style>
