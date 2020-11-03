import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './styles'

interface ScreenProps {
  safe: boolean
  children: Element[] | Element
}

export const Screen: FunctionComponent<ScreenProps> = ({ safe, children }) => {
  if (safe) {
    return <SafeAreaView style={styles.root}>{children}</SafeAreaView>
  } else {
    return <View>{children}</View>
  }
}
