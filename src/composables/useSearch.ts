import { ref } from '@vue/reactivity'
import { debouncedWatch } from '@vueuse/core'
import { AxiosError } from 'axios'
import { search } from '../api/tv'
import type { SearchShow } from '../types'

export default function useSearch() {
  const options = ref<SearchShow[] | undefined>(undefined)
  const searchString = ref('')
  const isLoading = ref(false)
  const error = ref<undefined | AxiosError>(undefined)

  function setSearchString(e: Event & { target: HTMLInputElement }) {
    isLoading.value = true
    searchString.value = e.target.value
  }

  async function searchShow(newSearchValue: string) {
    if (!newSearchValue) { options.value = undefined }
    else {
      isLoading.value = true
      error.value = undefined

      try {
        const resp = await search(newSearchValue)
        options.value = resp.data
      }
      catch (e) {
        error.value = e
      }
      finally {
        isLoading.value = false
      }
    }
  }

  debouncedWatch(searchString, newSearchValue => searchShow(newSearchValue), { debounce: 200 })

  return {
    searchString,
    options,
    isLoading,
    setSearchString,
    error,
  }
}
