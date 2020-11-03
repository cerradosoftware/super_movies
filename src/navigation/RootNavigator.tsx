import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StatusBar } from 'react-native'

import { HomeScreen, MovieDetailScreen, GenresScreen } from '../screens/'
import { RootStackParamList } from './NavigationTypes'

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator: FunctionComponent = () => {
  return (
    <>
      <StatusBar backgroundColor="#E0E0E0" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleStyle: {
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 8,
            },
          }}>
          <Stack.Screen
            options={{ headerShown: false, title: '' }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
          <Stack.Screen name="SearchScreen" component={GenresScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default RootNavigator
