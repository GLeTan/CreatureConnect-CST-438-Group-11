import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons'; // Import icons for customization
import HomeScreen from '../src/views/Home';
import SettingsScreen from './settings';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Search from '../src/views/Search';
import Favorites from '../src/views/Favorites';

const Tab = createBottomTabNavigator();

// Bottom Tab Navigator (Only for logged-in users)
function TabNavigator() {
    const colorScheme = useColorScheme();
  
    return (
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Search" component={Search}
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Favorites" component={Favorites}
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

export default TabNavigator;
