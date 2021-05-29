import { ref } from '@vue/reactivity'
import { search } from '../plugins/axios'
import type { SearchShow } from '../types'
import { debouncedWatch } from '@vueuse/core'


export default function useSearch () {
  const options = ref<SearchShow[] | undefined>(undefined)
  const searchString = ref('')
  const isLoading = ref(false)

  function setSearchString(e: Event & { target: HTMLInputElement }) {
    isLoading.value = true
    searchString.value = e.target.value
  }

  async function searchShow(newSearchValue: string) {
    isLoading.value = true
    
    try {
      const resp = await search(newSearchValue)
      options.value = resp.data

    } catch (error) {
      console.log("🚀 ~ file: Search.vue ~ line 32 ~ searchShow ~ error", error)
    } finally {
      isLoading.value = false
    }
  }

  debouncedWatch(searchString, (newSearchValue) => searchShow(newSearchValue), { debounce: 200 })

  return {
    searchString,
    options,
    isLoading,
    setSearchString
  }
}