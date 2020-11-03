import { Dimensions, Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    bottom: 20,
  },
  backImage: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  poster: {
    position: 'absolute',
    top: 220,
    left: 20,
    width: 100,
    height: 150,
  },
  castList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    marginHorizontal: 16,
  },
  metadata: {
    alignSelf: 'flex-end',
    height: 60,
  },
  resume: {
    textAlign: 'justify',
    fontFamily: Platform.OS == 'android' ? 'sans-serif-light' : 'Avenir Next',
    paddingVertical: 10,
  },
  original: {
    marginVertical: 10,
    fontWeight: '500',
    fontSize: 18,
  },
  label: {
    marginTop: 10,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  video: {
    alignSelf: 'stretch',
    height: 200,
    marginBottom: 10,
  },
})
