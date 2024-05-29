// UserMenu.jsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import useLogout from '@/hooks/useLogout';
import { LuUserCheck2 } from 'react-icons/lu';
import { TbLogout } from 'react-icons/tb';

const UserMenu = ({ handleClose, userId }) => {
    
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const concernedElement = document.querySelector('.user_menu');
            if (!concernedElement.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleClose]);

    const { logout } = useLogout(); 

    const userPage = userId ? `/home/people/${userId}/edit` : `/login?redirect=session-expired`;

    return (
        <div className="user_menu">
            <Link href={userPage}>
                <LuUserCheck2 /> Manage Account
            </Link>
            <button onClick={() => logout()}>
                <TbLogout /> Logout
            </button>
        </div>
    );
};

export default UserMenu;
