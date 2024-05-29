'use client'
import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useEvents () {
    
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(`${baseUrl}event_mgt/events/`);

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();

        setData(json.data);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
      } finally{
        setIsPending(false);
      }
    };
    fetchData();
  }, []);
  return { data, isPending, error };
};


