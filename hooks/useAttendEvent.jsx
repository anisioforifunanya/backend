import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const useAttendEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(()=>{

    setUser(JSON.parse(localStorage.getItem('user')));

  }, []);
  

  const bookEvent = async (eventId) => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${baseUrl}user_mgt/users/${user?.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        }});
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();

      // console.log('userData', userData.data)

      let updatedUserEvents = [];
      if(userData.data.user_events.includes(eventId)){
        updatedUserEvents = userData.data.user_events.filter((event) => event !== eventId)
      } else{
        updatedUserEvents = [...userData.data.user_events, eventId]
      }
  
  
      const patchResponse = await fetch(`${baseUrl}user_mgt/users/${user?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({ user_events: updatedUserEvents }),
      });
  
      if (!patchResponse.ok) {
        const error = await patchResponse.json();
        throw new Error(error.message || 'Failed to update user events');
      }
  
      toast.success(`Event ${userData.data.user_events.includes(eventId)? "Unbooked" : "Booked"} successfully!`);
    } catch (error) {
      toast.error(error.message || 'An error occurred while booking the event');
    } finally {
      setIsLoading(false);
    }
  };
  

  return { isLoading, bookEvent };
};

export default useAttendEvent;

