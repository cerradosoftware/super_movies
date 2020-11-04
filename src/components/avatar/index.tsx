import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'

import { styles } from './styles'

export interface AvatarProps {
  imageUrl: string
  subtitle?: string
  title: string
}

export const Avatar: FunctionComponent<AvatarProps> = ({ imageUrl, subtitle, title }) => {
  return (
    <View testID="View_Avatar" style={styles.root}>
      <View style={styles.circle}>
        <Image borderRadius={25} style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <Text style={styles.character}>{title}</Text>
      <Text style={styles.name}>{subtitle}</Text>
    </View>
  )
}
