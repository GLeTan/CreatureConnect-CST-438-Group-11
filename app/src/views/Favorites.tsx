import { GlobalContext } from '@/app/(tabs)/currentUser';
import { FavoriteType, getFavortiesByUserId, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

export default function Favorites() {
  const { globalVariable } = useContext(GlobalContext);
  const [favorites, setFavorites] = useState<FavoriteType[] | null>(null);

  // Function to fetch favorite animals from the database
  const getFavorites = async () => {
    const database = openDatabase();
    await openFavoriteTable(database);
    const userId = globalVariable.user?.id;
    if (userId) {
      const favs = await getFavortiesByUserId(database, userId);
      if (favs) {
        setFavorites(favs);
      }
    }
  };

  useEffect(() => {
    getFavorites(); // Fetch the favorites when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Refresh Favorites" onPress={getFavorites} />
      <ScrollView>
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <View key={favorite.id} style={styles.favoriteItem}>
              <Text style={styles.animalName}>{favorite.animalName}</Text>
              {favorite.imageUrl && (
                <Image source={{ uri: favorite.imageUrl }} style={styles.image} />
              )}
              <Text style={styles.summary}>{favorite.summary}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No favorites found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  favoriteItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    textAlign: 'center',
  },
});
