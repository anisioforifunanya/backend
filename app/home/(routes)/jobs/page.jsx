'use client'
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5"; 
import { BsBriefcase, BsEnvelopePlus } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { fetchJobs } from "@/services/jobsService";
import Job from './components/Job';
import Spinner from '@/app/components/Spinner';

export default function page() {
  const { push } = useRouter();
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchJobs()
      .then(data => {
        setJobs(data);
      })
      .catch(error => setError(true))
    }, []);

  return (
    <div className='flex flex-col w-full overflow-y-auto items-center p-5'>
      <div className='flex w-full items-center justify-center flex-wrap gap-3 h-fit font-medium text-lg'>
        <div className='border border-red-800 rounded-xl flex-grow min-w-[250px] shadow-lg h-[150px] hover:border-b-4 flex items-center justify-center cursor-pointer transition-all gap-2 text-red-900' onClick={()=> push('/home/search?type=jobs')}>
          <IoSearch />
          <p>Search Jobs</p>
        </div>
        <div className='border border-red-800 rounded-xl flex-grow min-w-[250px] shadow-lg h-[150px] hover:border-b-4 flex items-center justify-center cursor-pointer transition-all gap-2 text-red-900' onClick={() => push('./jobs/create')}>
          <BsBriefcase />
          <p>Add Job</p>
        </div>
      </div>
      <h2 className='w-full py-5 mt-5 font-medium text-3xl'>Latest Openings</h2>
      <div className='w-full flex flex-wrap justify-center gap-5'>
        {jobs && jobs.length === 0 && <h2 className='items-center w-full text-2xl font-semibold text-center text-gray-800'>No Jobs Available!</h2>}
        { jobs? 
            jobs.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()).slice(0, 10)
                .map((job, index) => ( <Job job={job} key={index}/>
                )) 
        : !error? 
            <div className='flex justify-center items-center w-full h-[200px]'>
              <Spinner type=''/>
            </div>
        : <h2 className='items-center w-full text-2xl font-semibold'>An Error Occured!</h2>}
      </div>
    </div>
  )
}
