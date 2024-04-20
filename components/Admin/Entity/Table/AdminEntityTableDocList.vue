<script setup>
import _ from 'lodash'
const props = defineProps(['items', 'field', 'document'])
const count = computed(() => {
  const length = props.document[props.field?.name]?.length
  return length > 1 ? `(${props.document[props.field?.name]?.length})` : ''
})
</script>

<template>
  <div class="dropdown dropdown-hover">
    <div class="m-1 line-clamp-2 w-64 max-w-64 truncate whitespace-normal" v-text="`${field.name} ${count}`" />
    <div
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box overflow-y-auto w-64 h-96 max-h-96 overflow-auto scrollbar-hide"
    >
      <ul v-if="!_.isString(items)" tabindex="0" class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box">
        <li v-for="item of items">
          <a v-text="item" />
        </li>
      </ul>
      <div v-else>
        {{ items }}
      </div>
    </div>
  </div>
</template>
