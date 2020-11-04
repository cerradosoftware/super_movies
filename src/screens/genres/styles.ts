import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    margin: 8,
    top: 25,
  },
  rootLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  genreButton: {
    padding: 5,
    margin: 5,
    right: 0,
    borderColor: 'gray',
    borderWidth: 0.75,
    borderRadius: 50,
  },
  genresItem: {
    marginVertical: 5,
  },
  genresText: {
    fontSize: 16,
  },
  genreList: {
    marginTop: 10,
  },
  smallLoading: { height: 50, width: 50, marginBottom: 50, alignSelf: 'center' },
})
