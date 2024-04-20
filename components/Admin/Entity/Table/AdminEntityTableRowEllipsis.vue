<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
const props = defineProps(['deleteItem', 'item', 'entityType', 'fetchWithFilterFields'])
</script>
<template>
  <td class="no-hover-effect">
    <div class="dropdown dropdown-hover dropdown-start">
      <div tabindex="0" role="button" class="btn btn-xs btn-ghost w-12">
        <EllipsisHorizontalIcon class="h-6 w-6" />
      </div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <button class="btn btn-xs btn-ghost flex justify-start">
          <FontAwesomeIcon class="mr-2 text-black dark:text-white" color="white" icon="fa-solid fa-magnifying-glass" />
          <label for="rightDrawer" aria-label="close sidebar" id="tRightDrawerFocused" class="drawer-overlay">
            Open
          </label>
        </button>
        <AdminEntityFormWrapper
          :entity="item"
          :entityType="entityType"
          :fetchWithFilterFields="fetchWithFilterFields"
          :formContext="'edit'"
        />
        <button class="btn btn-xs btn-ghost flex justify-start">
          <FontAwesomeIcon class="mr-2 text-black dark:text-white" color="white" icon="fa-solid fa-clock" /> Audit Logs
        </button>
        <button @click="deleteItem(item._id)" class="btn btn-xs btn-ghost flex justify-start">
          <FontAwesomeIcon class="mr-2 text-red-400" color="white" icon="fa-solid fa-trash" />
          <span class="text-red-400" v-text="'Delete'" />
        </button>
      </ul>
    </div>
  </td>
</template>

<style>
.no-hover-effect:hover {
  color: oklch(var(--bc));
}
</style>
