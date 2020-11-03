import axios from 'axios'
import moment from 'moment'

import { Genre } from '../types/Genre'
import { ImageType } from '../types/ImageType'
import { Movie } from '../types/Movie'
import { Video } from '../types/Video'
import {
  TRENDING_URL,
  UPCOMING_URL,
  SIMILAR_URL,
  SEARCH_URL,
  GENDERS_URL,
  DISCOVER_GENRE_URL,
  VIDEOS_URL,
  IMAGES_URL,
  DISCOVER_MOVIE,
} from '../values/URLS'
import { movieClient } from './axiosConfig'

movieClient.interceptors.request.use((request) => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

export const getCinema = (): Promise<Movie[]> => {
  const params = {
    'primary_release_date.gte': moment().subtract(1, 'month').format('YYYY-MM-DD'),
    with_release_type: 3,
  }
  return doRequestToArrayData(DISCOVER_MOVIE, params)
}

export const getRecent = (release_type: string): Promise<Movie[]> => {
  const params = {
    year: 2020,
    with_release_type: release_type,
  }
  return doRequestToArrayData(DISCOVER_MOVIE, params)
}

export const getUpcoming = (): Promise<Movie[]> => {
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

export const search = (query: string): Promise<Movie[]> => {
  const params = {
    query: query,
  }
  return doRequestToArrayData(SEARCH_URL, params)
}

export const getMoviesByGenre = (id: number): Promise<Movie[]> => {
  const params = {
    with_genres: id,
    sort_by: 'popularity.desc',
  }
  return doRequestToArrayData(DISCOVER_GENRE_URL, params)
}

const doRequestToArrayData = (url: string, customParams = {}): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    movieClient
      .get(url, { params: customParams })
      .then((response) => {
        const data = cleanResult(response.data.results)
        resolve(data.slice(0, 10))
      })
      .catch((err) => reject(err.message))
  })
}

const cleanResult = (results: Array<Movie>) => {
  return results.filter((item: Movie) => {
    return item.overview && item.backdrop_path && item.poster_path
  })
}

class MoviesService {
  static getUpcaming = (): Promise<Movie[]> => {
    return MoviesService.doRequestToArrayData(UPCOMING_URL)
  }

  static getTrending = (): Promise<Movie[]> => {
    return MoviesService.doRequestToArrayData(TRENDING_URL)
  }

  static getRelated = (id: number): Promise<Movie[]> => {
    return MoviesService.doRequestToArrayData(SIMILAR_URL(id))
  }

  static getVideos = (id: number): Promise<Video[]> =>
    new Promise((resolve, reject) => {
      axios
        .get(VIDEOS_URL(id))
        .then((response) => resolve(response.data.results))
        .catch((err) => reject(err.message))
    })

  static getImages = (id: number): Promise<ImageType> =>
    new Promise((resolve, reject) => {
      axios
        .get(IMAGES_URL(id))
        .then((response) => resolve(response.data.backdrops))
        .catch((err) => reject(err.message))
    })

  static doRequestToArrayData = (url: string): Promise<Movie[]> =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          const data = MoviesService.cleanResult(response.data.results)
          resolve(data.slice(0, 10))
        })
        .catch((err) => reject(err.message))
    })

  private static cleanResult(results: Array<Movie>) {
    return results.filter((item: Movie) => {
      return item.overview && item.backdrop_path && item.poster_path
    })
  }
}

export default MoviesService
