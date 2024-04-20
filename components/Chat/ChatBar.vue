<script setup>
import _ from 'lodash'
import { Icon } from '#components'
import { useEventBus } from '@vueuse/core'
const ArtIcon = h(Icon, { name: 'map:art-gallery', color: 'grey' })
const ArtIcon2 = h(Icon, { name: 'icon-park-solid:components', color: 'grey' })
const props = defineProps([])

const { me, chats, focusChat, focusedChatId } = useChats()

const state = reactive({
  unreadCount: 0,
})
function onToggleChat() {
  const checkbox = document.getElementById('toggleChatBtn')
  checkbox.click()
}
onMounted(() => {
  // chats.slice(0, 4)

  const bus = useEventBus('newMessage')
  function listener(event) {
    state.unreadCount = state.unreadCount + 1
  }
  const unsubscribe = bus.on(listener)
})
</script>
<template>
  <div class="fixed bottom-0 right-0 bg-base-100 left-0 p-0 h-10">
    <label for="toggleChat" id="toggleChatBtn" />
    <input type="checkbox" id="toggleChat" />
    <div class="chatContainer w-72 fixed r-0 b-0 rounded border flex flex-col bg-base-100 pr-2">
      <div
        class="flex flex-row justify-between items-center border-b rounded-bl-none rounded-br-none p-2"
        @click="onToggleChat"
      >
        <ArtIcon />
        <div class="w-8 h-8">
          <div class="indicator">
            <span class="indicator-item badge badge-primary">{{ state.unreadCount }}</span>
            <div class="grid w-8 h-8 place-items-center"><ArtIcon2 /></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          v-for="chat of chats"
          class="flex flex-row w-100 h-20 p-2 border-b hover-effect hover:text-black/65 border-l-2"
          :class="{ 'border-l-primary': focusedChatId === chat.id }"
        >
          <div class="avatar mr-2">
            <div class="w-12 h-12 rounded-full">
              <img :src="chat.user.urlAvatar" />
            </div>
          </div>
          <div class="flex flex-col text-content p-1">
            <div>{{ chat.user.fullName }}</div>
            <div @click="focusChat(chat.id)" class="w-60 pr-8 truncate">
              {{ chat.messages.length > 0 ? _.last(chat.messages).body : null }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatItems flex flex-row-reverse fixed bottom-0 right-0">
      <div class="w-72"></div>
      <ChatBarChat v-for="(item, idx) of chats.slice(0, 4)" :chat="item" :idx="idx" />
    </div>
  </div>
</template>
<style scoped>
.chatContainer {
  right: 0;
  bottom: 0;
  z-index: 2;
  height: 66vh;
  position: fixed;
  max-height: 42px;
  transition: max-height 0.3s ease;
}
#toggleChat:checked + .chatContainer {
  max-height: 66vh;
}
.chatItems {
  height: 42px;
}
.text-content {
  transition: brightness 0.3s ease;
}
.hover-effect:hover .text-content {
  filter: brightness(200%);
  color: black;
  opacity: 0.65;
}
</style>
