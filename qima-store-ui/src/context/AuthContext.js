// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    username: null,
    roles: [],
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: localStorage.getItem('username'),
        roles: JSON.parse(localStorage.getItem('roles')) || []
    });

    useEffect(() => {
        const username = localStorage.getItem('username');
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        setAuthState({ username, roles });
    }, []);

    const login = (username, roles) => {
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(roles));
        setAuthState({ username, roles });
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
        setAuthState({ username: null, roles: [] });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
