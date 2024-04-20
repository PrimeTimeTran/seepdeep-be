<script setup>
const props = defineProps(['entity', 'entityType', 'fetchWithFilterFields','formContext'])
const items = ref([])

items.value = TFormHelper.setupFormFields(props.entity, props.entityType)
function toggleModal(id) {
  if (props.formContext === 'filter') {
    const modal = document.getElementById(`modal-${entityType}`)
    if (modal) {
      modal.showModal()
    }
  } else {
    const modal = document.getElementById(`modal-${id}`)
    if (modal) {
      modal.showModal()
    }
  }
}

function buildFormModalId() {
  switch (props.formContext) {
    case 'filter':
      return props.entityType
    default:
      return props.entity._id
    }
}
function showEditButton() {
  return props.formContext == 'edit'
}
</script>
<template>
  <button v-if="showEditButton()" class="btn btn-xs btn-ghost flex justify-start" @click="toggleModal(entity?._id)">
    <FontAwesomeIcon class="mr-2 text-black dark:text-white" color="white" icon="fa-solid fa-pen-to-square" />
    Edit
  </button>
  <dialog :id="`modal-${buildFormModalId()}`" class="modal">
    <div class="modal-box w-11/12 max-w-7xl bg-base-100">
      <form method="dialog">
        <button @click="toggleModal(entity?._id)" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <AdminEntityForm :entity="entity" :entityType="entityType" :fetchWithFilterFields="fetchWithFilterFields" :formContext="formContext" />
      <form method="dialog" class="modal-backdrop">
        <button @click="toggleModal(entity?._id)">close</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
