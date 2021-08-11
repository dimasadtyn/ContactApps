import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/Screens/HomeScreen';
import DetailContactScreen from './src/Screens/DetailContactScreen';
import AddContactScreen from './src/Screens/AddContactScreen';
import EditContactScreen from './src/Screens/EditContactScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown : false,
            gestureEnabled : false
          }}
        />
        <Stack.Screen 
          name="AddContact" 
          component={AddContactScreen}
          options={{
            headerShown : false,
            gestureEnabled : false
          }}
        />
        <Stack.Screen 
          name="DetailContact" 
          component={DetailContactScreen}
          options={{
            headerShown : false,
            gestureEnabled : false
          }}
        />
        <Stack.Screen 
          name="EditContact" 
          component={EditContactScreen}
          options={{
            headerShown : false,
            gestureEnabled : false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}