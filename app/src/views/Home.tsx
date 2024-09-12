import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Assuming the background image is in the assets folder
const backgroundImage = require('../../../assets/images/Background1.png'); // Change the path to where your image is located

export default function HomeScreen() {
  const navigation = useNavigation(); // Hook to handle navigation

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to CreatureConnect!</Text>

        {/* Button Container with spacing */}
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Animals"
            onPress={() => navigation.navigate('Animals')} // Navigate to Animals page
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Go to Favorites"
            onPress={() => navigation.navigate('Favorites')} // Navigate to Favorites page
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Go to Search"
            onPress={() => navigation.navigate('Search')} // Navigate to Search page
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a semi-transparent overlay for better text visibility
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Change the text color to white for better contrast
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10, // Adds vertical space between buttons
    width: '80%', // Ensures buttons take up 80% of the screen width
  },
});
