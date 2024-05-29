import {useState, useEffect} from 'react'
import Spinner from '@/app/components/Spinner';
import { fetchJobs } from '@/services/jobsService';
import Job from '../../jobs/components/Job';

export default function JobsActivity({userId, name}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
  
    useEffect(() => {
      fetchJobs()
        .then(data => {
          setJobs(data.filter(job => job.posted_by === userId));
          setLoading(false);
        })
        .catch(error => setError(true))
      }, []);
  return (
    <div className='w-full flex flex-wrap justify-center gap-5'>
    { jobs.length > 0? 
        jobs.slice(0, 10).sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
            .map((job, index) => ( <Job job={job} key={index}/>
            ))
    : jobs.length === 0 && !loading? 
    <h2 className='w-full font-semibold text-xl text-center'>{name == "You" ? `You have` : `${name} has`} not posted any jobs yet!</h2>
    : !error? 
        <div className='flex justify-center items-center w-full h-[200px]'>
          <Spinner type=''/>
        </div>
    : <h2 className='items-center w-full text-2xl font-semibold'>An Error Occured!</h2>}
  </div>
  )
}
