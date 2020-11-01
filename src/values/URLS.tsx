export const BASE_URL = 'https://api.themoviedb.org/3'
export const LANG = 'pt-BR'
export const UPCAMING_URL = '/movie/upcoming'
export const TRENDING_URL = '/trending/movie/day?'
export const NOW_URL = '/movie/now_playing'
export const POPULAR_URL = '/movie/popular'
export const GENDERS_URL = '/genre/movie/list'
export const DISCOVER_MOVIE = 'discover/movie'

export const SIMILAR_URL = (id: number): string => {
  return `/movie/${id}/similar`
}

export const VIDEOS_URL = (id: number): string => {
  return `/movie/${id}/videos?$site=YouTube`
}

export const IMAGES_URL = (id: number): string => {
  return `/movie/${id}/images`
}

export const CREDITS_URL = (id: number): string => {
  return `/movie/${id}/credits`
}

export const SEARCH_URL = (query: string): string => {
  return `/search/movie?&page=1&include_adult=false&query=${query}`
}

export const DISCOVER_GENRE_URL = (id: number): string => {
  return `/discover/movie/?&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${id}`
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'
