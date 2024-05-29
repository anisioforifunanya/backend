'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchJobs } from "@/services/jobsService";
import Job from './components/Job';
import Spinner from '@/app/components/Spinner';
import Error from '@/app/components/Error';
import SearchBar from '@/app/components/SearchBar';
import NoResults from '@/app/components/NoResults';

export default function page() {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false)
  const [results, setResults] = useState(null);
  const queryParams = useSearchParams();

  useEffect(() => {
    fetchJobs()
      .then(res => {
        if(res !== 'error'){
          setJobs(res)
        } else {
          setError(true)
        }
      })
    }, []);

    useEffect(() => {
      const query = queryParams.get('query');
      if(query && jobs){
        const filteredResults = jobs?.filter(job => { 
          return job.title.toLowerCase().includes(query.toLowerCase()) || job.location.toLowerCase().includes(query.toLowerCase()) || job.company.toLowerCase().includes(query.toLowerCase()) 
        })
        
        if(filteredResults?.length > 0){
          setResults(filteredResults);
          setNotFound(false)
        } else {
          setNotFound(true)
          setResults([])
        }
      } else if(jobs){
        setNotFound(false)
        setResults(jobs)
      }
  }, [queryParams, jobs])

  return (
    <div className='flex flex-col w-full overflow-y-auto items-center p-5'>
      <h2 className='w-full py-5 mt-2 font-medium text-3xl'>All Openings</h2>
        <div className='w-full sticky top-5 z-30 flex justify-center'>
          <SearchBar placeholder={'Search jobs...'}  />
        </div>
      <div className='w-full flex flex-wrap justify-center gap-5 mt-3'>
        {notFound && <NoResults className='w-[150px] h-auto' />}
        { results? 
            results.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()).map((job, index) => ( <Job job={job} key={index}/>
                )) 
        : !error? 
            <div className='flex justify-center items-center w-full h-[200px]'>
              <Spinner type=''/>
            </div>
        : <Error />}
      </div>
    </div>
  )
}
