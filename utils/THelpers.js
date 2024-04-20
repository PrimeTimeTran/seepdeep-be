import { useClipboard } from '@vueuse/core'

export function useHelpers() {
  const source = ref('')
  const { copy } = useClipboard({ source })
  function turboCopy(val) {
    copy(val)
    toastEm({ val: 'Copied: ' + val })
  }
  function enumColor(entity, attribute, item, subItem) {
    try {
      const { name } = attribute
      let property = GlobalState.entities[entity][name]
      let val = subItem || item[name]
      let idx = property.options.indexOf(val)
      return colors[idx]
    } catch (error) {
      console.log({
        error,
        entity,
        message: "Check to ensure you've passed the correct params to enumColor.",
      })
    }
  }
  return {
    enumColor,
    turboCopy,
  }
}
