<script setup>
import _ from 'lodash'
const props = defineProps(['entity', 'entityType'])
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

function getField(field) {
  return GlobalState.entities[props.entityType][field.name]
}
watch(() => props.entity._id, setup)
</script>
<template>
  <div class="p-6">
    <h1 class="text-4xl">{{ capitalize(entityType) }}</h1>
    <FormKit
      :key="`entityForm-${entity._id}`"
      :id="`entityForm-${entity._id}`"
      type="form"
      @submit="submit"
      :actions="false"
      :value="entity"
      #default="{ value }"
      :classes="{
        help: 'dark:text-white',
        message: 'text-red-500 dark:text-red-300',
      }"
    >
      <div class="grid grid-cols-3 gap-3">
        <div v-for="field of cols" class="flex">
          <AdminEntityFormField
            v-if="field.type != 'date'"
            :help="''"
            :field="field"
            :type="field.type"
            :name="field.name"
            :value="entity[field.name]"
            :fooValue="entity[field.name]"
            :placeholder="field.placeholder"
            :label="getField(field)?.label"
            :options="getField(field)?.options"
            :multiple="getField(field)?.type === 'enumeratorMulti'"
          />
          <AdminEntityFormField
            v-else
            :help="''"
            :field="field"
            :name="field.name"
            :type="field.type"
            :fooValue="entity[field.name]"
            :placeholder="field.placeholder"
            :value="TFormHelper.makeDate(entity[field.name])"
            :label="getField(field)?.label"
            :options="getField(field)?.options"
          />
        </div>
      </div>
    </FormKit>
  </div>
</template>
