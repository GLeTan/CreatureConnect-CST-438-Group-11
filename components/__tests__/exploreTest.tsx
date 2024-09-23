// explore.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import SignupScreen from '@/app/(tabs)/explore';
import { checkUserByUsername, insertUserData } from '@/app/database/animalDB';

jest.mock('../database/userDB', () => ({
  checkUserByUsername: jest.fn(),
  insertUserData: jest.fn(),
}));

describe('SignupScreen', () => {
  it('should render the signup form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);

    // Check if the form fields are rendered
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();

    // Check if the signup button is rendered
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('should update name and username on input', () => {
    const { getByPlaceholderText } = render(<SignupScreen />);

    // Simulate entering name
    const nameInput = getByPlaceholderText('Name');
    fireEvent.changeText(nameInput, 'John Doe');
    expect(nameInput.props.value).toBe('John Doe');

    // Simulate entering username
    const usernameInput = getByPlaceholderText('Username');
    fireEvent.changeText(usernameInput, 'johndoe');
    expect(usernameInput.props.value).toBe('johndoe');
  });

  it('should call insertUserData when signing up', () => {
    const { getByText, getByPlaceholderText } = render(<SignupScreen />);

    // Simulate entering name and username
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Username'), 'johndoe');

    // Simulate button press
    fireEvent.press(getByText('Sign Up'));

    //Expect the insertUserData function to be called
    expect(insertUserData).toHaveBeenCalledWith('John Doe', 'johndoe');
  });

  it('should show an alert if username already exists', () => {
    checkUserByUsername.mockReturnValueOnce(Promise.resolve(true));
    const { getByText, getByPlaceholderText } = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Username'), 'johndoe');

    fireEvent.press(getByText('Sign Up'));

    //Check if the alert is shown for existing user
    expect(Alert.alert).toHaveBeenCalledWith('Username already exists!');
  });
});
