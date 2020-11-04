import moment from 'moment'

import { Cast, MoviesReponse } from '../types'
import { Genre } from '../types/Genre'
import { ImageType } from '../types/ImageType'
import { Movie } from '../types/Movie'
import { Video } from '../types/Video'
import { UPCOMING_URL, SEARCH_URL, GENDERS_URL, DISCOVER_MOVIE, MOVIE } from '../values/URLS'
import { basicClient, movieClient, videoClient } from './axiosConfig'

export const getCinema = (): Promise<MoviesReponse> => {
  const params = {
    'primary_release_date.gte': moment().subtract(1, 'month').format('YYYY-MM-DD'),
    with_release_type: 3,
  }
  return doRequestToArrayData(DISCOVER_MOVIE, params)
}

export const getRecent = (release_type: string): Promise<MoviesReponse> => {
  const params = {
    year: 2020,
    with_release_type: release_type,
  }
  return doRequestToArrayData(DISCOVER_MOVIE, params)
}

export const getUpcoming = (): Promise<MoviesReponse> => {
  return doRequestToArrayData(UPCOMING_URL)
}

export const getGenders = (): Promise<Genre[]> => {
  return new Promise((resolve, reject) => {
    movieClient
      .get(GENDERS_URL)
      .then((response) => resolve(response.data.genres))
      .catch((err) => reject(err.message))
  })
}

export const search = (query: string): Promise<MoviesReponse> => {
  const params = {
    query: query,
  }
  return doRequestToArrayData(SEARCH_URL, params)
}

export const getMoviesByGenre = (id: number, nextPage = 1): Promise<MoviesReponse> => {
  const params = {
    with_genres: id,
    sort_by: 'popularity.desc',
    page: nextPage > 0 ? nextPage : 1,
  }
  return doRequestToArrayData(DISCOVER_MOVIE, params)
}

export const getRelated = (id: number): Promise<MoviesReponse> => {
  return doRequestToArrayData(`${MOVIE}${id}/similar`)
}

export const getVideos = (id: number): Promise<Video[]> =>
  new Promise((resolve, reject) => {
    videoClient
      .get(`${MOVIE}${id}/videos`)
      .then((response) => resolve(response.data.results))
      .catch((err) => reject(err.message))
  })

export const getImages = (id: number): Promise<ImageType[]> =>
  new Promise((resolve, reject) => {
    basicClient
      .get(`${MOVIE}${id}/images`)
      .then((response) => resolve(response.data.backdrops))
      .catch((err) => reject(err.message))
  })

export const getCredits = (id: number): Promise<Cast[]> =>
  new Promise((resolve, reject) => {
    basicClient
      .get(`${MOVIE}${id}/credits`)
      .then((response) => resolve(response.data.cast))
      .catch((err) => reject(err.message))
  })

const doRequestToArrayData = (url: string, customParams = {}): Promise<MoviesReponse> => {
  return new Promise((resolve, reject) => {
    movieClient
      .get(url, { params: customParams })
      .then((response) => {
        response.data.results = cleanResult(response.data.results)

        resolve(response.data)
      })
      .catch((err) => reject(err.message))
  })
}

const cleanResult = (results: Array<Movie>) => {
  return results.filter((item: Movie) => {
    return item.overview && item.backdrop_path && item.poster_path
  })
}
