'use client';
import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    user: null,
    loading: true,
    error: null,
    checkAuth: () => { },
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);
