import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [nextRoute, setNextRoute] = useState("");

  useEffect(()=>{
    if (nextRoute){
      redirect(nextRoute)
    }
  }, [nextRoute]);

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}user_mgt/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        return
      }

      const data = await response.json();
      setResponse(data);
      toast.success('Signup successful');
      setNextRoute('/login');

    } catch (error) {
        toast.error(error.message? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, signup };
};

export default useSignup;

