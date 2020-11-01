import React, { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import BannerList from '../components/BannerList'
import { RootStackParamList } from '../navigation/NavigationTypes'
import { StackNavigationProp } from '@react-navigation/stack'
import TouchIcon from '../components/TouchIcon'
import { useTypedSelector } from '../features/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchStreaming } from '../features/movies'
import { View } from 'react-native'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>
type Props = {
  navigation: HomeScreenNavigationProp
}

export const Home: React.FunctionComponent<Props> = (props) => {
  props.navigation.setOptions({
    headerTitle: '',
    headerRight: () => (
      <TouchIcon name={'search'} onPress={() => props.navigation.navigate('SearchScreen')} />
    ),
    headerTransparent: true,

    headerLeft: () => <Image source={require('../assets/icon.png')} />,
    headerLeftContainerStyle: {
      left: 20,
    },
    headerRightContainerStyle: {
      right: 20,
    },
  })

  const { data } = useTypedSelector((state) => state.movies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStreaming())
  }, [])

  return (
    <View style={styles.root}>
      <BannerList list={data} title="streaming" />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginStart: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  rowTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
})

export default Home
