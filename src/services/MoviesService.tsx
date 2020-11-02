import axios from 'axios'
import moment from 'moment'

import { Genre } from '../types/Genre'
import { ImageType } from '../types/ImageType'
import { Movie } from '../types/Movie'
import { Video } from '../types/Video'
import {
  TRENDING_URL,
  NOW_URL,
  POPULAR_URL,
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

  static search = (query: string): Promise<Movie[]> =>
    new Promise((resolve, reject) => {
      axios
        .get(SEARCH_URL(query))
        .then((response) => resolve(response.data.results))
        .catch((err) => reject(err.message))
    })

  static getGenders = (): Promise<Genre[]> =>
    new Promise((resolve, reject) => {
      axios
        .get(GENDERS_URL)
        .then((response) => resolve(response.data.genres))
        .catch((err) => reject(err.message))
    })

  static getMoviesByGenre = (id: number): Promise<Movie[]> =>
    new Promise((resolve, reject) => {
      axios
        .get(DISCOVER_GENRE_URL(id))
        .then((response) => {
          const data = MoviesService.cleanResult(response.data.results)
          resolve(data)
        })
        .catch((err) => reject(err.message))
    })

  static getNow = (): Promise<Movie[]> => {
    return MoviesService.doRequestToArrayData(NOW_URL)
  }

  static getPopular(): Promise<Movie[]> {
    return MoviesService.doRequestToArrayData(POPULAR_URL)
  }

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
