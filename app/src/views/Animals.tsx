import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchWikipediaInfo } from '../api/wikipediaApi'; // Make sure the path to the API file is correct
import { useRoute } from '@react-navigation/native'; // To get the route parameters

export default function Animals() {
  const route = useRoute(); // Get the route object to access the params
  const { title } = route.params; // Destructure the title passed from Search.tsx

  const [animalData, setAnimalData] = useState(null); // To store the fetched data
  const [isLoading, setIsLoading] = useState(true); // For the loading state
  const [error, setError] = useState<string | null>(null); // To handle errors

  // Fetch the animal's details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWikipediaInfo(title); // Use the title from the navigation params
        setAnimalData(data); // Store the data in the state
      } catch (err) {
        setError('Error fetching animal data');
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData(); // Trigger the fetch
  }, [title]); // Re-run the fetch if the title changes

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
        </>
      )}
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
});