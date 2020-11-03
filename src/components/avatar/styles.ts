import { StyleSheet } from 'react-native'

const size = 75

export const styles = StyleSheet.create({
  root: {
    margin: 5,
    alignItems: 'center',
  },
  circle: {
    width: size,
    height: size,
    borderWidth: 2,
    borderRadius: size / 2,
    margin: 5,
  },
  image: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  character: {
    fontSize: 12,
  },
  name: {
    fontSize: 10,
  },
})
