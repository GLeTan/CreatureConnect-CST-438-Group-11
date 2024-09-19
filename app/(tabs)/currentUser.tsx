import React, { createContext, ReactNode, useState } from 'react';

interface UserType {
    id: number;
    name?: string;
}

interface GlobalContextType {
    globalVariable: {
        user: UserType | null; // User can be either null or an object with id, name, and email
        isLoggedIn: boolean;
    };
    setGlobalVariable: React.Dispatch<React.SetStateAction<{
        user: UserType | null;
        isLoggedIn: boolean;
    }>>;
}

// Define default context value
const defaultValue: GlobalContextType = {
    globalVariable: {
        user: null,
        isLoggedIn: false,
    },
    setGlobalVariable: () => { }, // You can leave this as an empty function for now
};

// Create a context
export const GlobalContext = createContext<GlobalContextType>(defaultValue);

// Define the type for GlobalProvider props
interface GlobalProviderProps {
    children: ReactNode; // This specifies that 'children' can be any valid React node
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [globalVariable, setGlobalVariable] = useState({
        user: null as UserType | null, // Set user type to match the updated definition
        isLoggedIn: false,
    });

    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
            {children}
        </GlobalContext.Provider>
    );
};
