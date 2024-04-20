<script setup>
definePageMeta({
  layout: 't-main-layout',
})

const { apiUrl } = useAPI()
const url = apiUrl + '/auditlogs?limit=25'
const { data } = await useFetch(url)

const headers = [
  { model: '', type: 'dateTime', key: 'timestamp', label: 'Date', width: '', hasDropdown: false, dropdownItems: [] },
  {
    model: 'user',
    type: 'string',
    key: 'actorEmail',
    label: 'Email',
    width: '',
    hasDropdown: false,
    dropdownItems: [],
  },
  {
    model: 'user',
    type: 'string',
    key: 'actorFirstName',
    label: 'Actor',
    width: '',
    hasDropdown: false,
    dropdownItems: [],
  },
  { model: '', type: 'string', key: 'action', label: 'Action', width: '', hasDropdown: false, dropdownItems: [] },
  { model: '', type: 'string', key: 'model', label: 'Collection', width: '', hasDropdown: false, dropdownItems: [] },
  {
    model: '',
    type: 'ObjectId',
    key: 'documentId',
    label: 'Document',
    width: '',
    hasDropdown: false,
    dropdownItems: [],
  },
]
const keys = ['timestamp', 'actorEmail', 'actorFirstName', 'action', 'model', 'documentId']
</script>
<template>
  <TTable :headers="headers" :items="data?.data" :keys="keys" />
</template>
