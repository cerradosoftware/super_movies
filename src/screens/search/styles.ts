import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    margin: 20,
    top: 25,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
  },
  searchInput: {
    flex: 1,
  },
  genreButton: {
    padding: 5,
    margin: 5,
    right: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
  },
  genresItem: {
    marginVertical: 5,
  },
  genresText: {
    fontSize: 25,
  },
})
