<template>
  <main class="container mx-auto mt-4">
    <div class="prose mb-12">
      <h1>MazeTV Api Example.</h1>
    </div>

    <Search @selectItem="selectItem" />

    <article class="mt-4" v-if="clickedItem">
      <ShowItemDetails :item="clickedItem" :is-favorite="isItemFavoriteById(clickedItem.id)" @toggleFavorite="toggleFavorite" ></ShowItemDetails>
    </article>

    <!-- Favorites -->
    <div class="mt-10 prose text-left">
      <h3>Favorites:</h3>
      <ol v-if="favorites.length">
        <li v-for="{name} in favorites">{{ name }}</li>
      </ol>
      <p v-else>Empty :c <br> Add some! :></p>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import Search from './components/Search.vue'
import ShowItemDetails from './components/ShowItemDetails.vue'
import { useStorage } from '@vueuse/core'
import type { Show } from './types'


const clickedItem = ref<Show>()
// const favorites = ref<Show[]>([]) 
// Should save items in cache
// Should only save ids in favorite and link id to cached item. Also fetch all favorites on load
const favorites = useStorage<Show[]>('favorites', [])

function selectItem(item: Show) {
  clickedItem.value = item;
  searchString.value = ''
}

function isItemFavoriteById(itemId: number) {
  return favorites.value.some(({id}) => id === itemId)
}

function toggleFavorite(item: Show) {
  if (!isItemFavoriteById(item.id)) {
    favorites.value.push(item)
  } else {
    favorites.value = favorites.value.filter(({id}) => id !== item.id)
  }
}
</script>