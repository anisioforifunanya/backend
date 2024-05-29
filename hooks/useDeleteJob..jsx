import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const useDeleteJob = () => {
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
  

  const deleteJob = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}job_mgt/jobs/${id}`, {
        method: 'DELETE',
        headers: {
           Authorization: `Bearer ${user?.accessToken}`,
        }
      });

      if (response.status !== 204) {
        toast.error("Error, Failed to delete job");
        setError("error");
        return
      }

      toast.success("Job deleted successfully!");
      setNextRoute('./');
    } catch (error) {
        toast.error(error.message? error.message : "An error occurred");
        setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteJob, error };
};

export default useDeleteJob;

