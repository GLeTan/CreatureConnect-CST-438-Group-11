import { GlobalContext } from '@/app/(tabs)/currentUser';
import { FavoriteType, getFavortiesByUserId, getOneFavortieByUserId, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';



export default function Favorites() {
  const { globalVariable } = useContext(GlobalContext);

  // console.log(globalVariable.user?.id);
  
  const getFavorites = async () => {
    const database = openDatabase();
    openFavoriteTable(database);
    const x = globalVariable.user?.id;
    if (x) {
      console.log("x: " + x);
      const s = await getFavortiesByUserId(database, x);

      console.log(s);


    }
    
  };

  



  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Favorites Page</Text>
      <Button title="Add To Favorite" onPress={getFavorites}/> 
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
  },
});

