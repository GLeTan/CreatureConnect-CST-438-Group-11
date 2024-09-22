import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '@/app/(tabs)/TabNavigator';

// Gets the paths of the files that are rendered in the tab navigation
jest.mock('@/app/src/views/Home', () => 'HomeScreen');
jest.mock('@/app/(tabs)/settings', () => 'SettingsScreen');
jest.mock('@/app/src/views/Search', () => 'Search');
jest.mock('@/app/src/views/Favorites', () => 'Favorites');
jest.mock('react-native/Libraries/NewAppScreen', () => ({
  // Needed for the color scheme in the Tab Naviagation page
  Colors: {
    light: { tint: 'blue' },
    dark: { tint: 'white' },
  }
}));

// Renders the TabNavigator inside the container
describe('TabNavigator', () => {
  it('should render all tab screens', () => {
    const { getByText } = render(
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
    
    // Check if the main tab screens are rendered in the container
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Favorites')).toBeTruthy();
  });
});
