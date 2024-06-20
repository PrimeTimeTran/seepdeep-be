<script setup>
const navItems = [
  {
    url: '/',
    name: 'Home',
    icon: 'fa-house',
  },
  {
    url: '/articles',
    name: 'Articles',
    icon: 'fa-house',
  },
  {
    name: 'Showcase',
    icon: 'fa-palette',
    dropdown: true,
    links: [
      {
        url: '/administrator/dashboard',
        name: 'Admin Dashboard',
        icon: 'fa-dashboard',
      },
      {
        url: '/administrator/auditlogs',
        name: 'Audits',
        icon: 'fa-blog',
      },
      {
        url: '/administrator/ui',
        name: 'UIKit',
        icon: 'fa-palette',
      },
      {
        url: '/administrator/calendar',
        name: 'Calendar',
        icon: 'fa-calendar',
      },
    ],
  },
]
</script>
<template>
  <div
    v-for="item in navItems"
    class="flex lg:flex-none items-center lg:px-6 text-gray-500 hover:text-green-500 dark:text-gray dark:hover:text-green-500 cursor-pointer transition-colors duration-300 text-xs font-bold"
  >
    <NuxtLink v-if="!item.dropdown" :to="item.url" :key="item.name" class="btn btn-ghost rounded-btn">
      <FontAwesomeIcon :icon="item.icon" />
      <span v-text="item.name" />
    </NuxtLink>
    <div v-else class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <FontAwesomeIcon :icon="item.icon" /> {{ item.name }}
      </div>
      <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 mt-4">
        <li v-for="dropdownItem in item.links">
          <NuxtLink :to="dropdownItem.url" :key="dropdownItem.name">
            <FontAwesomeIcon :icon="dropdownItem.icon" />
            <span v-text="dropdownItem.name" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <TheNavbarRight id="navItems-right" />
</template>
