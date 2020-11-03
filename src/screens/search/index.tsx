import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { PosterList } from '../../components'
import { fetchGenres } from '../../features/genres'
import { useTypedSelector } from '../../features/useTypedSelector'
import MoviesService from '../../services/MoviesService'
import { Genre } from '../../types'
import { Movie } from '../../types/Movie'
import { styles } from './styles'

interface ItemType {
  index: number
  item: Genre
}

const INVALID = -1
export const SearchScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  navigation.setOptions({
    headerTitle: '',
    headerTintColor: 'gray',
  })

  const [result, setResult] = useState(new Array<Movie>(0))
  const [genreId] = useState(0)
  const genres = useTypedSelector((state) => state.genres)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  useEffect(() => {
    if (genreId != INVALID) {
      void MoviesService.getMoviesByGenre(genreId).then((result) => setResult(result))
    }
  }, [genreId])

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  const renderGenreButton = ({ item, index }: ItemType) => {
    return (
      <TouchableOpacity style={styles.genreButton} key={index}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.root}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={genres.data}
        horizontal
        renderItem={renderGenreButton}
      />
      <ScrollView></ScrollView>
      <PosterList list={result} vertical disableLoading onPress={navigate} />
    </View>
  )
}
