import 'react-native-gesture-handler'
import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-native'

import { rootStore } from './src/features/rootReducer'
import RootNavigator from './src/navigation/RootNavigator'

const App: FunctionComponent = () => {
  return (
    <Provider store={rootStore}>
      <RootNavigator />
    </Provider>
  )
}

export default App
