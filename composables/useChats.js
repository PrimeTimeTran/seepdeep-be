import _ from 'lodash'
import { faker } from '@faker-js/faker/locale/af_ZA'
// import { serverTimestamp, addDoc, collection, query, orderBy, onSnapshot, getDocs, where } from 'firebase/firestore'

function genMessage(user) {
  const isMine = faker.helpers.arrayElement([true, false])
  let messageUser = isMine ? meUser : user
  return {
    user: messageUser,
    createdAt: faker.date.recent(),
    id: faker.database.mongodbObjectId(),
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
const meUser = {
  id: '1',
  fullName: 'Loi Tran',
  urlAvatar: 'https://source.unsplash.com/random/500x500/?face',
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
    messages: geMessages(users[0]) || [],
  },
  {
    id: '65e8ad0f6dcb5abacec36eb0',
    user: {
      ...users[1],
    },
    subTitle: 'Hello',
    messages: geMessages(users[1]) || [],
  },
  {
    id: '52ced2b2dceccfaf2a2f4c1a',
    user: {
      ...users[2],
    },
    subTitle: 'Ok, Thanks.',
    messages: geMessages(users[2]) || [],
  },
  {
    id: 'da53b7e9f5ee2966efefe08a',
    user: {
      ...users[3],
    },
    subTitle: 'We own hidden lake..',
    messages: geMessages(users[3]) || [],
  },
  {
    id: 'ed1812cedc481a62dabd23fe',
    user: {
      ...users[4],
    },
    subTitle: 'is is long ipsum avaliable...',
    messages: geMessages(users[4]) || [],
  },
]

export function useChats() {
  const focusedChatId = ref(faker.helpers.arrayElement(chats).id)
  function focusChat(id) {
    focusedChatId.value = id
  }
  // const db = useFirestore()
  // const chatsRef = collection(db, 'chats')
  return {
    meUser,
    chats,
    focusChat,
    focusedChatId,
  }
}
