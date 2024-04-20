<script setup>
import _ from 'lodash'
const props = defineProps(['headers', 'items', 'keys'])
</script>
<template>
  <div class="relative">
    <div class="overflow-x-auto overflow-auto scrollbar-hide">
      <table class="table min-w-full rounded-lg">
        <thead class="bg-base-100">
          <tr class="border-b border-gray-500">
            <th :key="col.label" v-for="col of headers" v-text="col.label" />
          </tr>
        </thead>
        <tbody>
          <tr :key="item._id" v-for="item of items" class="odd:bg-base-100 even:bg-base-200 hover:text-green-400">
            <td v-for="(key, idx) of keys">
              <span v-if="headers[idx].type === 'dateTime'" v-text="parseTime(item[key])" />
              <span v-else-if="false" />
              <span v-else v-text="item[key]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="footer absolute bottom-0 flex w-full justify-center mt-20 -z-0">
      <div class="flex end-0 grow">
        <div class="flex h-10 px-2 grow">
          <!-- Left -->
          <div></div>
        </div>
        <div class="flex h-10 px-2 grow justify-end">
          <!-- Right -->
          <div></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
tr > th,
td > span {
  min-width: 150px !important;
}
.footer {
  bottom: 0;
  width: 100%;
  position: sticky;
}
</style>
