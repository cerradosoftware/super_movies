import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { TouchIcon } from '../touch_icon'
import { styles } from './styles'

interface SearchBarProps {
  query: string
  onQueryChange: (text: string) => void
  onQuery?: () => void
  onCancel?: () => void
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  query,
  onQuery,
  onQueryChange,
  onCancel,
}) => {
  return (
    <View style={styles.searchView}>
      <TextInput
        placeholder="Digite sua busca"
        style={styles.searchInput}
        onChangeText={onQueryChange}
        value={query}
        onTouchCancel={onCancel}
        clearButtonMode="while-editing"
      />
      <TouchIcon styles={styles.searchIcon} name="search" onPress={onQuery} />
    </View>
  )
}
