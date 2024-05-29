// useLogout.jsx
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const router = useRouter();

    const logout = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.clear();
        }
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout successful');
        router.push('/');
    };

    return { logout };
};

export default useLogout;
