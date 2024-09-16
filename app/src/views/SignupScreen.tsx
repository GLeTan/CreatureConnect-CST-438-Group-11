import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Alert, View, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import * as SQLite from 'expo-sqlite';
import { checkUserByUsername, insertUserData, logUserByUsername, openDatabase, openUserTable } from '@/app/database/userDB';
const backgroundImage = require('../../../assets/images/loginsignup.jpg');

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize useNavigation

  const handleSignup = () => {
    if (!name || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const database = openDatabase();
    openUserTable(database);
    checkUsername(database);
  };

  const checkUsername = async (database: Promise<SQLite.SQLiteDatabase | null>) => {
    // Check that username is not already taken
    const newName = await checkUserByUsername(database, username);

    if (newName) {
      Alert.alert('Error', 'Username already exists');
      return;
    } else {
      insertUserData(database, username, password);
      logUserByUsername(database, username);
      Alert.alert('Success', 'Signup successful!');
      navigation.navigate('Login'); // Navigate to Login after successful signup
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
        <View style={styles.buttonContainer}>
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for contrast
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
  buttonContainer: {
    marginTop: 16,
  },
});
