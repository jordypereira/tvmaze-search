
import axios from 'axios'
import { SearchShow, ShowEpisodes } from '../types'

const baseURL = 'https://api.tvmaze.com'

export const instance = axios.create(
  {
    baseURL,
  },
)

const searchURL = '/search/shows?q='
export const search = (q: string) => instance.get<SearchShow[]>(searchURL + q)

const episodesURL = (id: number) => `/shows/${id}/episodes`
export const getEpisodes = (id: number) => instance.get<ShowEpisodes[]>(episodesURL(id))

export async function getUpcomingEpisodes(id: number) {
  const resp = await getEpisodes(id)
  return resp.data.filter(({ airstamp }) => new Date(airstamp) > new Date())
}
