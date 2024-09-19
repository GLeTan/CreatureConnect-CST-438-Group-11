import { GlobalContext } from '@/app/(tabs)/currentUser';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favorites() {
  const { globalVariable } = useContext(GlobalContext);

  console.log(globalVariable.user?.id);
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Favorites Page</Text>
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

