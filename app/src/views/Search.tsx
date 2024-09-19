import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { fetchRelevantPages } from '../api/wikipediaApi';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchRelevantPages(searchTerm);
      setData(result?.results || []);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (title: string) => {
    navigation.navigate('Animals', { title }); // Navigate to the Animals page with the title as a parameter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search For An Animal</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Type an animal name..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.title)} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            {item.thumbnail && (
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No results found</Text>}
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
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  item: {
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  empty: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});