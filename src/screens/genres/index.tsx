import { useNavigation } from '@react-navigation/native'
import React, { useEffect, FunctionComponent, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { Loader, PosterList, Screen } from '../../components'
import { fetchGenres, fetchMoviesByGenre } from '../../features/genres'
import { useTypedSelector } from '../../features/useTypedSelector'
import { Genre } from '../../types'
import { Movie } from '../../types/Movie'
import { styles } from './styles'

export const GenresScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  const genres = useTypedSelector((state) => state.genres)
  const movies = useTypedSelector((state) => state.moviesByGenre)
  const dispatch = useDispatch()
  const [selectedGenre, setSelectedGenre] = useState<Genre>()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedGenre?.name,
      headerTintColor: 'black',
      headerTitleStyle: {},
    })
  }, [selectedGenre])

  useEffect(() => {
    if (selectedGenre?.id) {
      dispatch(fetchMoviesByGenre({ id: selectedGenre.id, nextPage: 1 }))
    }
  }, [selectedGenre])

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  if (genres.state == 'loading') {
    return (
      <View style={styles.rootLoading}>
        <Loader />
      </View>
    )
  }

  const renderGenreButton = (item: Genre, index: number) => {
    return (
      <TouchableOpacity
        style={styles.genreButton}
        key={index}
        onPress={() => setSelectedGenre(item)}>
        <Text style={styles.genresText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Screen safe>
      <View style={styles.root}>
        <View>
          <ScrollView horizontal style={styles.genreList} showsHorizontalScrollIndicator={false}>
            {genres.data.map((item, index) => renderGenreButton(item, index))}
          </ScrollView>
        </View>
        <View>
          <PosterList
            list={movies.data}
            vertical
            disableLoading
            onPress={navigate}
            onEnd={() => {
              if (selectedGenre && movies.page < movies.total_pages) {
                dispatch(fetchMoviesByGenre({ id: selectedGenre.id, nextPage: movies.page + 1 }))
              }
            }}
          />
          {movies.state == 'loading' && (
            <View style={styles.smallLoading}>
              <Loader />
            </View>
          )}
        </View>
      </View>
    </Screen>
  )
}
