import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search For An Animal</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Type an animal name..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});