import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getCredits, getImages, getRelated, getVideos } from '../../services/moviesService'
import { Movie, ImageType, Video, Cast } from '../../types/'

type SliceStateMovie = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Movie> }
type SliceStateImage = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<ImageType> }
type SliceStateVideo = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Video> }
type SliceStateCast = { state: 'loading' | 'idle' | 'finished' | 'error'; data: Array<Cast> }

export const fetchRelated = createAsyncThunk('movies/related', async (id: number) => {
  const movies = getRelated(id)
  return movies
})

export const fetchVideos = createAsyncThunk('movies/images', async (id: number) => {
  const videos = getVideos(id)
  return videos
})

export const fetchImages = createAsyncThunk('movies/videos', async (id: number) => {
  const images = getImages(id)
  return images
})

export const fetchCast = createAsyncThunk('movies/videos', async (id: number) => {
  const images = getCredits(id)
  return images
})

export const relatedSlice = createSlice({
  name: 'related',
  initialState: { data: [], state: 'idle' } as SliceStateMovie,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRelated.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchRelated.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const movieImagesSlice = createSlice({
  name: 'movieImages',
  initialState: { data: [], state: 'idle' } as SliceStateImage,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const movieVideosSlice = createSlice({
  name: 'movieVideos',
  initialState: { data: [], state: 'idle' } as SliceStateVideo,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})

export const movieCastSlice = createSlice({
  name: 'movieCast',
  initialState: { data: [], state: 'idle' } as SliceStateCast,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCast.pending, (state) => {
      state.state = 'loading'
    })
    builder.addCase(fetchCast.fulfilled, (state, action) => {
      state.state = 'finished'
      state.data = [...action.payload]
    })
  },
})
