import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getCinema, getRecent, getUpcoming } from '../../services/MoviesService'
import { Movie } from '../../types/'

type SliceState = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Movie> }

export const fetchStreaming = createAsyncThunk('movies/straming', async () => {
  const movies = getRecent('4')
  return movies
})

export const fetchUpcoming = createAsyncThunk('movies/upcoming', async () => {
  const movies = getUpcoming()
  return movies
})

export const fetchCinema = createAsyncThunk('movies/cinema', async () => {
  const movies = getCinema()
  return movies
})

export const streamingSlice = createSlice({
  name: 'streaming',
  initialState: { data: [], state: 'idle' } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStreaming.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchStreaming.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const upComingSlice = createSlice({
  name: 'upcoming',
  initialState: { data: [], state: 'idle' } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpcoming.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: { data: [], state: 'idle' } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinema.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchCinema.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const { reducer, actions } = streamingSlice
