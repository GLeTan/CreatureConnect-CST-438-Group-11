import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../../app/(tabs)/settings';
import { GlobalContext } from '../../app/(tabs)/currentUser';
import { useNavigation } from 'expo-router';

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

const mockContextValue = {
  logout: jest.fn(),
  globalVariable: {
    user: {
      id: 1,
    },
  },
  setGlobalVariable: jest.fn(),
};

describe('SettingsScreen Component', () => {
  const mockNavigate = jest.fn();
  const mockUseNavigation = useNavigation as jest.Mock;

  beforeEach(() => {
    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the settings screen with default light mode', () => {
    const { getByText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <SettingsScreen />
      </GlobalContext.Provider>
    );

    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('calls logout and navigates to login when "Log Out" is pressed', () => {
    const { getByText } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <SettingsScreen />
      </GlobalContext.Provider>
    );

    const logoutButton = getByText('Log Out');

    fireEvent.press(logoutButton);

    expect(mockContextValue.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
