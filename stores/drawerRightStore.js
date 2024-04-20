export const useRightDrawerStore = defineStore('drawerRightStore', () => {
  const focused = reactive({})
  function setFocused(item) {
    Object.assign(focused, item[0])
  }

  return { focused, setFocused }
})
