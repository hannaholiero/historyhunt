import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Lägg till denna rad
import { initializeApp } from './firebaseConfig';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateHuntScreen from './src/screens/CreateHuntScreen';
import InvitePlayersScreen from './src/screens/InvitePlayersScreen';
import CreateHuntMapScreen from './src/screens/CreateHuntMapScreen';
import ConfirmHuntScreen from './src/screens/ConfirmHuntScreen';
import InGameScreen from './src/screens/InGameScreen';
import PhotoScreen from './src/screens/PhotoScreen';
import FinishedHuntScreen from './src/screens/FinishedHuntScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  // Lägg till denna useEffect för att rensa AsyncStorage vid uppstart
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };
    clearStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateHunt" component={CreateHuntScreen} />
        <Stack.Screen name="InvitePlayers" component={InvitePlayersScreen} />
        <Stack.Screen name="CreateHuntMap" component={CreateHuntMapScreen} />
        <Stack.Screen name="ConfirmHunt" component={ConfirmHuntScreen} />
        <Stack.Screen name="InGame" component={InGameScreen} />
        <Stack.Screen name="TakePhoto" component={PhotoScreen} />
        <Stack.Screen name="FinishedHunt" component={FinishedHuntScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
