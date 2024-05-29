'use client'
import React, { useEffect, useState, useContext } from 'react'
import { search } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Job from '../../jobs/components/Job';
import Error from '@/app/components/Error'
import NoResults from '@/app/components/NoResults';

export default function JobsSearch({query}) {
    const { user: authUser } = useContext(AuthContext);
    const { push } = useRouter();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState(null)

    useEffect(() => {
        setLoading(true)
        setJobs(null)
        search("jobs", query)
          .then(data => {
            if(data === 'error'){
                setError(true)
            } else {
              setJobs(data)
            }
        }).finally(()=> setLoading(false))
      }, [query])
  

  return (
    <div className='flex flex-col w-full items-center p-[15px] h-[calc(100vh-70px)] overflow-y-auto'>
        {
          jobs?.length > 0?
            <>
              <div className='flex gap-3 flex-wrap animate-fadeup justify-center w-full'>
                  { 
                    jobs.slice(0, 10).sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()).map((job, index) => ( <Job job={job} key={index}/>))
                  }
              </div>
              <h2 className="text-center-font-semibold text-xl mt-[15px]">End of search results!</h2>
            </>
          : jobs?.length === 0? 
              <NoResults className={'w-[150px] h-auto'}/>
          : loading ?
              <Spinner centered />
          : error? <Error className={'w-[150px] h-auto'}/>
          : null
        }
    </div>
  )
}
