import { Movie } from '../types/Movie'

export type RootStackParamList = {
  HomeScreen: { name: string }
  MovieDetailScreen: { name: string; item: Movie }
  SearchScreen: { query: string }
}
