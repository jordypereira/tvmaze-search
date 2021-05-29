<template>
  <label for="search" class="mr-4">Search Shows</label>
  <input :value="searchString" type="search" name="search" id="search" @input="setSearchString" autocomplete="off">
  <template v-if="options && options.length > 0">
      <RadioGroup v-model="selected" class="max-w-250px mx-auto">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="rounded-lg shadow-md">
          <RadioGroupOption
            as="template"
            v-for="{ show } in options"
            :key="show.name"
            :value="show"
            v-slot="{ active, checked }"
            @click="selectItem(show)"
            @keyup.enter="selectItem(show)"
            @keyup.space="selectItem(show)"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60'
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
  <div v-else-if="isLoading">Loading...</div>
  <div v-else-if="searchString">No results found</div>
  <p class="mt-4" v-if="clickedItem">Selected show: {{ clickedItem.name }}</p>
</template>

<script lang="ts" setup>
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@headlessui/vue'
import { ref } from '@vue/reactivity'

import useSearch from '../composables/useSearch'
import type { Show } from '../types'

const selected = ref()
const clickedItem = ref()

function selectItem(item: Show) {
  clickedItem.value = item;
  searchString.value = ''
}

const { options, setSearchString, isLoading, searchString } = useSearch()
</script>