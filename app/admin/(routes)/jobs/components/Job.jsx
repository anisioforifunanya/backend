import React from 'react'
import { formatTimeAgo, capitalize } from '@/utils/stringHelperFuncts';
import { FaRegBuilding } from "react-icons/fa";
import { FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Job({job, checkAuth, isOuterPage}) {
    const { push } = useRouter();
  return (
    <div className='w-full min-h-[270px] rounded-2xl p-5 bg-[#ffe4dd] gap-2 shadow-lg flex flex-col justify-between text-black'>
        <div>
            <h2 className='font-medium text-2xl'>{job.title}</h2>
            <p className='text-lg flex items-center gap-1'>
                <FaRegBuilding />{job.company}
            </p>
            <p className='flex items-center gap-1'>
                <FiMapPin/>{job.location} 
                <span className='rounded px-2 bg-red-800 text-white'>{capitalize(job.job_type)}</span>
            </p>
            <p className='text-sm text-gray-500 ml-3'>{formatTimeAgo(job.date_created)}</p>
            </div>
            <p className='rounded-lg p-3 bg-[#ffffff] whitespace-pre-wrap'>
            {job.description.slice(0, 400) + '...'}
            </p>
            <div className='flex justify-end items-center gap-2 '>
                {job.apply_link ? 
                    <button onClick={() => isOuterPage? checkAuth(job.id) : push(job.apply_link)} className='p-3 bg-red-800 text-white rounded-lg hover:border-b-4 border-white border-2'>Apply</button>
                    : null
                }
            <button onClick={()=> isOuterPage? checkAuth(job.id) : push(`/admin/jobs/${job.id}`)} className='p-3 bg-white text-red-800 rounded-lg border-red-800 border hover:border-b-4'>View Details</button>
        </div>
    </div>
  )
}
