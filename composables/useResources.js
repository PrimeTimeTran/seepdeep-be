import _ from 'lodash'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export function useResources(resource) {
  const { apiUrl } = useAPI()
  const baseURL = `${apiUrl}/${resource}`
  let items = ref([])
  let params = ref('')
  let meta = reactive({
    page: ref(1),
    limit: ref(10),
    total: ref(0),
    offset: ref(0),
    pageCount: ref(0),
    totalRecords: ref(0),
  })
  const addUser = async (fields) => {
    try {
      const { data, error } = await useFetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      })
      if (!error.value) {
        const user = JSON.parse(data.value)
        items.value.push(user)
        toastEm({ val: 'User created' })
        return user
      }
    } catch (error) {
      console.error({ error })
    }
  }
  onBeforeMount(async () => {
    const { data, error } = await useFetch(
      baseURL + `?page=${meta.page}&limit=${meta.limit}`
    )
    if (!error.value) {
      console.log({
        baseURL,
        gogogo: data.value,
      })
      const val = JSON.parse(data.value)
      Object.assign(meta, val.meta)
      items.value = val?.data
    }
  })
  async function saveEntity(id, fields) {
    try {
      const url = makeApiQueryString(baseURL + `/${id}  `, {})
      let { data, error } = await useFetch(url, {
        method: 'PUT',
        body: JSON.stringify(fields),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (error) {
      console.log({
        error,
      })
    }
  }
  const fetchWithFilterFields = async (fields) => {
    meta.page = 1
    const queryParams = new URLSearchParams(Object.entries(fields)).toString()
    params.value = queryParams

    const url = makeApiQueryString(
      apiUrl + `/${resource}?page=${meta.page}&limit=${meta.limit}`,
      fields
    )
    try {
      let { data, error } = await useFetch(url)
      if (!error.value) {
        const val = JSON.parse(data.value)
        meta.page = val.meta.page
        meta.totalRecords = val.meta.totalRecords
        Object.assign(meta, val.meta)
        items.value = val?.data
      } else {
        console.error('Error fetching items:', error.value)
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }
  const getPaginationString = (diff) => {
    let nextPage = meta.page + diff
    if (diff == -10) nextPage = 1
    if (diff == 10) nextPage = meta.pageCount
    return [
      `/${resource}?page=${nextPage}&limit=${meta.limit}${
        params.value ? '&' + params.value : ''
      }`,
      nextPage,
    ]
  }
  const fetchPage = async (diff) => {
    let [str, nextPage] = getPaginationString(diff)

    const url = makeApiQueryString(apiUrl + str, {})
    try {
      let { data, error } = await useFetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!error.value) {
        const val = JSON.parse(data.value)
        meta.page = nextPage
        Object.assign(meta, val.meta)
        items.value = val?.data
      } else {
        console.error('Error fetching items:', error.value)
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }
  const sort = (field, direction) => {
    if (direction === 'ASC') {
      items.value = items.value.sort((a, b) =>
        (a[field] ?? '') > (b[field] ?? '') ? 1 : -1
      )
    } else if (direction === 'DESC') {
      items.value = items.value.sort((a, b) =>
        (a[field] ?? '') > (b[field] ?? '') ? -1 : 1
      )
    }
  }
  return {
    items,
    sort,
    meta,
    addUser,
    fetchPage,
    saveEntity,
    fetchWithFilterFields,
  }
}
