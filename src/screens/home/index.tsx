import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { TouchIcon, PosterList, BannerList, Loader, Screen, SearchBar } from '../../components'
import { fetchCinema, fetchQuery, fetchStreaming, fetchUpcoming } from '../../features/movies'
import { useTypedSelector } from '../../features/useTypedSelector'
import { Movie } from '../../types'
import { styles } from './styles'

export const HomeScreen: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const streaming = useTypedSelector((state) => state.streaming)
  const upcoming = useTypedSelector((state) => state.upcoming)
  const cinema = useTypedSelector((state) => state.cinema)
  const queryResult = useTypedSelector((state) => state.query)
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(fetchCinema())
    dispatch(fetchStreaming())
    dispatch(fetchUpcoming())
  }, [])

  if (
    streaming.state == 'loading' ||
    upcoming.state == 'loading' ||
    cinema.state == 'loading' ||
    queryResult.state == 'loading'
  ) {
    return (
      <View style={styles.rootLoading}>
        <Loader />
      </View>
    )
  }

  const RenderContent = () => {
    if (queryResult.data.length > 0 && query.length > 0) {
      return <PosterList list={queryResult.data} vertical disableLoading onPress={navigate} />
    } else {
      return (
        <ScrollView style={styles.root}>
          <BannerList list={cinema.data} title="Cinema" onPress={navigate} />
          <PosterList list={streaming.data} title="streaming" onPress={navigate} />
          <PosterList list={upcoming.data} title="upcoming" onPress={navigate} />
        </ScrollView>
      )
    }
  }

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  const doQuery = () => {
    if (query.length < 3) {
      Alert.alert('Busca', 'Insira ao menos 3 caracteres para a busca.')
      return
    }
    dispatch(fetchQuery(query))
  }
  return (
    <Screen safe>
      <View style={styles.header}>
        <TouchIcon
          name={'bars'}
          color={'black'}
          onPress={() => navigation.navigate('SearchScreen')}
        />
        <SearchBar
          onQueryChange={(text) => {
            setQuery(text)
          }}
          query={query}
          onQuery={doQuery}
          onCancel={() => setQuery('')}
        />
      </View>
      {RenderContent()}
    </Screen>
  )
}
