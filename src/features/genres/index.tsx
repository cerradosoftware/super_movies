import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGenders, getMoviesByGenre } from '../../services/moviesService'
import { Genre } from '../../types'
import { MovieSliceState } from '../movies'

type SliceState = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Genre> }
type DispachParams = { id: number; nextPage: number }

export const fetchGenres = createAsyncThunk('genres/fetch', async () => {
  const genres = getGenders()
  return genres
})

export const fetchMoviesByGenre = createAsyncThunk(
  'moviesByGenre/fetch',
  async ({ id, nextPage }: DispachParams) => {
    const genres = getMoviesByGenre(id, nextPage)
    return genres
  },
)

export const genreSlice = createSlice({
  name: 'genres',
  initialState: { data: [], state: 'idle' } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const moviesByGenreSlice = createSlice({
  name: 'moviesByGenre',
  initialState: { data: [], state: 'idle', page: 1 } as MovieSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesByGenre.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.state = 'finished'
      if (action.payload.page > state.page) {
        state.data = [...state.data.concat(action.payload.results)]
      } else {
        state.data = [...action.payload.results]
      }
      state.page = action.payload.page
      state.total_pages = action.payload.total_pages
    })
  },
})
