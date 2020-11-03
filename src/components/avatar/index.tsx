import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'

import { Cast } from '../../types'
import { IMAGE_BASE_URL } from '../../values/URLS'
import { styles } from './styles'

interface AvatarProps {
  item: Cast
}

export const Avatar: FunctionComponent<AvatarProps> = ({ item }) => {
  return (
    <View style={styles.root}>
      <View style={styles.circle}>
        <Image
          borderRadius={25}
          style={styles.image}
          source={{ uri: `${IMAGE_BASE_URL}${item.profile_path}` }}
        />
      </View>
      <Text style={styles.character}>{item.character}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  )
}
