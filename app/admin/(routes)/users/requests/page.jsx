'use client'
import { fetchRequests } from '@/services/adminService'
import {useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext'
import UserCard from '@/app/components/people/userCard';
import Spinner from '@/app/components/Spinner';
import Error from '@/app/components/Error';

export default function page() {
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchRequests(true)
          .then(res => {
            if(res !== 'error'){
              setUsers(res);
            } else{
              setError(true)
            }
          }).finally(() => setLoading(false))
    }, [])

  return (
    <main className='flex flex-1 gap-3 justify-center w-full h-full'>
        { users?.map(user => (
          <UserCard 
            user={user} 
            key={user.id} 
            handleClick={() => push(`/admin/users/requests/${user.id}`)}
            removeFollow={true}
          />))}
        
        {users?.length === 0 &&
          <div className="flex flex-1 justify-center items-center h-full">
            <h1 className="text-3xl font-semibold">No Requests Yet</h1>
          </div>
        }
        {loading && <Spinner centered />}
        {error && <Error className={'w-[150px] h-auto'} />}
    </main>
  )
}
