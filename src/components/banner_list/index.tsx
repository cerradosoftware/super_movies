import React, { FunctionComponent } from 'react'
import { Text, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { Banner } from '../'
import { Movie } from '../../types/Movie'
import { IMAGE_BASE_URL } from '../../values/URLS'
import { Loader } from '../loader'
import { styles } from './styles'

interface BannerListProps {
  list: Array<Movie>
  title: string
  onPress: (item: Movie) => void
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
      url={`${IMAGE_BASE_URL}${item.backdrop_path}`}
      title={item.title}
      onPress={onPress}
    />
  )
}

export const BannerList: FunctionComponent<BannerListProps> = (props: BannerListProps) => {
  const { list, title, onPress } = props

  if (list && list.length > 0) {
    return (
      <>
        <Text style={styles.rowTitle}>{title}</Text>
        <Carousel
          autoplay
          loop
          data={list}
          renderItem={(item: ItemType) => renderItem(item, () => onPress(item.item))}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={320}
          activeSlideAlignment="start"
        />
      </>
    )
  } else {
    return <Loader />
  }
}
