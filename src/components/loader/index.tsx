import LottieView from 'lottie-react-native'
import React, { FunctionComponent } from 'react'

export const Loader: FunctionComponent = () => {
  return <LottieView source={require('../../assets/loading.json')} autoPlay loop />
}
