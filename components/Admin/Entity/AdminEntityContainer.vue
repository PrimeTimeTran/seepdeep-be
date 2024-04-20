<script setup>
import { EllipsisHorizontalIcon,MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
definePageMeta({
  layout: 'admin-layout',
  layoutTransition: true,
})

useHead({
  title: 'Users | Turboship Admin',
  meta: [{ name: 'description', content: 'Great admin panels' }],
  script: [
    {
      innerHTML: 'console.log("Wizard scripts loading...")',
      tagPosition: 'head',
    },
  ],
})
const route = useRoute()
const entityType = route.path.split('/administrator/')[1]

function toggleModal(id) {
  
  const modal = document.getElementById(`modal-${entityType}`)
    if (modal) {
      modal.showModal()
    }
}
</script>
<template>
  <div role="tablist" class="tabs tabs-lifted relative">
    <input type="radio" name="entityTabs" role="tab" class="tab alpha" aria-label="Records" checked />
    <div
      role="tabpanel"
      class="tab-content border-base-300 dark:border-base-200 rounded-box max-w-full w-full overflow-scroll scrollbar-hide"
    >
      <!-- [ ] Add search -->
      <AdminEntityTable />
    </div>
    <input type="radio" name="entityTabs" role="tab" class="tab alpha" aria-label="Overview" />
    <div role="tabpanel" class="tab-content dark:bg-base-100 border-base-300 rounded-box p-2">
      <ChartOverview />
    </div>
    <input type="radio" name="entityTabs" role="tab" class="tab alpha" aria-label="Create New" />
    <div role="tabpanel" class="tab-content dark:bg-base-100 border-base-300 rounded-box p-2">
      <AdminEntityForm :entity="{}" :entityType :formContext="'create'" />
    </div>
    <input type="radio" name="entityTabs" role="tab" class="tab alpha" aria-label="Settings" />
    <div role="tabpanel" class="tab-content dark:bg-base-100 border-base-300 rounded-box p-2">
      <!-- [ ] Settings can/can't be accessed depending on user role(2nd API request).-->
      <!-- [ ] Admins can enable/disable fields/cols by role. -->
      <AdminEntitySettings />
    </div>
    <div class="absolute end-0 -top-1 flex items-center">
      <!-- [ ] Add CSV download option -->
      <button @click="toggleModal()" class="btn btn-sm btn-ghost"><MagnifyingGlassIcon class="h-6 w-6" /></button>
      <button class="btn btn-sm btn-ghost"><EllipsisHorizontalIcon class="h-6 w-6" /></button>
      <button class="btn btn-sm btn-ghost">View</button>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-sm btn-success text-white primary-content">New</div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 bg-base-200 rounded-box w-52 mt-2">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    </div>
    <AdminEntityFormWrapper :entity="{}" :entityType :formContext="'filter'" />
  </div>
</template>

<style>
.alpha {
  width: 150px !important;
}
</style>
