import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Movie } from '../types/Movie'
import Banner from './Banner'
import { IMAGE_BASE_URL } from '../values/URLS'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'

interface BannerListProps {
  list: Array<Movie>
  title: string
}

interface ItemType {
  index: number
  item: Movie
}

const renderItem = (arrayItem: ItemType, onPress: () => void) => {
  const { item, index } = arrayItem
  return (
    <Banner
      key={index}
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url={`${IMAGE_BASE_URL}${item.backdrop_path}`}
      title={item.title}
      onPress={onPress}
    />
  )
}

const PosterList: FunctionComponent<BannerListProps> = (props: BannerListProps) => {
  const navigation = useNavigation()
  const { list, title } = props

  if (list && list.length > 0) {
    return (
      <>
        <Text style={styles.rowTitle}>{title}</Text>
        <Carousel
          autoplay
          loop
          data={list}
          renderItem={(item: ItemType) =>
            renderItem(item, () =>
              navigation.navigate('MovieDetailScreen', {
                item: item.item,
              }),
            )
          }
          sliderWidth={Dimensions.get('window').width}
          itemWidth={320}
          activeSlideAlignment="start"
        />
      </>
    )
  } else {
    return <ActivityIndicator size="large" color="#F99F00" />
  }
}

const styles = StyleSheet.create({
  rowTitle: {
    marginTop: 10,
    fontSize: 20,
    textTransform: 'uppercase',
  },
})

export default PosterList
