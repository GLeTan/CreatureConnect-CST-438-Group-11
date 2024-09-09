import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Screen</Text>
      {/* You can add more options and buttons here for the actual menu */}
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
