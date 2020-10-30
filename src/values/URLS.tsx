import { MOVIEDB_APIKEY } from './config'
export const BASE_URL = 'https://api.themoviedb.org/3'
export const LANG = 'pt-BR'
export const UPCAMING_URL = `${BASE_URL}/movie/upcoming?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
export const TRENDING_URL = `${BASE_URL}/trending/movie/day?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
export const NOW_URL = `${BASE_URL}/movie/now_playing?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
export const POPULAR_URL = `${BASE_URL}/movie/popular?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
export const GENDERS_URL = `${BASE_URL}/genre/movie/list?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
export const SIMILAR_URL = (id: number): string => {
  return `${BASE_URL}/movie/${id}/similar?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
}

export const VIDEOS_URL = (id: number): string => {
  return `${BASE_URL}/movie/${id}/videos?api_key=${MOVIEDB_APIKEY}&language=${LANG}$site=YouTube`
}

export const IMAGES_URL = (id: number): string => {
  return `${BASE_URL}/movie/${id}/images?api_key=${MOVIEDB_APIKEY}`
}

export const CREDITS_URL = (id: number): string => {
  return `${BASE_URL}/movie/${id}/credits?api_key=${MOVIEDB_APIKEY}&language=${LANG}`
}

export const SEARCH_URL = (query: string): string => {
  return `${BASE_URL}/search/movie?api_key=${MOVIEDB_APIKEY}&language=${LANG}&page=1&include_adult=false&query=${query}`
}

export const DISCOVER_GENRE_URL = (id: number): string => {
  return `${BASE_URL}/discover/movie/?api_key=${MOVIEDB_APIKEY}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${id}&language=${LANG}`
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'
