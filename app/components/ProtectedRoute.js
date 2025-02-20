"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    return children;
};

export default ProtectedRoute;