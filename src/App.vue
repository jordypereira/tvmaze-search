<template>
  <main class="container mx-auto mt-4">
    <div class="prose mb-12">
      <h1>MazeTV Api Example.</h1>
    </div>

    <Search @selectItem="selectItem" />

    <article v-if="selectedItem" class="mt-4">
      <ShowItemDetails :item="selectedItem" :is-favorite="isItemFavoriteById(selectedItem.id)" @toggleFavorite="toggleFavorite"></ShowItemDetails>
    </article>

    <!-- Favorites -->
    <div class="mt-10 prose text-left">
      <h3>Favorites:</h3>
      <ul v-if="favorites.length">
        <li v-for="item in favorites" :key="item.id" class="grid grid-cols-2 gap-2">
          <div class="!mt-0">
            {{ item.name }}
          </div>
          <button class="bg-red-400 hover:bg-red-600 text-white w-24 rounded" @click="toggleFavorite(item)">
            Remove
          </button>
        </li>
      </ul>
      <p v-else>
        Empty :c <br> Add some! :>
      </p>
    </div>

    <!-- Feed -->
    <!-- Move into own component when it getss too large or needs to be reused -->
    <div class="prose">
      <h2>Upcoming shows</h2>
      <ol v-if="feed && feed.length">
        <li v-for="{name, id} in feed" :key="id">
          {{ getShowFromFavoritesById(id)?.name }} - {{ name }}
        </li>
      </ol>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { useStorage } from '@vueuse/core'
import Search from './components/Search.vue'
import ShowItemDetails from './components/ShowItemDetails.vue'
import useFeed from './composables/useFeed'
import type { Show } from './types'

const selectedItem = ref<Show>()
// const favorites = ref<Show[]>([])
// Should save items in cache
// Should only save ids in favorite and link id to cached item. Also fetch all favorites on load
const favorites = useStorage<Show[]>('favorites', [])
const { feed, addShowToFeed, removeShowFromFeed, getShowIdByEpisodeId } = useFeed(favorites.value.map(({ id }) => id))

function selectItem(item: Show) {
  selectedItem.value = item
}

function isItemFavoriteById(itemId: number) {
  return favorites.value.some(({ id }) => id === itemId)
}

function toggleFavorite(item: Show) {
  if (!isItemFavoriteById(item.id)) {
    favorites.value.push(item)
    addShowToFeed(item.id)
  }
  else {
    favorites.value = favorites.value.filter(({ id }) => id !== item.id)
    removeShowFromFeed(item.id)
  }
}

function getShowFromFavoritesById(id: number) {
  return favorites.value.find(f => f.id === getShowIdByEpisodeId(id))
}
</script>
