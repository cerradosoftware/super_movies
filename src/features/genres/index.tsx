import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import MoviesService from '../../services/MoviesService'
import { Genre } from '../../types/Genre'

type SliceState = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Genre> }

export const fetchGenres = createAsyncThunk('genres/fetch', async () => {
  const genres = await MoviesService.getGenders()
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

export const { reducer, actions } = genreSlice
