import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { getUpcomingEpisodes } from '../api/tv'
import { ShowEpisodes } from '../types'

export default function useFeed(ids: number[] | undefined = undefined) {
  const feedArray = ref<ShowEpisodes[][]>([])
  const feedArrayMap = ref<number[]>([])

  async function setFeedArray(ids: number[]) {
    const episodesPromise = ids.map(id => getUpcomingEpisodes(id))
    feedArrayMap.value = ids

    feedArray.value = await Promise.all(episodesPromise)
  }

  const feed = computed(() => {
    if (!feedArray.value.length)
      return []

    const episodes = feedArray.value.flat()

    return episodes.sort((a, b) => new Date(a.airstamp).getTime() - new Date(b.airstamp).getTime())
  })

  async function addShowToFeed(id: number) {
    const show = await getUpcomingEpisodes(id)
    feedArrayMap.value?.push(id)
    feedArray.value?.push(show)
  }

  async function removeShowFromFeed(id: number) {
    const showIndex = feedArrayMap.value.findIndex(value => value === id)
    if (showIndex !== -1) {
      feedArray.value = feedArray.value.slice(showIndex, 1)
      feedArrayMap.value = feedArrayMap.value.slice(showIndex, 1)
    }
  }

  function getShowIdByEpisodeId(id: number) {
    const index = feedArray.value.findIndex(a => a.some(show => show.id === id))
    return feedArrayMap.value[index]
  }

  ids && setFeedArray(ids)

  return {
    feed,
    addShowToFeed,
    removeShowFromFeed,
    getShowIdByEpisodeId,
  }
}
