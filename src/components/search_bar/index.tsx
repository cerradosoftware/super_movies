import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { TouchIcon } from '..'

import { styles } from './styles'

interface SearchBarProps {
  query: string
  onQueryChange: (text: string) => void
  onQuery?: () => void
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({ query, onQuery, onQueryChange }) => {
  return (
    <View style={styles.searchView}>
      <TextInput
        placeholder="Digite sua busca"
        style={styles.searchInput}
        onChangeText={onQueryChange}
        value={query}
      />
      <TouchIcon styles={styles.searchIcon} name="search" onPress={onQuery} />
    </View>
  )
}
