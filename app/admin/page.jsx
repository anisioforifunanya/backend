'use client'
import { adminStats } from '@/services/adminService'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../components/Spinner'
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const { push } = useRouter();
  useEffect(() => {
    adminStats().then(data => {
      console.log(data)
      setStats(data)
    })
  }, [])
  return (
    <main className='h-full'>
        <h1 className='text-2xl font-semibold mb-3'>Stats</h1>
        {stats ? 
          <div className='grid grid-cols-2 grid-rows-2 gap-4 h-[90%] text-3xl'> 
            <div 
              onClick={()=> push('/admin/users')}
              className="col-span-1 row-span-1 rounded-2xl justify-center items-center font-bold border border-[#757677] bg-[#00000022] backdrop-blur-md p-1 flex cursor-pointer">
              {stats?.users} {stats?.users == 1 ? 'User': 'Users'} 
            </div> 
            <div 
              onClick={()=> push('/admin/jobs')}
              className="col-span-1 row-span-1 rounded-2xl justify-center items-center font-bold border border-[#757677] bg-[#00000022] backdrop-blur-md p-1 flex cursor-pointer"> 
                {stats?.jobs} {stats?.jobs == 1 ? 'Job': 'Jobs'} 
            </div> 
            <div 
              onClick={()=> push('/admin/events')}
              className="col-span-1 row-span-1 rounded-2xl justify-center items-center font-bold border border-[#757677] bg-[#00000022] backdrop-blur-md p-1 flex cursor-pointer">
              {stats?.events} {stats?.events == 1 ? 'Event': 'Events'} 
            </div> 
            <div 
              onClick={()=> push('/admin/store')}
              className="col-span-1 row-span-1 rounded-2xl justify-center items-center font-bold border border-[#757677] bg-[#00000022] backdrop-blur-md p-1 flex cursor-pointer"> 
              {stats?.products} {stats?.products == 1 ? 'Product': 'Products'} 
            </div> 
          </div> :
          <Spinner centered />}
    </main>
  )
}
