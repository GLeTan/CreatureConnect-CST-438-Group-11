import React, { useState } from 'react';

import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as SQLite from 'expo-sqlite';
import { checkUserByUsername, insertUserData, logUserByUsername, openDatabase, openUserTable } from '../database/userDB';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);


  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const handleToggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  const handleSignup = () => {
    if (!name || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Implement signup logic here, e.g., create user account
    const database = openDatabase();
    openUserTable(database);
    checkUsername(database);
    // logUserByUsername(database, username);

     
  };

  const checkUsername = async (database: Promise<SQLite.SQLiteDatabase | null>) => {
    // Check that username is not already taken
    const newName = await checkUserByUsername(database, username);

    if (newName) {
      Alert.alert('Error', 'Username already exist');
      return;
    } else {
      insertUserData(database, username, password);
      logUserByUsername(database, username);
      Alert.alert('Success', 'Signup successful!');
    }
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
