export const BASE_URL = 'https://api.themoviedb.org/3'
export const LANG = 'pt-BR'
export const UPCOMING_URL = '/movie/upcoming'
export const TRENDING_URL = '/trending/movie/day?'
export const NOW_URL = '/movie/now_playing'
export const POPULAR_URL = '/movie/popular'
export const GENDERS_URL = '/genre/movie/list'
export const DISCOVER_MOVIE = 'discover/movie'
export const SEARCH_URL = '/search/movie'
export const DISCOVER_GENRE_URL = '/discover/movie/'

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

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'
