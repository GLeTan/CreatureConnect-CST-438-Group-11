import React, { useContext, useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { GlobalContext } from './currentUser';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const handleToggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  // Logout function
  const handleLogout = () => {
    // Reset global state to initial values
    setGlobalVariable({
      user: null,
      isLoggedIn: false,
    });

    console.log(globalVariable.user);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.setting}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
      </View>

      {/* Placeholder button for additional settings */}
      <Button title="Reset Settings" onPress={() => {
        setIsDarkMode(false);
        setNotificationsEnabled(true);
        handleLogout();
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
