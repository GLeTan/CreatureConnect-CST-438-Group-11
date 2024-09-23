import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Animals from '../Animals';
import { fetchWikipediaInfo } from '../../api/wikipediaApi';
import { insertFavoriteData, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import { GlobalContext } from '@/app/(tabs)/currentUser';

jest.mock('../../api/wikipediaApi');
jest.mock('@/app/database/animalDB');

const mockContextValue = {
  globalVariable: {
    user: {
      id: 1,
    },
  },
  setGlobalVariable: jest.fn(),
};

describe('Animals Component', () => {
  const route = { params: { title: 'Shoebill' } };
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    fetchWikipediaInfo.mockClear();
    insertFavoriteData.mockClear();
    openDatabase.mockClear();
    openFavoriteTable.mockClear();
  });

  it('renders loading state initially', () => {
    fetchWikipediaInfo.mockResolvedValueOnce({});
    const { getByTestId } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <Animals route={route} navigation={mockNavigation} />
      </GlobalContext.Provider>
    );

    // Expect loading indicator to be present initially
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders fetched animal data correctly', async () => {
    // Mock the API response with animal data
    const mockAnimalData = {
      title: 'Shoebill',
      summary: 'The Shoebill is a large bird...',
      thumbnail: 'https://example.com/shoebill.jpg',
    };

    fetchWikipediaInfo.mockResolvedValueOnce(mockAnimalData);

    const { getByText, getByAltText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <Animals route={route} navigation={mockNavigation} />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Shoebill')).toBeTruthy();
      expect(getByText('The Shoebill is a large bird...')).toBeTruthy();
      expect(getByAltText('animal-thumbnail')).toBeTruthy();
    });
  });

  it('handles API error and displays error message', async () => {
    fetchWikipediaInfo.mockRejectedValueOnce(new Error('Error fetching animal data'));

    const { getByText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <Animals route={route} navigation={mockNavigation} />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Error fetching animal data')).toBeTruthy();
    });
  });

  it('calls insertFavoriteData with animalData when "Add To Favorite" is pressed', async () => {

    const mockAnimalData = {
      title: 'Shoebill',
      summary: 'The Shoebill is a large bird...',
      thumbnail: 'https://example.com/shoebill.jpg',
    };

    fetchWikipediaInfo.mockResolvedValueOnce(mockAnimalData);

    const { getByText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <Animals route={route} navigation={mockNavigation} />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Shoebill')).toBeTruthy();
    });

    const addButton = getByText('Add To Favorite');
    fireEvent.press(addButton);

    expect(insertFavoriteData).toHaveBeenCalledWith(
      expect.any(Object), // The database object
      'Shoebill', // Title
      'The Shoebill is a large bird...', // Summary
      'https://example.com/shoebill.jpg', // Thumbnail
      1 // User ID from mock context
    );
  });
});
