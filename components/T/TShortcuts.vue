<!--
  - Stop server, remove .nuxt, nuxi cleanup to remove cached files and see 
    public file changes reflected
 -->

<!-- [ ] How to disable caching of files? -->
<!-- [ ] How to easily generate this layout pattern with different content via code? -->
<script setup>
import { useClipboard } from '@vueuse/core'

const source = ref('')
const { text, copy } = useClipboard({ source })
let entities
function setup() {
  try {
    const { entities: entitiesA } = useEntities()
    entities = entitiesA
  } catch (error) {
    entities = { entities: [] }
  }
}
setup()
useHead({
  link: [],
  script: [
    {
      defer: true,
      src: '/js/TShortcuts.js',
      type: 'text/javascript',
      tagPosition: 'bodyClose',
    },
  ],
})
function tSampleThemes() {
  TApp.sampleThemes()
}
function ourCopy() {
  let values
  if (store.isSparse) {
    values = sparseEntities(entities)
  } else {
    values = entities
  }
  copy(JSON.stringify(values))
  toastEm({ options: 'Copied Entities' })
  setTimeout(() => {
    text.value = 'Done'
  }, 1500)
}
</script>
<template>
  <div>
    <label for="tModalToggle"></label>
    <input type="checkbox" id="tModalToggle" class="modal-toggle" />
    <div class="modal w-screen h-screen flex justify-center items-center">
      <div class="flex justify-center items-center">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
    <div @click="store.showLeft = !store.showLeft" id="showLeft"></div>
    <div @click="store.showRight = !store.showRight" id="showRight"></div>
    <div id="showOverlay" @click="store.showOverlay = !store.showOverlay" />
    <div @click="ourCopy()" id="copyEntities"></div>

    <div @click="store.isSparse = !store.isSparse" id="toggleSparse"></div>
    <div @click="toggleTheme" id="tThemeToggle"></div>
    <div @click="tSampleThemes" id="tSampleThemes"></div>
  </div>
</template>
