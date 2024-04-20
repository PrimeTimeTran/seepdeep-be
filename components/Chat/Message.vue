<script setup>
const props = defineProps(['message', 'me', 'user', 'isMine'])
</script>
<template>
  <div class="w-full flex overflow-y-auto" :class="{ 'justify-end mt-3': isMine, 'flex-start': !isMine }">
    <div class="w-1/2">
      <div class="flex items-center" :class="{ 'justify-end': isMine }">
        <img class="h-5 w-5 overflow-hidden rounded-full" :src="`${user?.urlAvatar}`" />
        <p class="font-semibold ml-3 text-sm text-slate-600">
          {{ user?.fullName }}
          <span class="text-slate-400 text-xs" v-text="message.createdAt" />
        </p>
      </div>
      <div
        class="mt-3 w-full p-4 rounded-b-xl rounded-tr-xl"
        :class="{ 'bg-blue-500 ': isMine, 'bg-slate-50': !isMine }"
      >
        <p class="text-sm text-slate-500" :class="{ 'text-white ': isMine }" v-text="message.body" />
      </div>
    </div>
  </div>
</template>
