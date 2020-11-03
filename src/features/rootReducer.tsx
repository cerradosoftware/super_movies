import { configureStore } from '@reduxjs/toolkit'

import { genreSlice, moviesByGenreSlice } from './genres'
import { movieCastSlice, movieImagesSlice, movieVideosSlice, relatedSlice } from './movie'
import { cinemaSlice, streamingSlice, upComingSlice, querySlice } from './movies'

export const rootStore = configureStore({
  reducer: {
    genres: genreSlice.reducer,
    streaming: streamingSlice.reducer,
    upcoming: upComingSlice.reducer,
    cinema: cinemaSlice.reducer,
    query: querySlice.reducer,
    moviesByGenre: moviesByGenreSlice.reducer,
    similar: relatedSlice.reducer,
    movieImages: movieImagesSlice.reducer,
    movieVideos: movieVideosSlice.reducer,
    movieCast: movieCastSlice.reducer,
  },
})

export type RootState = ReturnType<typeof rootStore.getState>
