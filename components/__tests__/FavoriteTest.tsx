// FavoriteTest.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Favorites from '@/app/src/views/Favorites';
import { GlobalContext } from '@/app/(tabs)/currentUser';
import { getFavortiesByUserId } from '@/app/database/animalDB';

jest.mock('@/app/database/animalDB', () => ({
  getFavortiesByUserId: jest.fn(),
}));

const mockFavorites = [
  { id: 1, name: 'Lion', description: 'King of the Jungle', image: 'lion.jpg' },
  { id: 2, name: 'Elephant', description: 'Largest land animal', image: 'elephant.jpg' },
];

describe('Favorites Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display "No favorite animals" if the user has no favorites', async () => {
    getFavortiesByUserId.mockResolvedValueOnce([]);

    const { getByText } = render(
      <GlobalContext.Provider value={{ globalVariable: { user: { id: 1 } } }}>
        <Favorites />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('No favorite animals')).toBeTruthy();
    });
  });

  it('should display a list of favorite animals', async () => {
    getFavortiesByUserId.mockResolvedValueOnce(mockFavorites);

    const { getByText, getByTestId } = render(
      <GlobalContext.Provider value={{ globalVariable: { user: { id: 1 } } }}>
        <Favorites />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      // Check if the favorites are displayed
      expect(getByText('Lion')).toBeTruthy();
      expect(getByText('King of the Jungle')).toBeTruthy();
      expect(getByTestId('image-1')).toBeTruthy();

      expect(getByText('Elephant')).toBeTruthy();
      expect(getByText('Largest land animal')).toBeTruthy();
      expect(getByTestId('image-2')).toBeTruthy();
    });
  });

  it('should handle a button click if there is any button functionality', async () => {
    // Assuming there's a button in the Favorites component, like "Clear Favorites"
    const { getByText } = render(
      <GlobalContext.Provider value={{ globalVariable: { user: { id: 1 } } }}>
        <Favorites />
      </GlobalContext.Provider>
    );

    // Simulate button click
    const button = getByText('Clear Favorites');
    fireEvent.press(button);

    // Expect some result, such as clearing the favorites or making a database call
    expect(getFavortiesByUserId).toHaveBeenCalled();
  });
});
