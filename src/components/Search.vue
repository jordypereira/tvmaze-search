<template>
  <label for="search" class="mr-4">Search Shows</label>
  <input
    id="search"
    class="mx-auto"
    :value="searchString"
    type="search"
    name="search"
    autocomplete="off"
    @input="setSearchString"
  >
  <small v-if="error" class="block text-red-400">{{ error.message }}</small>
  <template v-else-if="options && options.length > 0">
    <RadioGroup class="max-w-250px">
      <RadioGroupLabel class="sr-only">
        Server size
      </RadioGroupLabel>
      <div class="rounded-lg shadow-md space-y-2">
        <RadioGroupOption
          v-for="{ show } in options"
          :key="show.name"
          v-slot="{ active, checked }"
          as="template"
          :value="show"
          @click="selectItem(show)"
          @keyup.enter="selectItem(show)"
          @keyup.space="selectItem(show)"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-offset-2 ring-offset-yellow-300 ring-white ring-opacity-60'
                : '',
              checked
                ? 'bg-blue-600 bg-opacity-75 text-white '
                : 'bg-white ',
            ]"
            class="relative flex px-5 py-4 cursor-pointer focus:outline-none"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel
                    as="p"
                    :class="checked ? 'text-white' : 'text-gray-900'"
                    class="font-medium"
                  >
                    {{ show.name }}
                  </RadioGroupLabel>
                </div>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </template>
  <div v-else-if="isLoading">
    Loading...
  </div>
  <div v-else-if="searchString">
    No results found
  </div>
</template>

<script lang="ts" setup="props, { emit }">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import { defineEmit } from '@vue/runtime-core'

import useSearch from '../composables/useSearch'
import type { Show } from '../types'

const { options, setSearchString, isLoading, searchString, error } = useSearch()

const emit = defineEmit(['select-item'])

function selectItem(item: Show) {
  emit('select-item', item)
  searchString.value = ''
}

</script>
