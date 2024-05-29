import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const sendVerificationCode = () => {

    const [isLoading, setIsLoading] = useState(false);
    
    const sendCode = async (formData) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${baseUrl}user_mgt/forget_password_link/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
            toast.error(data.data);
            return;
            }

            toast.success(data.message);
            console.log(data);
        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
        
    }

    return { sendCode, isLoading };
}

export const emailResetPassword = () => {

    const { push } = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    
    const resetPassword = async (formData) => {
        // console.log(formData);
        try {
            setIsLoading(true);
            const res = await fetch(`${baseUrl}user_mgt/forget_password/`, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                    },
            body: JSON.stringify(formData),
            });

            const data = await res.json();
            
            if (!res.ok) {
                toast.error(data.data);
                return;
                }
                
                toast.success(data.message);
                push('/login')
                // console.log(data);
        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
        
    }

    return { resetPassword, isLoading };
}