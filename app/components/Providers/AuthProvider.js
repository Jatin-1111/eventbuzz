'use client';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Check authentication status
    const checkAuth = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/auth/check', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Authentication check failed');
            }

            const data = await response.json();
            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setUser(data.user);
            router.push('/dashboard'); // or wherever you want to redirect after login
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setUser(null);
            router.push('/auth'); // redirect to login page
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        error,
        checkAuth,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};