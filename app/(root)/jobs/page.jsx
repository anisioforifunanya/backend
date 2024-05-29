'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchJobs } from "@/services/jobsService";
import Job from "@/app/home/(routes)/jobs/components/Job";
import Spinner from '@/app/components/Spinner';
import RedirectModal from '../components/RedirectModal';


export default function Jobs() {

  const { push } = useRouter();
  const [jobs, setJobs] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    fetchJobs()
      .then(data => {
        setJobs(data);
      })
      .catch(error => setError(true))
    }, []);

  useEffect(() => {
    if (error) {
          toast.error(error)
        }
    }, [error])

  useEffect(() => {
    if (localStorage.getItem('user')) {
    setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  const redirectUser = (id) => {
    if (!user) {
      setOpenModal(true)
      return
    }
    push(`/home/jobs/${id}`)
  }

    return (
      <main className='p-5'>
         <RedirectModal 
          openModal = {openModal}
          message={'You need to be logged into your account to view and apply for these jobs'}
          handleCloseModal={()=> setOpenModal(false)}/>
        <div>
            <h1 className='text-2xl font-semibold my-3'>Recent Openings</h1>
            <div className="w-full flex flex-wrap justify-center gap-5 text-black">
              {jobs && jobs.length === 0 && <h2 className='items-center w-full text-2xl font-semibold text-center text-gray-800'>No Jobs Available!</h2>}
              { jobs? 
                  jobs.slice(0, 10).sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
                      .map((job, index) => ( <Job job={job} key={index} checkAuth={redirectUser} isOuterPage={true} />
                      )) 
              : !error? 
                  <div className='flex justify-center items-center w-full h-[200px]'>
                    <Spinner type=''/>
                  </div>
              : <h2 className='items-center w-full text-2xl font-semibold'>An Error Occured!</h2>}
            </div>
        </div>
      </main>
    )
  }
  