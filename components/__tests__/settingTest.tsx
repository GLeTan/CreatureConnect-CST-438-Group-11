import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../SettingsScreen';
import { GlobalContext } from '../currentUser';
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
    const { getByText, getByTestId } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <SettingsScreen />
      </GlobalContext.Provider>
    );

    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('toggles dark mode when the switch is pressed', () => {
    const { getByText, getByTestId, getByRole } = render(
      <GlobalContext.Provider value={mockContextValue}>
        <SettingsScreen />
      </GlobalContext.Provider>
    );

    const darkModeSwitch = getByRole('switch');

    // Simulate pressing the switch to turn on dark mode
    fireEvent(darkModeSwitch, 'valueChange', true);

    expect(getByText('Settings')).toHaveStyle({ color: '#fff' });
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
