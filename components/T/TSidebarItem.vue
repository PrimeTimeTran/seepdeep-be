<script setup>
const props = defineProps(['state', 'text', 'icon', 'focused', 'notification', 'notificationCount', 'options'])
const emit = defineEmits(['click'])
const router = useRouter()
</script>
<template>
  <button
    v-if="!options"
    @click="emit('click')"
    class="btn btn-ghost flex primary-content hover:text-green-400 dark:hover:text-green-400"
    :class="{
      'text-green-400': focused,
      'hover:text-white': focused,
      'justify-start': state.leftOpen,
    }"
  >
    <div v-if="icon" class="indicator">
      <span
        v-if="notification"
        v-text="notificationCount"
        class="indicator-item badge badge-info indicator-small h-6 w-6"
      />
      <div class="h-8 w-8">
        <component :is="icon" />
      </div>
    </div>
    <span class="ml-2" v-text="text" v-if="state.leftOpen" />
  </button>
  <div v-else class="dropdown dropdown-top">
    <div
      tabindex="0"
      role="button"
      class="btn btn-ghost flex primary-content justify-start hover:text-green-400 dark:hover:text-green-400"
    >
      <span
        v-if="notification"
        v-text="notificationCount"
        class="indicator-item badge badge-info indicator-small h-6 w-6"
      />
      <div class="h-8 w-8">
        <component :is="icon" />
      </div>
      <span class="ml-2" v-text="text" v-if="state.leftOpen" />
    </div>
    <ul tabindex="0" class="dropdown-content menu px-2 shadow bg-base-200 dark:bg-base-200 rounded-box w-52 border">
      <TSidebarItem
        v-for="option of options"
        :text="option.text"
        :state="state"
        :icon="option.icon"
        @click="option.route != null ? router.push(option.route) : null"
      />
    </ul>
  </div>
</template>

<style scoped>
.indicator-small {
  font-size: 10px;
}
</style>
