import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getCinema, getRecent, getUpcoming, search } from '../../services/moviesService'
import { Movie } from '../../types/'

export type MovieSliceState = {
  state: 'loading' | 'idle' | 'finished' | 'error'
  data: Array<Movie>
  page: number
  total_pages?: number
}

export const fetchStreaming = createAsyncThunk('movies/streaming', async () => {
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

export const fetchQuery = createAsyncThunk('movies/query', async (query: string) => {
  const movies = search(query)
  return movies
})

export const streamingSlice = createSlice({
  name: 'streaming',
  initialState: { data: [], state: 'idle', page: 1 } as MovieSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStreaming.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchStreaming.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload.results]
      state.page = action.payload.page
      state.total_pages = action.payload.total_pages
    })
  },
})

export const upComingSlice = createSlice({
  name: 'upcoming',
  initialState: { data: [], state: 'idle', page: 1 } as MovieSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpcoming.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload.results]
      state.page = action.payload.page
      state.total_pages = action.payload.total_pages
    })
  },
})

export const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: { data: [], state: 'idle', page: 1 } as MovieSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinema.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchCinema.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload.results]
      state.page = action.payload.page
      state.total_pages = action.payload.total_pages
    })
  },
})

export const querySlice = createSlice({
  name: 'query',
  initialState: { data: [], state: 'idle', page: 1 } as MovieSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuery.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchQuery.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload.results]
      state.page = action.payload.page
      state.total_pages = action.payload.total_pages
    })
  },
})

export const { reducer, actions } = streamingSlice
