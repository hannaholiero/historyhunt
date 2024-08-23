import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from './firebaseConfig';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateHuntScreen from './src/screens/CreateHuntScreen';
import InvitePlayersScreen from './src/screens/InvitePlayersScreen';
import CreateHuntMapScreen from './src/screens/CreateHuntMapScreen';
import ConfirmHuntScreen from './src/screens/ConfirmHuntScreen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateHunt" component={CreateHuntScreen} />
      <Stack.Screen name="InvitePlayers" component={InvitePlayersScreen} />
      <Stack.Screen name="CreateHuntMap" component={CreateHuntMapScreen} />
      <Stack.Screen name="ConfirmHunt" component={ConfirmHuntScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
