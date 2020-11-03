import { useNavigation } from '@react-navigation/native'
import React, { useEffect, FunctionComponent } from 'react'
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: 'gray',
    })
  }, [])

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  if (genres.state == 'loading' || movies.state == 'loading') {
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
        onPress={() => dispatch(fetchMoviesByGenre(item.id))}>
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
          <PosterList list={movies.data} vertical disableLoading onPress={navigate} />
        </View>
      </View>
    </Screen>
  )
}
