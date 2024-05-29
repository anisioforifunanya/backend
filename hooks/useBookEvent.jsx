import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const useBookEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nextRoute, setNextRoute] = useState("");
  const [user, setUser] = useState({});

  useEffect(()=>{
    if (nextRoute){
      redirect(nextRoute)
    }

    setUser(JSON.parse(localStorage.getItem('user')));

  }, [nextRoute]);
  

  const createEvent = async (formData) => {
    setIsLoading(true);

    try {
      console.log('formData', formData);
      const response = await fetch(`${baseUrl}event_mgt/events/`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${user?.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        return
      }

      const data = await response.json();
      toast.success(`Event added successully! ${data.message}`);
      setNextRoute('/home/events');

    } catch (error) {
        toast.error(error.message? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createEvent };
};

export default useBookEvent;

