<script setup>
import _ from 'lodash'
import { faker } from '@faker-js/faker/locale/af_ZA'
definePageMeta({
  layoutTransition: true,
  layout: 't-landing-layout',
})
useHead({
  script: [
    {
      src: 'unpkg.com/alpinejs',
      tagPosition: 'head',
    },
  ],
})
const me = {
  id: '1',
  fullName: 'Loi Tran',
  urlAvatar: 'https://source.unsplash.com/random/500x500/?face',
}
function genMessage(user) {
  const isMine = faker.helpers.arrayElement([true, false])
  let messageUser = isMine ? me : user
  return {
    user: messageUser,
    id: faker.database.mongodbObjectId(),
    createdAt: faker.date.recent(),
    body: faker.lorem.paragraphs({ min: 1, max: 3 }),
  }
}
function geMessages(user) {
  let count = faker.number.int({ min: 10, max: 15 })
  let messages = []
  while (count > 0) {
    messages.push(genMessage(user))
    count--
  }
  return messages
}
const users = [
  {
    id: faker.database.mongodbObjectId(),
    fullName: 'Yaroslav Zubkp',
    urlAvatar:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500',
  },
  {
    id: faker.database.mongodbObjectId(),
    fullName: 'Lily Pettigrew',
    urlAvatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: faker.database.mongodbObjectId(),
    fullName: 'Mircel Jones',
    urlAvatar:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500',
  },
  {
    id: faker.database.mongodbObjectId(),
    fullName: 'Uran Poland',
    urlAvatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500',
  },
  {
    id: faker.database.mongodbObjectId(),
    fullName: 'Yaroslav Zubkp',
    urlAvatar:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500',
  },
]
const chats = [
  {
    id: 'ab1349b7c1af3dff0da520f3',
    user: {
      ...users[0],
    },
    subTitle: 'is is long ipsum avaliable...',
    messages: geMessages(users[0]),
  },
  {
    id: '65e8ad0f6dcb5abacec36eb0',
    user: {
      ...users[1],
    },
    subTitle: 'Hello',
    messages: geMessages(users[1]),
  },
  {
    id: '52ced2b2dceccfaf2a2f4c1a',
    user: {
      ...users[2],
    },
    subTitle: 'Ok, Thanks.',
    messages: geMessages(users[2]),
  },
  {
    id: 'da53b7e9f5ee2966efefe08a',
    user: {
      ...users[3],
    },
    subTitle: 'We own hidden lake..',
    messages: geMessages(users[3]),
  },
  {
    id: 'ed1812cedc481a62dabd23fe',
    user: {
      ...users[4],
    },
    subTitle: 'is is long ipsum avaliable...',
    messages: geMessages(users[4]),
  },
]
const focusedChatId = ref(faker.helpers.arrayElement(chats).id)
function focusChat(id) {
  focusedChatId.value = id
}
const focusedChat = computed(() => chats.filter((c) => c.id === focusedChatId.value)[0])
</script>
<template>
  <div class="h-screen w-full bg-blue-600">
    <div class="h-full bg-white overflow-hidden flex flex-col shadow-xl">
      <ChatTopToolbar />
      <div class="h-full flex">
        <ChatSidebar1 />
        <div class="h-full w-96 bg-slate-50 border-r flex flex-col">
          <div role="tablist" class="tabs tabs-bordered">
            <input type="radio" name="chat_tabs" role="tab" class="tab" aria-label="All" checked />
            <div role="tabpanel" class="tab-content">
              <div class="h-full">
                <div
                  v-for="chat of chats"
                  @click="focusChat(chat.id)"
                  class="px-5 py-4 flex items-center cursor-pointer hover:bg-slate-100"
                  :class="{
                    'bg-white border-l-blue-500 border-t border-b border-l-4': chat.id == focusedChatId,
                  }"
                >
                  <img :src="`${chat.user.urlAvatar}`" class="h-12 w-12 border-2 border-white rounded-full" alt="" />
                  <div class="ml-4">
                    <p class="text-md font-semibold text-slate-600 m-0 p-0" v-text="chat.user.fullName" />
                    <p class="text-xs text-slate-400 -mt-0.5 font-semibold" v-text="chat.subTitle" />
                  </div>
                </div>
              </div>
            </div>
            <input type="radio" name="chat_tabs" role="tab" class="tab" aria-label="Archived" />
            <div role="tabpanel" class="tab-content p-10">Tab content 2</div>
          </div>
        </div>
        <div class="w-full h-full flex flex-col relative">
          <div class="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
            <div class="flex items-center">
              <img class="h-10 w-10 overflow-hidden rounded-full" :src="`${focusedChat?.user.urlAvatar}`" />
              <p class="font-semibold ml-3 text-slate-600" v-text="focusedChat?.user.fullName" />
            </div>
            <div class="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 bg-slate-50 rounded-full stroke-slate-400 p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 stroke-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
          </div>
          <div class="h-full px-10 py-4 overflow-y-auto">
            <!-- message container -->
            <!-- <div class="text-center my-5">
              <hr class="-mb-3" />
              <span class="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">Wednesday, Feburary 5</span>
            </div> -->
            <div v-for="msg in focusedChat.messages">
              <ChatMessage
                :me="me"
                :message="msg"
                :isMine="msg.user.id === me.id"
                :user="msg.user.id === me.id ? me : msg.user"
              />
            </div>
          </div>
          <div class="absolute bottom-0 left-0 h-28 w-full bg-slate-50">
            <div
              class="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg p-0 m-0"
            >
              <input
                autofocus
                type="text"
                class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
                placeholder="Type your message"
              />
              <div class="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 stroke-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 stroke-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tab:is(input:checked) {
  border-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
</style>
