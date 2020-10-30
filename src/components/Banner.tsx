import React, { FunctionComponent } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface BannerProps {
  url: string
  title?: string
  poster?: boolean
  onPress?: () => void
  propsStyles?: ViewStyle
  width?: number
}

const Banner: FunctionComponent<BannerProps> = (props) => {
  const { url, title, poster, onPress, propsStyles, width } = props

  let widthCalc = width
  if (!width || width === 0) widthCalc = poster ? 110 : 320

  // const widthCalc = width > 0 ? width : poster ? 110 : 320;
  const ratio = poster ? 10 / 16 : 16 / 10

  const styles = StyleSheet.create({
    image: { width: widthCalc, aspectRatio: ratio },
    wrapper: {
      margin: 5,
      maxWidth: widthCalc,
    },
  })

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.wrapper, ...propsStyles }}>
      <Image borderRadius={5} style={styles.image} source={{ uri: url }} />
      {!poster && <Text>{title}</Text>}
    </TouchableOpacity>
  )
}

export default Banner
