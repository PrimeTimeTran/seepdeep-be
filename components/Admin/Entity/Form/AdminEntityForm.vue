<script setup>
import _ from 'lodash'
const props = defineProps(['entity', 'entityType', 'fetchWithFilterFields', 'formContext'])
const cols = ref([])
const items = ref([])
cols.value = GlobalState.formSortedFields(props.entityType)
function setup() {
  items.value = TFormHelper.setupFormFields(props.entity, props.entityType)
  cols.value.forEach((att) => {
    let attribute = items.value.filter((item) => item.name === att.name)
    att.value = attribute.value
  })
}
// function onSubmit(e, fields) {
//   e.preventDefault()
//   e.stopPropagation()
//   console.log({
//     fields: e,
//   })
//   // console.log({ cols, entity: props.entity, value: value })
//   // toastEm({ val: 'Clicked' })
// }
const onSubmit = async (e, val) => {
  e.preventDefault()
  e.stopPropagation()
  props.fetchWithFilterFields(props.entity._id, _.cloneDeep(val))
}
watch(() => props.entity._id, setup)
function getField(field) {
  return GlobalState.entities[props.entityType][field.name]
}
function label(field) {
  let f = getField(field)
  if (f) {
    let length = f.options?.length > 1 ? `(${f.options.length})` : ``
    return `${f.label} ${length}`
  }
}
function formActionLabel() {
  switch (props.formContext) {
    case 'create':
      return 'Create'
    case 'edit':
      return 'Update'
    case 'filter':
      return 'Search'
    default:
      break;
  }
}
</script>
<template>
  <div>
    <h1 class="text-4xl">
      {{ capitalize(entityType) }} <span class="text-md ml-6">{{ entity._id }}</span>
    </h1>

    <FormKit
      :id="`entityForm-${entity._id}`"
      :key="`entityForm-${entity._id}`"
      type="form"
      :actions="false"
      :value="entity"
      #default="{ value }"
      :classes="{
        wrapper: 'bg-red-300',
        help: 'dark:text-white',
        message: 'text-red-500 dark:text-red-300',
      }"
    >
      <div class="grid grid-cols-3 gap-3">
        <div v-for="field of cols" class="flex grow">
          <AdminEntityFormField
            :help="''"
            :field="field"
            :type="field.type"
            :name="field.name"
            :label="label(field)"
            :fooValue="entity[field.name]"
            :placeholder="field.placeholder"
            :options="getField(field)?.options"
            :multiple="getField(field)?.type === 'enumeratorMulti'"
            :value="field.type != 'date' ? entity[field.name] : TFormHelper.makeDate(entity[field.name])"
          />
        </div>
      </div>
      <div class="flex mt-16">
        <div class="flex flex-1"></div>
        <div class="flex flex-1 justify-center items-center h-12">
          <div
            @click="(e) => onSubmit(e, value)"
            class="flex grow justify-center items-center bg-success h-100 min-h-full hover:cursor-pointer mx-16 rounded text-white"
          >
            <FormKit type="submit" @click="(e) => onSubmit(e, value)" :classes="{ inner: 'text-white font-bold' }">
              {{ formActionLabel() }}
            </FormKit>
          </div>
        </div>
      </div>
    </FormKit>
  </div>
</template>
