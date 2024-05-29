import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ nextRoute, setNextRoute] = useState("");

  useEffect(()=>{
    if (nextRoute){
      redirect(nextRoute)
    }
  }, [nextRoute]);
  
  var userObject = {};

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const login = async (userData) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}user_mgt/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();

      if (!response.ok) {
        return toast.error(data.message);
      }
      
      userObject = {
        id: data.data.id,
        userType: data.data.user_type,
        isVerified: data.data.is_verified,
        filledAllInfo: data.data.filled_all_info,
        verifyPicUrl: data.data.verify_pic_url,
        accessToken: data.access,
        refreshToken: data.refresh
      };

      localStorage.setItem('user', JSON.stringify(userObject));
      toast.success('Login successful');

      if (userObject.userType === 'admin') {
        setNextRoute('/admin');
      } 
      else if (userObject.isVerified) {
        setNextRoute('/home');
      } 
      else if (userObject.filledAllInfo) {
        setNextRoute('/auth/waiting');
      } 
      else if (userObject.verifyPicUrl) {
        setNextRoute('/auth/submit-request')
      } else {
        setNextRoute('/auth/verification');
      }
      
    } catch (error) {
      toast.error('Network Error. Please try again later.');

    } finally {
      setIsLoading(false);
    }
  };
  
  return { isLoading, login };
};

export default useLogin;
