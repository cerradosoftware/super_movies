import axios from 'axios'

import { MOVIEDB_APIKEY } from '../values/config'
import { BASE_URL, LANG } from '../values/URLS'

export const movieClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: MOVIEDB_APIKEY,
    language: LANG,
    include_adult: 'false',
    include_video: true,
    region: 'BR',
  },
})

export const videoClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: MOVIEDB_APIKEY,
    language: LANG,
    site: 'YouTube',
  },
})

export const basicClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: MOVIEDB_APIKEY,
  },
})
