import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavortiesByUserId, openDatabase } from '@/app/database/animalDB';

interface Animal {
  id: number | string;
  name: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Animal[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          const parsedFavorites = JSON.parse(favoritesData).map((item: Animal, index: number) => ({
            ...item,
            id: item.id || index.toString(),
          }));
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Failed to load favorites.', error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View>
      <Text>Favorites</Text>
      {favorites.length === 0 ? (
        <Text>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
};

export default Favorites;