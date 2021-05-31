<template>
  <div class="w-full max-w-md p-2 bg-white rounded-2xl">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      >
        <span>{{ item.name }} -  Show details {{ isFavorite ? 'heart-icon' : '' }}</span>
        <ChevronUpIcon
          :class="open ? 'transform rotate-180' : ''"
          class="w-5 h-5 text-purple-500"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
        <button class="px-4 py-2 bg-purple-100 rounded text-black mb-4" @click="$emit('toggle-favorite', item)">
          {{ !isFavorite ? 'Set as Favorite heart-icon' : 'Remove from favorites :(' }}
        </button>
        <ul>
          <li>
            <p>Genres: {{ item.genres.join(' ') }}</p>
          </li>
          <li>
            <div v-html="item.summary"></div>
          </li>
        </ul>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
import type { PropType } from '@vue/runtime-core'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import type { Show } from '../types'

defineProps({
  item: {
    type: Object as PropType<Show>,
    required: true,
  },
  isFavorite: {
    type: Boolean,
  },
})
</script>
