<script setup>
import _ from 'lodash'
import draggable from 'vuedraggable'
const route = useRoute()
const entityType = route.path.split('/administrator/')[1]
const { items: data, fetchPage, meta, saveEntity, fetchWithFilterFields } = useResources(entityType)
const state = reactive({
  data: ref(data),
  hidden: ref([]),
  selected: ref([]),
  localSort: ref([]),
  attributesWithTypes: ref([]),
})

function setupAttributes() {
  let cols = GlobalState.entityCols(entityType)
  cols = cols.filter((col) => !state.hidden.includes(col.name))
  state.localSort = cols
  state.data = state.data.sort((a, b) => {
    return state.localSort.indexOf(a.name) - state.localSort.indexOf(b.name)
  })
  state.attributesWithTypes = state.localSort
}
setupAttributes()
function selectAll(e) {
  if (e.target.checked) {
    state.data.forEach((i) => {
      state.selected.push(i._id)
    })
  } else {
    state.selected = []
  }
}
function toggleSelect(id) {
  if (state.selected.includes(id)) {
    _.pull(state.selected, id)
  } else {
    state.selected.push(id)
  }
}
function deleteItem(id) {
  state.data = state.data.filter((i) => i._id !== id)
  toastEm({ val: 'Deleted: ' + id, type: 'danger' })
}
function createSortFields() {
  const fields = {}
  state.attributesWithTypes.forEach((attribute) => {
    if (Type.sortableTypes.includes(attribute.type)) {
      fields[attribute.name] = ref('')
    }
  })
  return fields
}
const sortFields = reactive(createSortFields())
function toggleSort(field, dir) {
  if (sortFields[field] === dir) return
  sortFields[field] = sortFields[field] === 'ASC' ? 'DESC' : 'ASC'
  sort(field, sortFields[field])
}
function sort(field, dir) {
  const isAsc = dir === 'ASC'
  let left = isAsc ? 1 : -1
  let right = isAsc ? -1 : 1
  state.data = state.data.sort((a, b) => ((a[field] ?? '') > (b[field] ?? '') ? left : right))
}
function hideColumn(attribute) {
  state.hidden.push(attribute)
  state.localSort = state.localSort.filter((a) => a.name !== attribute.name)
}
const visibleColumns = computed(() => {
  return state.localSort.filter((attribute) => !state.hidden.includes(attribute.name))
})
</script>
<template>
  <table class="mb-12 text-sm w-full min-w-full overflow-y-auto">
    <thead class="w-full min-w-full bg-base-100 h-16 max-h-16">
      <draggable tag="tr" item-key="name" class="w-full min-w-full text-left" :list="state.localSort" draggable=".item">
        <template #item="{ element, index }">
          <template v-if="index === 0">
            <th class="w-6" :data-draggable="false"></th>
          </template>
          <template v-else-if="!state.hidden.includes(element.name)">
            <th
              :key="element.name"
              :class="{
                item: index > 1,
                'w-6': element.name === '_id',
                'p-2': !element.name === '_id',
              }"
            >
              <input v-if="index === 1" @click="selectAll" type="checkbox" class="checkbox checkbox-sm" />
              <AdminEntityTableColumnTitle
                v-else
                :state
                :attribute="element"
                @toggleSort="toggleSort"
                @hideColumn="hideColumn"
              />
            </th>
          </template>
        </template>
      </draggable>
    </thead>
    <tbody>
      <AdminEntityTableEmptyContent v-if="!state.data || state.data.length === 0" />
      <!-- Depends on if form is for searching or creating new entity -->
      <AdminEntityTableRows
        v-else
        :state
        :deleteItem
        :entityType
        :toggleSelect
        :visibleColumns
        :fetchWithFilterFields="saveEntity || fetchWithFilterFields"
      />
    </tbody>
  </table>
  <AdminEntityPagination :meta :fetchPage />
</template>

<style>
tr td:nth-child(n + 3) {
  min-width: 150px !important;
}
tr td:nth-child(n + 3) {
  max-width: 500px !important;
}
td.empty {
  height: 750px !important;
  vertical-align: middle;
}
</style>
