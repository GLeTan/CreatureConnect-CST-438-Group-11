import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import { fetchWikipediaInfo } from '../api/wikipediaApi';
import { useRoute } from '@react-navigation/native';
import { insertFavoriteData, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import { GlobalContext } from '@/app/(tabs)/currentUser';

export default function Animals() {
  const route = useRoute();
  const { title } = route.params;

  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const addToFavorites = () => {
    const database = openDatabase();
    openFavoriteTable(database);
    const x = globalVariable.user?.id;
    if (x && animalData) {
      insertFavoriteData(database, title, animalData.summary, animalData.thumbnail, x);
    } else {
      console.log("error");
    }
  };



  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWikipediaInfo(title);
        setAnimalData(data);
      } catch (err) {
        setError('Error fetching animal data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {animalData && (
          <>
            <Text style={styles.title}>{animalData.title}</Text>
            <Text style={styles.summary}>{animalData.summary}</Text>
            {animalData.thumbnail && (
              <Image source={{ uri: animalData.thumbnail }} style={styles.image} />
            )}
          </>
        )}

        <Button title="Add To Favorite" onPress={addToFavorites} />
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  summary: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});
