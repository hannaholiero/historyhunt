import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import StartScreen from './src/screens/StartScreen';
import * as Font from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Förhindra att splashscreen göms medan vi laddar resurser
        await SplashScreen.preventAutoHideAsync();

        // Ladda nödvändiga resurser (t.ex. fonter)
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_700Bold,
        });
      } catch (error) {
        console.warn('Error loading resources:', error);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null; // Returnera null tills appen är redo för att förhindra rendering
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }} // Göm headern för startskärmen
        />

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
