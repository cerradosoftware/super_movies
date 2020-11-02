import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, FunctionComponent } from 'react'
import { StyleSheet, TextInput, View, Alert } from 'react-native'
import { useDispatch } from 'react-redux'

import { PosterList } from '../components'
import { TouchIcon } from '../components/'
import { fetchGenres } from '../features/genres'
import { useTypedSelector } from '../features/useTypedSelector'
import MoviesService from '../services/MoviesService'
import { Movie } from '../types/Movie'

const INVALID = -1
export const SearchScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  navigation.setOptions({
    headerTitle: '',
    headerTintColor: 'gray',
  })
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(new Array<Movie>(0))
  const [genreId, setGenreId] = useState(0)
  const { data } = useTypedSelector((state) => state.genres)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  useEffect(() => {
    if (genreId != INVALID) {
      void MoviesService.getMoviesByGenre(genreId).then((result) => setResult(result))
    }
  }, [genreId])

  const doQuery = () => {
    if (query.length < 3) {
      Alert.alert('Busca', 'Insira ao menos 3 caracteres para a busca.')
      return
    }
    setLoading(true)
    setGenreId(INVALID)
    void MoviesService.search(query).then((result) => {
      setResult(result)
      setLoading(false)
    })
  }

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  return (
    <View style={styles.root}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setQuery(text)}
          value={query}
        />
        <TouchIcon styles={styles.searchIcon} name="search" onPress={doQuery} />
      </View>
      <Picker
        selectedValue={genreId}
        style={styles.genres}
        onValueChange={(itemValue) => setGenreId(Number(itemValue))}>
        <Picker.Item label="Gênero" value={INVALID} />

        {data.map((item) => {
          return <Picker.Item key={item.id} label={item.name} value={item.id} />
        })}
      </Picker>
      <PosterList list={result} vertical disableLoading={!loading} onPress={navigate} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    margin: 20,
    top: 40,
  },
  searchView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
  },
  searchInput: {
    flex: 1,
  },
  genres: {
    marginTop: 20,
    width: 180,
    alignSelf: 'flex-end',
    right: 0,
  },
  genresItem: {
    marginVertical: 5,
  },
  genresText: {
    fontSize: 25,
  },
})

export default SearchScreen
