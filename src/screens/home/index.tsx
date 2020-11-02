import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { TouchIcon, PosterList, BannerList, Loader } from '../../components'
import { fetchCinema, fetchStreaming, fetchUpcoming } from '../../features/movies'
import { useTypedSelector } from '../../features/useTypedSelector'
import { Movie } from '../../types'
import { styles } from './styles'

export const HomeScreen: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const streaming = useTypedSelector((state) => state.streaming)
  const upcoming = useTypedSelector((state) => state.upcoming)
  const cinema = useTypedSelector((state) => state.cinema)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <TouchIcon
          name={'search'}
          color={'black'}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      ),
      headerTransparent: true,

      headerLeft: () => (
        <Image source={require('../../assets/icon.png')} resizeMode="contain" style={styles.icon} />
      ),
      headerLeftContainerStyle: {
        left: 20,
      },
      headerRightContainerStyle: {
        right: 20,
      },
    })
  }, [])

  useEffect(() => {
    dispatch(fetchCinema())
    dispatch(fetchStreaming())
    dispatch(fetchUpcoming())
  }, [])

  if (streaming.state == 'loading' || upcoming.state == 'loading' || cinema.state == 'loading') {
    return (
      <View style={styles.rootLoaging}>
        <Loader />
      </View>
    )
  }

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  return (
    <ScrollView style={styles.root}>
      <BannerList list={cinema.data} title="Cinema" onPress={navigate} />
      <PosterList list={streaming.data} title="streaming" onPress={navigate} />
      <PosterList list={upcoming.data} title="upcoming" onPress={navigate} />
    </ScrollView>
  )
}
