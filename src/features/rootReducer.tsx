import { configureStore } from '@reduxjs/toolkit'
import { genreSlice } from './genres'

export const rootStore = configureStore({
  reducer: {
    genres: genreSlice.reducer,
  },
})
