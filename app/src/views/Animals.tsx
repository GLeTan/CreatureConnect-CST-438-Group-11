import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { fetchWikipediaInfo } from '../api/wikipediaApi'; // Make sure the path to the API file is correct
import { useRoute } from '@react-navigation/native'; // To get the route parameters
import { insertFavoriteData, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import { GlobalContext } from '@/app/(tabs)/currentUser';

export default function Animals() {
  const route = useRoute();
  const { title } = route.params;

  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const addToFavorites = () => {
    const database = openDatabase();
    openFavoriteTable(database);
    const x = globalVariable.user?.id;
    if (x) {
      insertFavoriteData(database, title, "", 0, x);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWikipediaInfo(title);
        setAnimalData(data);
        await checkIfFavorite(title);
      } catch (err) {
        setError('Error fetching animal data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const checkIfFavorite = async (animalTitle: string) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favArray = JSON.parse(favorites);
        if (favArray.some((fav: { name: string }) => fav.name === animalTitle)) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error checking favorites', error);
    }
  };

  const addToFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteArray = favorites ? JSON.parse(favorites) : [];

      const newFavorite = {
        id: favoriteArray.length > 0 ? favoriteArray[favoriteArray.length - 1].id + 1 : 1,
        name: title
      };

      favoriteArray.push(newFavorite);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteArray));
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites', error);
    }
  };


  // SQLite implementation if you're using SQLite instead of AsyncStorage
  const addToFavoritesSQL = async () => {
    const db = await openDatabase();
    const userId = 1; // Replace with logged-in user ID if needed
    try {
      await insertFavoriteData(db, title, '', 5, userId); // Add animal to the SQLite DB
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites (SQLite)', error);
    }
  };

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
    <View style={styles.container}>
      {animalData && (
        <>
          <Text style={styles.title}>{animalData.title}</Text>
          <Text style={styles.summary}>{animalData.summary}</Text>
          {animalData.thumbnail && (
            <Image source={{ uri: animalData.thumbnail }} style={styles.image} />
          )}
          {!isFavorite ? (
            <Button title="Add to Favorites" onPress={addToFavorites} />
          ) : (
            <Text>This animal is already in your favorites!</Text>
          )}
        </>
      )}

      <Button title="Add To Favorite" onPress={addToFavorites}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 20
  },
  summary: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20
  },
});