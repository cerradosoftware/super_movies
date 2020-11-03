import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles'

interface NoteCircleProps {
  note: number
}

export const NoteCircle: FunctionComponent<NoteCircleProps> = ({ note }) => {
  let color = 'green'

  if (note <= 4) {
    color = 'red'
  } else if (note <= 6) {
    color = 'yellow'
  }

  return (
    <View style={{ ...styles.noteCircle, borderColor: color }}>
      <Text style={styles.note}>{note}</Text>
    </View>
  )
}
