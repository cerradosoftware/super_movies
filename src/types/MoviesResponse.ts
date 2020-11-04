import { Movie } from './Movie'

export interface MoviesReponse {
  page: number
  results: Array<Movie>
  total_results: number
  total_pages: number
}
