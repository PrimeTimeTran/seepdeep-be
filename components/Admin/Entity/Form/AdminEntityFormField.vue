<script setup>
import _ from 'lodash'

const props = defineProps({
  min: { type: String },
  max: { type: String },
  type: { type: String },
  help: { type: String },
  name: { type: String },
  label: { type: String },
  validation: { type: String },
  placeholder: { type: String },
  multiple: { type: Boolean, default: false },
  options: {
    validator: (value) => {
      return typeof value === 'string' || typeof value === 'object' || typeof value === 'array'
    },
  },
  value: {
    validator: (value) => {
      return true
    },
  },
  field: {
    validator: (value) => {
      return true
    },
  },
})
const allClasses = {
  outer: 'flex grow',
  input: 'input input-bordered input-sm w-72',
  label: 'dark:text-white font-semibold',
  message: 'text-red-500 dark:text-red-300 absolute',
}
</script>
<template>
  <div class="my-2">
    <div v-if="type === 'boolean'" class="flex grow pt-6">
      <label class="mr-2" v-text="label" />
      <input
        checked
        :placeholder="placeholder"
        :options="options"
        type="checkbox"
        class="toggle"
        :classes="allClasses"
        :name="name"
        @change="(e) => (props.value = e.target.checked)"
      />
    </div>
    <FormKit
      v-else-if="type === 'string'"
      type="text"
      :name="name"
      :label="label"
      :value="value"
      :classes="allClasses"
      :placeholder="placeholder"
      @input="
        (val) => {
          value = val
        }
      "
    />
    <FormKit
      v-else-if="type === 'text'"
      type="textarea"
      :name="name"
      :label="label"
      :value="value"
      :classes="allClasses"
      :placeholder="placeholder"
      @input="(e) => (props.value = e.target.value)"
    />
    <FormKit
      v-else-if="type === 'integer'"
      :min="min"
      :max="max"
      type="number"
      number="integer"
      step="1"
      :name="name"
      :label="label"
      :classes="allClasses"
      :placeholder="placeholder"
    />
    <FormKit
      v-else-if="type === 'decimal'"
      number
      :min="min"
      :max="max"
      type="number"
      :name="name"
      :label="label"
      :classes="allClasses"
      :placeholder="placeholder"
    />
    <FormKit
      v-else-if="type === 'date'"
      type="date"
      :help="help"
      :label="label"
      :value="value"
      :classes="allClasses"
      :placeholder="placeholder"
    />
    <FormKit
      v-else-if="type === 'datetime-local'"
      type="datetime-local"
      :help="help"
      :label="label"
      :value="value"
      :classes="allClasses"
      :placeholder="placeholder"
    />
    <FormKit
      v-else-if="type === 'enumeratorMulti' || type === 'enumerator'"
      type="select"
      :name="name"
      :label="label"
      :value="value"
      :options="options"
      :multiple="multiple"
      :classes="allClasses"
      :placeholder="placeholder"
      :input-class="{ 'select select-bordered select-sm w-72': true }"
    />
    <div v-else-if="value && field.type === 'relation' && !_.isEmpty(value)" class="w-72">
      <label class="font-bold" v-text="capitalize(field.name)" />
      <pre v-if="value.length === 1" class="input input-bordered input-sm w-72">{{
        value[0]._id ? value[0]._id : value[0]
      }}</pre>
      <select v-else-if="value.length > 0" class="select select-bordered select-sm w-72">
        <option v-for="option of value" v-text="option" />
      </select>
    </div>
  </div>
</template>
