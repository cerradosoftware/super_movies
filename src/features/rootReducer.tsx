import { configureStore } from '@reduxjs/toolkit'
import { genreSlice } from './genres'
import { moviesSlice } from './movies'

export const rootStore = configureStore({
  reducer: {
    genres: genreSlice.reducer,
    movies: moviesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof rootStore.getState>
