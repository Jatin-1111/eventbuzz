import { useState } from 'react';
import { createRegistration } from '@/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const useRegistration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const register = async (formData) => {
        setIsLoading(true);
        try {
            // Create registration in Firestore
            const { registrationId } = await createRegistration({
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                course: formData.course,
                year: formData.year,
                selectedEvents: formData.selectedEvents.map(event => ({
                    id: event.value,
                    name: event.label,
                    price: event.price,
                    category: event.category
                })),
                totalAmount: formData.selectedEvents.reduce((sum, event) => sum + event.price, 0)
            });

            toast.success('Registration successful!');
            router.push(`/registration/${registrationId}`);
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading };
};