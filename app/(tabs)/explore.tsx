import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Alert, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as SQLite from 'expo-sqlite';
import { checkUserByUsername, insertUserData, logUserByUsername, openDatabase, openUserTable } from '../database/userDB';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign Up</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
