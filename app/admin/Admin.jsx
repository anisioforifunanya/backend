'use client'
import Navbar from './components/navbar'
import Sidebar from './components/Sidebar'
import { Suspense } from 'react'
import Main from './components/Main'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'
import './styles/admin.css'
import useFetchUser from '@/hooks/useFetchUser'
import { fetchRequests } from '@/services/adminService'

export default function Admin({ children }) {
  useFetchUser('admin');
  const { user } = useContext(AuthContext);
  const [requestNum, setRequestNum] = useState(0);

  useEffect(()=>{
    if (user){   
      fetchRequests()
        .then(res => {
          if(res !== 'error'){
            console.log(res)
            setRequestNum(res.length || 0)
          }
        })
    }
  }, [user]);

  return (
    <div className='admin_wrapper'>
      <Sidebar requestNum={requestNum} />
      <div className='main_panel'>
        <Navbar />
        <Main >
          <Suspense>
            { children }
          </Suspense>
        </Main>
      </div>
    </div>
  )
}
