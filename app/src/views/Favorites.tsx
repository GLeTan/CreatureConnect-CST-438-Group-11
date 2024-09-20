import { GlobalContext } from '@/app/(tabs)/currentUser';
import { FavoriteType, getFavortiesByUserId, getOneFavortieByUserId, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    
    
  // console.log(globalVariable.user?.id);
  
  // getFavorites can be called at the moment this page is loaded.
  // TODO: Use the title of each entry in the Favorites list to search those up
<!--   const getFavorites = async () => {
    const database = openDatabase();
    openFavoriteTable(database);
    const x = globalVariable.user?.id;
    if (x) {
      console.log("x: " + x);
      const s = await getFavortiesByUserId(database, x);
      console.log(s);
    }
  }; -->

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
