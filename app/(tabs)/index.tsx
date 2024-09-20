import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/views/LoginScreen';
import HomeScreen from '../src/views/Home';
import Animals from '../src/views/Animals';
import Favorites from '../src/views/Favorites';
import Search from '../src/views/Search';
import SignupScreen from '../src/views/SignupScreen'; // Update here

const Stack = createStackNavigator();

import { openDatabase, openUserTable, insertUserData, deleteUserData, logUserData } from '@/app/database/userDB';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { GlobalContext, GlobalProvider } from './currentUser';
import SignupScreen from './explore';



export default function App() {
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const { isLoggedIn } = globalVariable; // Check the login state from the global state

  return (
    <GlobalProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Animals" component={Animals} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

