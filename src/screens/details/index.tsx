import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React, { useState, useEffect, FunctionComponent } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import ImageView from 'react-native-image-viewing'
import YouTube from 'react-native-youtube'
import { useDispatch } from 'react-redux'

import { PosterList, Banner } from '../../components'
import { Avatar } from '../../components/avatar'
import { NoteCircle } from '../../components/noteCircle'
import { fetchCast, fetchImages, fetchRelated, fetchVideos } from '../../features/movie'
import { useTypedSelector } from '../../features/useTypedSelector'
import { RootStackParamList } from '../../navigation/NavigationTypes'
import { Movie } from '../../types'
import { YOUTUBE_KEY } from '../../values/config'
import { IMAGE_BASE_URL } from '../../values/URLS'
import { styles } from './styles'

type MovieDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetailScreen'>
type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetailScreen'>

type Props = {
  navigation: MovieDetailScreenNavigationProp
  route: MovieDetailScreenRouteProp
}

export const MovieDetailScreen: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute<MovieDetailScreenRouteProp>()
  const { item } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.setOptions({ headerTitle: item.title })
  }, [item])

  const similar = useTypedSelector((state) => state.similar)
  const videos = useTypedSelector((state) => state.movieVideos)
  const images = useTypedSelector((state) => state.movieImages)
  const cast = useTypedSelector((state) => state.movieCast)

  const [showImages, setShowImages] = useState(false)

  useEffect(() => {
    dispatch(fetchRelated(item.id))
    dispatch(fetchVideos(item.id))
    dispatch(fetchImages(item.id))
    dispatch(fetchCast(item.id))
  }, [item])

  const onBannerPress = () => {
    if (images.data.length > 0) setShowImages(true)
  }

  const navigate = (item: Movie) => {
    navigation.navigate('MovieDetailScreen', {
      item: item,
    })
  }

  return (
    <>
      <ScrollView style={styles.root}>
        <Image
          style={styles.backImage}
          source={{ uri: `${IMAGE_BASE_URL}${item.backdrop_path}` }}
        />
        <Banner
          propsStyles={styles.poster}
          poster
          url={`${IMAGE_BASE_URL}${item.poster_path}`}
          onPress={() => onBannerPress()}
        />
        <View style={styles.content}>
          <View style={styles.metadata}>
            {!!item.vote_average && <NoteCircle note={item.vote_average} />}
          </View>
          <Text style={styles.original}>Titulo Original:{item.original_title}</Text>
          <Text>{moment(item.release_date).format('DD/MM/YYYY')}</Text>
          <Text style={styles.resume}>{item.overview}</Text>
          <PosterList
            disableLoading
            list={similar.data}
            title="Titulos Relacionados"
            onPress={navigate}
          />
          <Text style={styles.label}>Trailer</Text>
          <YouTube videoId={videos.data[0]?.key} apiKey={YOUTUBE_KEY} style={styles.video} />
          <Text style={styles.label}>Cast</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.castList}>
            {cast.data.map((item, index) => (
              <Avatar key={index} item={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <ImageView
        images={images.data.map((img) => {
          return {
            uri: `${IMAGE_BASE_URL}${img.file_path}`,
          }
        })}
        imageIndex={0}
        visible={showImages}
        onRequestClose={() => setShowImages(false)}
      />
    </>
  )
}
