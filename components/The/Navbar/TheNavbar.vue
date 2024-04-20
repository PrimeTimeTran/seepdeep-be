<script setup>
const percent = ref(0)
const showMenu = ref(false)
const client = process.browser && window.location.pathname != '/login'
function appInit() {
  if (client) {
    window?.addEventListener('scroll', () => {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight

      percent.value = Math.round((winScroll / height) * 100)
    })
  }
}
function appData() {
  if (client) return { percent }
}

const route = useRoute()
</script>

<template>
  <div x-cloak :x-data="appData()" :x-init="appInit()" class="flex flex-col items-center justify-center">
    <!-- <TheNavbarScrollSpy :percent="percent" /> -->
    <div class="drawer z-20 bg-base-100">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div id="TheNavBar" class="w-full navbar shadow-md z-20 bg-base-100">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="px-2 mx-2 flex-1">
            <TheNavbarLogo />
          </div>
          <div class="flex-none hidden lg:block ml-auto">
            <ul class="menu menu-horizontal">
              <TheNavbarItems />
            </ul>
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full shadow-md bg-white dark:bg-slate-950">
          <TheNavbarItems />
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-small {
  min-height: 2rem;
  height: 1.875rem;
  max-height: 1.875rem;
}
</style>
