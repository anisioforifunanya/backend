import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const useDeleteEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextRoute, setNextRoute] = useState("");

  const [user, setUser] = useState({});

  useEffect(()=>{

    if (nextRoute){
        redirect(nextRoute)
      }

    setUser(JSON.parse(localStorage.getItem('user')));

  }, [nextRoute]);
  

  const deleteEvent = async (eventId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}event_mgt/events/${eventId}`, {
        method: 'DELETE',
        headers: {
           Authorization: `Bearer ${user?.accessToken}`,
        }
      });

      if (response.status !== 204) {
        toast.error("Error, Failed to delete event");
        setError("error");
        return
      }

      toast.success("Event deleted successfully!");
      setNextRoute('./');
    } catch (error) {
        toast.error(error.message? error.message : "An error occurred");
        setError("error.message");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteEvent, error };
};

export default useDeleteEvent;

