// LoginScreenTest.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import LoginScreen from '@/app/src/views/LoginScreen';
import { checkUserByUsername, getPasswordByUsername } from '@/app/database/userDB'; 
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@/app/database/userDB', () => ({
  checkUserByUsername: jest.fn(),
  getPasswordByUsername: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render the login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Check if the input fields and button are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('should update username and password on input', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    // Simulate entering username
    const usernameInput = getByPlaceholderText('Username');
    fireEvent.changeText(usernameInput, 'testuser');
    expect(usernameInput.props.value).toBe('testuser');

    // Simulate entering password
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should show an alert if the username does not exist', async () => {
    checkUserByUsername.mockResolvedValueOnce(false);

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Simulate entering invalid username and valid password
    fireEvent.changeText(getByPlaceholderText('Username'), 'invaliduser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    fireEvent.press(getByText('Login'));

    // Check if the alert is triggered for non-existing username
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('User not found');
    });
  });

  it('should show an alert if the password is incorrect', async () => {
    checkUserByUsername.mockResolvedValueOnce(true);
    getPasswordByUsername.mockResolvedValueOnce('correctpassword');

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Simulate entering valid username but incorrect password
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    fireEvent.press(getByText('Login'));

    // Check if the alert is triggered for incorrect password
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Incorrect password');
    });
  });

  it('should navigate to the home page on successful login', async () => {
    checkUserByUsername.mockResolvedValueOnce(true);
    getPasswordByUsername.mockResolvedValueOnce('password123');

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Simulate entering valid username and password
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    fireEvent.press(getByText('Login'));

    // Check if navigation to 'Home' is triggered on successful login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });
});
