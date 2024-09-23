import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Animals from '../../src/views/Animals';
import { fetchWikipediaInfo } from '../../src/api/wikipediaApi';
import { insertFavoriteData, openDatabase, openFavoriteTable } from '../../app/database/animalDB';
import { GlobalContext } from '../../app/(tabs)/currentUser';

jest.mock('../../src/api/wikipediaApi');
jest.mock('../../app/database/animalDB');

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

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders fetched animal data correctly', async () => {
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
      expect(getByText('Shoebill')).toBeTruthy(); // Title
      expect(getByText('The Shoebill is a large bird...')).toBeTruthy(); // Summary
      expect(getByAltText('animal-thumbnail')).toBeTruthy(); // Thumbnail image
    });
  });

  it('calls insertFavoriteData when "Add To Favorite" is pressed', async () => {
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
      expect.any(Object),
      'Shoebill',
      'The Shoebill is a large bird...',
      'https://example.com/shoebill.jpg',
      1
    );
  });
});
