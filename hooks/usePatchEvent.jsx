import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect, usePathname } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const usePatchEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nextRoute, setNextRoute] = useState("");
  const [user, setUser] = useState({});
  const pathname = usePathname();

  useEffect(()=>{
    if (nextRoute){
      redirect(nextRoute)
    }

    setUser(JSON.parse(localStorage.getItem('user')));

  }, [nextRoute]);
  

  const patchEvent = async (formData, eventId) => {
    setIsLoading(true);

    try {
      console.log('formData', formData);
      const response = await fetch(`${baseUrl}event_mgt/events/${eventId}/`, {
        method: 'PATCH',
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
      
      toast.success(`Event updated successully!`);
      if(pathname.includes('admin')){
        setNextRoute(`/admin/events/${eventId}`);
      } else {
        setNextRoute(`/home/events/${eventId}`);
      }

    } catch (error) {
        toast.error(error.message? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, patchEvent };
};

export default usePatchEvent;

