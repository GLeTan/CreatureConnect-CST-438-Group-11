// HomeTest.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import HomeScreen from '@/app/src/views/Home';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render the home screen correctly', () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    // Check if the home screen content is rendered correctly
    expect(getByText('Welcome to the Home Screen')).toBeTruthy();

    // Assuming there's a button on the screen
    expect(getByText('Go to Details')).toBeTruthy();
  });

  it('should navigate to the details page when the button is pressed', () => {
    const { getByText } = render(<HomeScreen />);

    // Simulate button press
    fireEvent.press(getByText('Go to Details'));

    // Check if navigation to 'Details' is triggered
    expect(mockNavigate).toHaveBeenCalledWith('Details');
  });
});
