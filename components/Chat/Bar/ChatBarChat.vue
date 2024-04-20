<script setup>
const props = defineProps(['chat', 'idx'])
const { userName, state, sendMessage, sortedMessages } = useChat(props.chat.id)

function onToggleChat() {
  const checkbox = document.getElementById('toggleChatBtn-' + props.chat.id)
  checkbox.click()
}
const notificationCount = computed(() => (state.notificationCount > 0 ? state.notificationCount : ''))
</script>
<template>
  <div class="relative">
    <label :for="`toggle-chat-${chat.id}`" :id="`toggleChatBtn-${chat.id}`" />
    <input type="checkbox" :id="`toggle-chat-${chat.id}`" class="chat-toggle hidden" />
    <div :style="{ right: `${288 + idx * 288}px` }" class="container fixed w-72 bg-base-100">
      <div class="border rounded p-2" @click="onToggleChat(idx)">{{ userName }} {{ notificationCount }}</div>
      <div class="flex flex-col justify-between h-full px-2 border">
        <div class="flex flex-col overflow-y-auto">
          <p v-for="message of sortedMessages">{{ message.body }}</p>
        </div>
      </div>
    </div>
    <input
      id="chatInputField"
      @keypress.enter="sendMessage"
      class="container-input px-2 border"
      :style="{ right: `${288 + idx * 288}px` }"
    />
  </div>
</template>

<style scoped>
.container {
  bottom: 0;
  z-index: 2;
  height: 66vh;
  width: 288px;
  position: fixed;
  max-height: 42px;
  transition: max-height 0.3s ease;
}
.chat-toggle:checked + .container {
  max-height: 33vh;
}

.container-input {
  bottom: 0;
  z-index: -1;
  height: 42px;
  width: 288px;
  position: fixed;
}

.chat-toggle:checked ~ .container-input {
  z-index: 3;
  display: flex;
}
</style>
