import React, { FunctionComponent } from 'react'
import { ViewStyle, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  name: string
  size?: number
  color?: string
  onPress?: () => void
  styles?: ViewStyle
}

export const TouchIcon: FunctionComponent<Props> = (props: Props) => {
  const { name, size, color, onPress, styles } = props
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 20, ...styles }}>
      <Icon name={name} size={size || 20} color={color || '#999'} />
    </TouchableOpacity>
  )
}
