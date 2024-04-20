<script setup>
const props = defineProps(['meta', 'fetchPage'])
const common = computed(() => `bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700`)
const first = computed(() => {
  return `${common} ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
})
const last = computed(() => {
  return `${common} rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
})
const others = computed(
  () =>
    `${common} leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
)
const current = computed(
  () =>
    `bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white`,
)
const getVisibility = (val) => {
  return { ['opacity-0']: val }
}
const left = computed(() => {
  let num = props.meta.limit * (props.meta.page - 1) + 1
  return num + '/' + props.meta.limit * props.meta.page
})
</script>
<template>
  <div class="flex justify-around my-4">
    <div class="flex flex-1 justify-center dark:text-white">
      <span v-text="left" />
    </div>
    <ul class="flex justify-center items-center align-middle w-96">
      <li @click="() => fetchPage(-10)" :class="getVisibility(meta.page - 3 <= 0)">
        <a :class="meta.page - 3 == meta.pageCount ? first : others">
          <FontAwesomeIcon icon="fa-solid fa-caret-left" />
          <span class="ml-3" v-text="1" />
        </a>
      </li>
      <li @click="() => fetchPage(-10)" :class="getVisibility(meta.page - 2 <= 0)">
        <a :class="meta.page - 2 == meta.pageCount ? first : others">
          <span v-text="meta.page - 2" />
        </a>
      </li>
      <li @click="() => fetchPage(-1)" :class="getVisibility(meta.page - 1 <= 0)">
        <a :class="meta.page - 1 == meta.pageCount ? first : others">
          <span v-text="meta.page - 1" />
        </a>
      </li>
      <li>
        <a :class="current" aria-current="page" v-text="meta.page"> </a>
      </li>
      <li @click="() => fetchPage(1)" :class="getVisibility(meta.page + 1 > meta.pageCount)">
        <a :class="meta.page + 1 == meta.pageCount ? last : others">
          <span v-text="meta.page + 1" />
        </a>
      </li>
      <li @click="() => fetchPage(2)" :class="getVisibility(meta.page + 2 > meta.pageCount)">
        <a :class="meta.page + 2 == meta.pageCount ? last : others">
          <span v-text="meta.page + 2" />
        </a>
      </li>
      <li @click="() => fetchPage(10)" :class="getVisibility(meta.page + 3 > meta.pageCount)">
        <a :class="meta.page + 3 == meta.pageCount ? last : others">
          <span class="mr-3" v-text="meta.pageCount" />
          <FontAwesomeIcon icon="fa-solid fa-caret-right" />
        </a>
      </li>
    </ul>
    <div class="flex flex-1 justify-center">
      <span class="dark:text-white" v-text="meta.totalCount" />
    </div>
  </div>
</template>
