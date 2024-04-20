<script setup>
const props = defineProps([
  'state',
  'deleteItem',
  'entityType',
  'toggleSelect',
  'visibleColumns',
  'fetchWithFilterFields',
])
</script>
<template>
  <tr
    :key="item._id"
    v-for="item of state.data"
    class="w-full min-w-full odd:bg-base-200 even:bg-base-300 hover:text-green-500 dark:hover:text-green-400"
  >
    <td v-for="(attribute, idx) of visibleColumns" :class="{ ['p-2']: idx > 1 }">
      <AdminEntityTableField
        :state="state"
        :document="item"
        :field="attribute"
        :deleteItem="deleteItem"
        :entityType="entityType"
        :toggleSelect="toggleSelect"
        :fetchWithFilterFields="fetchWithFilterFields"
      />
    </td>
  </tr>
</template>
