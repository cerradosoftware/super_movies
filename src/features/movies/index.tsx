import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRecent } from '../../services/MoviesService'
import { Movie } from '../../types/'

type SliceState = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Movie> }

export const fetchStreaming = createAsyncThunk('genres/fetch', async () => {
  const movies = getRecent()
  return movies
})

export const moviesSlice = createSlice({
  name: 'movies',
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

export const { reducer, actions } = moviesSlice
