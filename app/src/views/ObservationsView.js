import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import INaturalistService from '../api/INaturalistConnection';

const ObservationsScreen = () => {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const data = await INaturalistService.getData('observations');
        setObservations(data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchObservations();
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {observations.map((observation) => (
        <Text key={observation.id}>{observation.species_guess}</Text>
      ))}
    </View>
  );
};

export default ObservationsView;