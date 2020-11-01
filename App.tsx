import 'react-native-gesture-handler'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import { Provider } from 'react-redux'
import { rootStore } from './src/features/rootReducer'

const App = () => {
  return (
    <Provider store={rootStore}>
      <RootNavigator />
    </Provider>
  )
}

export default App
