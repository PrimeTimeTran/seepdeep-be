import { serverTimestamp, addDoc, collection, query, orderBy, onSnapshot, getDocs, where } from 'firebase/firestore'
import { useEventBus } from '@vueuse/core'

export function useChat(id) {
  const chatId = ref(id)
  const userName = ref('')
  const sortedMessages = ref([])
  const unsubscribeMsgEvent = ref(null)
  const user = ref({ fullName: ref('') })
  const state = reactive({ notificationCount: ref(-1) })

  const db = useFirestore()
  const messagesRef = collection(db, 'messages')
  const sortedMessagesQuery = query(messagesRef, where('chatId', '==', chatId.value), orderBy('createdAt'))

  const bus = useEventBus('newMessage')

  onMounted(() => {
    getSortedMessages().then((sorted) => {
      let userMessages = sorted.filter((m) => m?.user?.fullName != 'Loi Tran')
      if (userMessages.length > 0) {
        user.fullName = sorted[0]?.user?.fullName
        userName.value = sorted[0]?.user?.fullName
      }
      sortedMessages.value = sorted
    })
  })

  const getSortedMessages = async () => {
    try {
      const querySnapshot = await getDocs(sortedMessagesQuery)
      const sortedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return sortedMessages
    } catch (error) {
      console.error('Error fetching sorted messages:', error)
      return []
    }
  }

  async function sendMessage(event) {
    if (event.key === 'Enter') {
      const body = event.target.value.trim()
      if (body !== '') {
        try {
          await addDoc(messagesRef, {
            body: body,
            chatId: chatId.value,
            createdAt: serverTimestamp(),
            user: {
              avatarUrl: 'https://ui-avatars.com/api/?name=Admin&color=228B22',
              fullName: 'Admin',
              id: '6583920561f0e637230edf36',
            },
          })
          event.target.value = ''
        } catch (error) {
          console.error('Error sending message:', error)
        }
      }
    }
  }

  const unsubscribe = onSnapshot(sortedMessagesQuery, where('chatId', '==', chatId.value), (snapshot) => {
    bus.emit('The Tokyo Olympics has begun')
    state.notificationCount = state.notificationCount + 1
    sortedMessages.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
    if (unsubscribeMsgEvent.value) {
      unsubscribeMsgEvent.value()
    }
  })

  return {
    user,
    state,
    userName,
    sendMessage,
    sortedMessages,
  }
}
