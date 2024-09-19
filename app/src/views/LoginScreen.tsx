import React, { useContext, useState } from 'react';
import { TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { checkUserByUsername, getPasswordByUsername, getUserIdByUsername, openDatabase, openUserTable } from '@/app/database/userDB';
import * as SQLite from 'expo-sqlite';
import { GlobalContext } from '@/app/(tabs)/currentUser';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const handleLogin = () => {
    
    
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both username and password');
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
      checkPassword(database)
    } else {
      Alert.alert('Error', 'Username not found');
    }
  };

  const checkPassword = async (database: Promise<SQLite.SQLiteDatabase | null>) => {
    const dbPassword = await getPasswordByUsername(database, username);

    if (dbPassword === password) {
      const newId = await getUserIdByUsername(database, username);
      if (newId) {
        setGlobalVariable({
          ...globalVariable,
          user: {id: newId, name: username}, // insert user id here
          isLoggedIn: true,
        });
      }
      
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } else {
      Alert.alert('Error', 'Password does not match');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
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
      <Button title="Login" onPress={handleLogin} />
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
