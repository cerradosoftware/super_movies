import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGenders, getMoviesByGenre } from '../../services/moviesService'
import { Movie, Genre } from '../../types'

type SliceState = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Genre> }
type SliceStateMovie = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Movie> }

export const fetchGenres = createAsyncThunk('genres/fetch', async () => {
  const genres = getGenders()
  return genres
})

export const fetchMoviesByGenre = createAsyncThunk('moviesByGenre/fetch', async (id: number) => {
  const genres = getMoviesByGenre(id)
  return genres
})

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
  initialState: { data: [], state: 'idle' } as SliceStateMovie,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesByGenre.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})
