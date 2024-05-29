'use client'
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { redirect, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/authContext';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useFetchUser( expectedUserType ){
  const { dispatch } = useContext(AuthContext);
  const [ error, setError] = useState(false);
  const pathname  = usePathname();
  
  useEffect(() => {
    if(error){redirect('/login')}
  }, [error]);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      
      const {
        id, 
        userType, 
        accessToken, 
        isVerified, 
        filledAllInfo,
        verifyPicUrl
      } = JSON.parse(localStorage.getItem('user'));
      
      const fetchUser = async () => {
        try {
          const response = await fetch(`${baseUrl}user_mgt/users/${id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const res = await response.json();

          if (!response.ok) {
            console.error(res.detail || res.message);
            setError(true);
          }
          
          dispatch({ type: 'LOGIN', payload: res.data });

          if(res.data.is_verified && !isVerified){
            localStorage.setItem('user', JSON.stringify({
              ...JSON.parse(localStorage.getItem('user')),
               isVerified: true
            }));
            redirect('/home')
          }
          
        } catch (error) {
          setError(true)
        } 
      };
      fetchUser();

      const accessControl =() =>{
          if (isVerified) {
            if(!pathname.startsWith('/home')){
              redirect('/home');
            }
          } 
          else if (filledAllInfo) {
            if(pathname !== '/auth/waiting'){
              redirect('/auth/waiting');
            }
          } 
          else if (verifyPicUrl && !isVerified) {
            if(pathname !== '/auth/submit-request'){
              redirect('/auth/submit-request');
            }
          } else if(!verifyPicUrl && !isVerified) {
            if(pathname !== '/auth/verification'){
              redirect('/auth/verification');
            }
          }
      }

      if(expectedUserType === 'admin' && userType !== 'admin'){
          console.error('User not authorized');
          accessControl()
      } 
      else if (userType === 'user'){
          accessControl()
      }
    } else {
        console.error('Please login to continue');
        redirect('/login');
    }
  }, []);
};
