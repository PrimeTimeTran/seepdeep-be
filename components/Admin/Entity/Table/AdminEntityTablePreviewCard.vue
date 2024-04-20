<script setup>
import { useRightDrawerStore } from '@/stores/drawerRightStore.js'
import { useEventBus } from '@vueuse/core'

const props = defineProps(['item', 'field'])
const store = useRightDrawerStore()

const item = props.item[props.field.name]
const isUser = props.field.name === 'user'
let user = {}
if (isUser) {
  user = item[0]
}
const isBank = props.field.name === 'bank'
const isBranch = props.field.name === 'branch'

const bus = useEventBus('DrawerFocus')
function focusInDrawer() {
  store.setFocused(user)
  if (process.browser) {
    document.getElementById('tRightDrawerFocused')?.click()
  }
  setTimeout(() => {
    bus.emit(user)
  }, 50)
}
</script>
<template>
  <div class="dropdown dropdown-hover max-w-64 h-8">
    <div role="button" class="truncate text-ellipsis m-1 max-w-64" v-text="field.name" />
    <div v-if="isUser" class="dropdown-content z-[1] menu p-4 rounded-box w-96 bg-base-100 primary-content shadow-lg">
      <div class="card-body card-compact space-x-2 p-2 m-2 relative" @click="focusInDrawer">
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="user.urlAvatar" />
          </div>
        </div>
        <div class="">
          <h2 class="card-title text-start">
            {{ user.firstName + ' ' + user.lastName }}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p v-text="user.bio"></p>
          <div class="card-actions justify-end mt-6">
            <div class="badge badge-outline">Audit</div>
            <div class="badge badge-outline">Profile</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="isBank"
      class="dropdown-content z-[1] menu p-4 rounded-box w-96 bg-base-100 primary-content shadow-lg"
    >
      <div class="space-x-2 p-2 m-2">
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <figure>
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </figure>
          </div>
        </div>
        <div class="card-body">
          <h2 class="card-title">
            {{ item.name }}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p v-text="item.name"></p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="isBranch"
      class="dropdown-content z-[1] menu p-4 rounded-box w-96 bg-base-100 primary-content shadow-lg"
    >
      <div class="space-x-2 p-2 m-2">
        <div class="card-body">
          <h2 class="card-title">
            Branch {{ item._id }}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p v-text="item.name"></p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="field.name === 'account'"
      class="dropdown-content z-[1] menu p-4 rounded-box w-96 bg-base-100 primary-content shadow-lg"
    >
      <div class="space-x-2 p-2 m-2">
        <div class="card-body">
          <h2 class="card-title">
            {{ item.name }}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p v-text="item.name"></p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
