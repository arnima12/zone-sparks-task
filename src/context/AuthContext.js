import React, { useState, useContext } from 'react';


const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error] = useState('');

    const handleLogin = (formData) => {
        const storedUserData = JSON.parse(localStorage.getItem('formData'));
        if (!storedUserData) {
            return { success: false, error: 'User not found. Please register.' };
        }

        if (formData.username !== storedUserData.username || formData.password !== storedUserData.password) {
            return { success: false, error: 'Invalid username or password.' };
        }

        setIsLoggedIn(true);
        return { success: true, error: '' };

    };

    const logOut = () => {
        setIsLoggedIn(false);
    }

    return <AuthContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        logOut,
        error
    }}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);