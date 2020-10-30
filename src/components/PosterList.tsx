import React, { FunctionComponent } from 'react'
import { Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { Movie } from '../types/Movie'
import Banner from './Banner'
import { IMAGE_BASE_URL } from '../values/URLS'
import { useNavigation } from '@react-navigation/native'

interface PosterListProps {
  list: Array<Movie>
  title?: string
  disableLoading?: boolean
  vertical?: boolean
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

const PosterList: FunctionComponent<PosterListProps> = (props) => {
  const navigation = useNavigation()
  const { list, title, disableLoading, vertical } = props

  if (list && list.length > 0) {
    return (
      <>
        <Text style={styles.rowTitle}>{title}</Text>
        <FlatList
          data={list}
          renderItem={(item) =>
            renderItem(item, () =>
              navigation.navigate('MovieDetailScreen', {
                item: item.item,
              }),
            )
          }
          keyExtractor={(item) => item.id.toString()}
          horizontal={!vertical}
          numColumns={vertical ? 3 : 1}
        />
      </>
    )
  } else if (!disableLoading) {
    return <ActivityIndicator size="large" color="#F99F00" />
  } else {
    return <></>
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
