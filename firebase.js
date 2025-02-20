import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4JrP4NksXV3B-nM7RrIimXASAf9-z07Q",
    authDomain: "eventbuzz-9b67d.firebaseapp.com",
    projectId: "eventbuzz-9b67d",
    storageBucket: "eventbuzz-9b67d.firebasestorage.app",
    messagingSenderId: "615629129940",
    appId: "1:615629129940:web:d18a76520ebf295e2f9341",
    measurementId: "G-32D8XP9MLH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createRegistration = async (registrationData) => {
    try {
        const registrationRef = collection(db, 'registrations');
        const registration = {
            ...registrationData,
            timestamp: serverTimestamp(),
            userId: auth.currentUser?.uid || null,
            status: 'pending', // pending, confirmed, cancelled
            paymentStatus: 'pending', // pending, completed, failed
        };

        const docRef = await addDoc(registrationRef, registration);
        return { success: true, registrationId: docRef.id };
    } catch (error) {
        console.error('Error creating registration:', error);
        throw error;
    }
};