import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/main';
import Login from './pages/login';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{
          title: 'LOGIN',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#8E44AD'
          },
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="main" component={Main} options={{
          title: 'GEOLOCALIZAÇÃO',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#8E44AD'
          },
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          }

        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
