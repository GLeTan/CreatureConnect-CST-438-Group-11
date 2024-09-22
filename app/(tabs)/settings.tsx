import React, { useContext, useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, useColorScheme } from 'react-native';
import { GlobalContext } from './currentUser';
import { useNavigation } from 'expo-router';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { logout } = React.useContext(GlobalContext); // Access the logout function
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme();

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  // Logout function
  const handleLogout = () => {
    logout(); // Call the logout function to reset the global state
    navigation.navigate('Login'); // Navigate to the login screen
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkTitle : styles.lightTitle}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.setting}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
      </View>


      <Button title="Log Out" onPress={() => {
        handleLogout();
        
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  lightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  lightText: {
    fontSize: 18,
    color: '#000',
  },
  darkText: {
    fontSize: 18,
    color: '#fff',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
