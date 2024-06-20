import { ref } from 'vue'

export function useToggleOpen() {
  const isOpen = ref(false)

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggleOpen,
  }
}
