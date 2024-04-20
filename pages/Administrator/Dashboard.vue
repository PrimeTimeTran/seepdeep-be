<script setup>
import { faker } from '@faker-js/faker/locale/af_ZA'
import { TableCellsIcon, EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 't-main-layout',
  layoutTransition: true,
})

const items = ['Users', 'Posts', 'Comments', 'Messages']
</script>
<template>
  <div class="space-y-8">
    <div class="overflow-x-auto min-h-full min-w-full p-2 space-y-4">
      <div class="flex flex-row justify-around space-x-4">
        <div class="card flex grow bg-base-100 shadow-lg border border-base-200" v-for="item of items">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content" v-text="item"></span>
              <span class="h-6 w-6">
                <component :is="TableCellsIcon" />
              </span>
            </div>
            <h3 class="text-5xl" v-text="faker.number.int({ min: 200, max: 500 })"></h3>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-around space-x-2">
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Bar Single</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.bar3" />
          </div>
        </div>
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Bar Double</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.bar" />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-around space-x-2">
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Scatter</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.scatter" />
          </div>
        </div>
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between">
              <span class="card-title base-content">Line</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.line" />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-around space-x-2">
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Radar</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.radar" />
          </div>
        </div>
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Double Doughnut</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.doughnut2" />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-around space-x-2">
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">P&L</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.bar2" />
          </div>
        </div>
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between">
              <span class="card-title base-content">Line Multi</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.line2" />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-around space-x-2">
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body">
            <div class="flex flex-row justify-between grow items-center">
              <span class="card-title base-content">Doughnut</span>
              <span class="h-6 w-6">
                <component :is="EllipsisHorizontalIcon" />
              </span>
            </div>
            <Chart :config="chartData.doughnut" />
          </div>
        </div>
        <div class="card flex flex-1 bg-base-100 shadow-lg border border-base-200">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>
