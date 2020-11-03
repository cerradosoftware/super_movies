import React, { FunctionComponent } from 'react'
import { Text, FlatList, View } from 'react-native'

import { Banner } from '../banner'
import { Movie } from '../../types/Movie'
import { IMAGE_BASE_URL } from '../../values/URLS'
import { Loader } from '../loader'
import { styles } from './styles'

interface PosterListProps {
  list: Array<Movie>
  title?: string
  disableLoading?: boolean
  vertical?: boolean
  onPress: (item: Movie) => void
}

interface ItemType {
  index: number
  item: Movie
}

const renderItem = (arrayItem: ItemType, onPress: () => void) => {
  const { item } = arrayItem
  return (
    <Banner
      url={`${IMAGE_BASE_URL}${item.poster_path}`}
      title={item.title}
      poster
      onPress={onPress}
    />
  )
}

export const PosterList: FunctionComponent<PosterListProps> = ({
  list,
  title,
  disableLoading,
  vertical,
  onPress,
}) => {
  if (list && list.length > 0) {
    return (
      <View style={styles.resultView}>
        <Text style={styles.rowTitle}>{title}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={list}
          renderItem={(item) => renderItem(item, () => onPress(item.item))}
          keyExtractor={(item) => item.id.toString()}
          horizontal={!vertical}
          numColumns={vertical ? 3 : 1}
        />
      </View>
    )
  } else if (!disableLoading) {
    return <Loader />
  } else {
    return <></>
  }
}
