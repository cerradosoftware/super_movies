import { configureStore } from '@reduxjs/toolkit'

import { genreSlice } from './genres'
import { cinemaSlice, streamingSlice, upComingSlice, querySlice } from './movies'

export const rootStore = configureStore({
  reducer: {
    genres: genreSlice.reducer,
    streaming: streamingSlice.reducer,
    upcoming: upComingSlice.reducer,
    cinema: cinemaSlice.reducer,
    query: querySlice.reducer,
  },
})

export type RootState = ReturnType<typeof rootStore.getState>
