// currentUser.test.tsx
import React, { useContext } from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Optional, for better assertions
import { GlobalContext, GlobalProvider, GlobalContextType } from '@/app/(tabs)/currentUser'; // Adjust the import path as needed
import { Text } from 'react-native';

// Helper component to access the context
const TestComponent = () => {
  const { globalVariable } = useContext(GlobalContext) as GlobalContextType;
  return (
    <>
      <Text testID="user-id">{globalVariable.user ? globalVariable.user.id.toString() : 'No User'}</Text>
      <Text testID="is-logged-in">{globalVariable.isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
    </>
  );
};

describe('GlobalContext', () => {
  it('should have default values', () => {
    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(getByTestId('user-id')).toHaveTextContent('No User');
    expect(getByTestId('is-logged-in')).toHaveTextContent('Logged Out');
  });

  it('should update context values', () => {
    const testValue: GlobalContextType = {
      globalVariable: { user: { id: 1, name: 'John Doe' }, isLoggedIn: true },
      setGlobalVariable: jest.fn(),
      logout: jest.fn(),
    };

    const { getByTestId } = render(
      <GlobalContext.Provider value={testValue}>
        <TestComponent />
      </GlobalContext.Provider>
    );

    expect(getByTestId('user-id')).toHaveTextContent('1');
    expect(getByTestId('is-logged-in')).toHaveTextContent('Logged In');
  });
});
