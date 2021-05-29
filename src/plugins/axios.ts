
import axios from 'axios'
import { SearchShow } from '../types'

const baseURL = 'http://api.tvmaze.com'

export const instance = axios.create(
  {
    baseURL
  }
)

const searchURL = '/search/shows?q='
export const search = (q: string) => instance.get<SearchShow[]>(searchURL + q)

