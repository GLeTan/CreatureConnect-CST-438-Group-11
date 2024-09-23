import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Animals from '../Animals'; // Adjust the import path based on your project structure
import { fetchWikipediaInfo } from '../../api/wikipediaApi'; // Mock the API function
import { insertFavoriteData, openDatabase, openFavoriteTable } from '@/app/database/animalDB';
import { GlobalContext } from '@/app/(tabs)/currentUser'; // Mock the global context

jest.mock('../../api/wikipediaApi'); // Mock the fetchWikipediaInfo function
jest.mock('@/app/database/animalDB'); // Mock the database functions

// Mock GlobalContext to avoid errors related to missing provider
const mockContextValue = {
  globalVariable: {
    user: {
      id: 1,
    },
  },
  setGlobalVariable: jest.fn(),
};

describe('Animals Component', () => {
  const route = { params: { title: 'Shoebill' } }; // Mock route parameter
  const mockNavigation = { navigate: jest.fn() }; // Mock navigation prop

  beforeEach(() => {
    fetchWikipediaInfo.mockClear();
    insertFavoriteData.mockClear();
    openDatabase.mockClear();
    openFavoriteTable.mockClear();
  });

  it('renders loading state initially', () => {
    fetchWikipediaInfo.mockResolvedValueOnce({}); // Mock a resolved API call
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

    // Wait for the animal data to be rendered
    await waitFor(() => {
      expect(getByText('Shoebill')).toBeTruthy(); // Title
      expect(getByText('The Shoebill is a large bird...')).toBeTruthy(); // Summary
      expect(getByAltText('animal-thumbnail')).toBeTruthy(); // Thumbnail image
    });
  });

  it('handles API error and displays error message', async () => {
    // Mock the API call to reject with an error
    fetchWikipediaInfo.mockRejectedValueOnce(new Error('Error fetching animal data'));

    const { getByText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <Animals route={route} navigation={mockNavigation} />
      </GlobalContext.Provider>
    );

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(getByText('Error fetching animal data')).toBeTruthy();
    });
  });

  it('calls insertFavoriteData when "Add To Favorite" is pressed', async () => {
    // Mock the API response with animal data
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

    // Wait for the data to be rendered
    await waitFor(() => {
      expect(getByText('Shoebill')).toBeTruthy();
    });

    // Simulate pressing the "Add To Favorite" button
    const addButton = getByText('Add To Favorite');
    fireEvent.press(addButton);

    // Expect the insertFavoriteData function to be called
    expect(insertFavoriteData).toHaveBeenCalledWith(expect.any(Object), 'Shoebill', '', 0, 1);
  });
});
