'use client'
import React, { useEffect, useState, useContext } from 'react'
import { fetchUsers } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import UserCard from '../../../components/people/userCard'
import { notFound, useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext';



export default function page() {
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();

  const [users, setUsers] = useState(null)
  useEffect(() => {
   if(authUser) {fetchUsers(true)
      .then(data => {
        if(data === 'error'){
            notFound()
        } else {
          setUsers(data.filter(user => user.id !== authUser.id))
        }
      })}
  }, [authUser])

  const redirectUser = (id) => {
   push(`/home/people/${id}`)
  }

  return (
    <div className='flex flex-col w-full items-center p-[30px] h-[calc(100vh-70px)] overflow-y-auto'>
      {users?
        <div className='flex gap-3 my-4 flex-wrap animate-fadeup justify-center'>
          {users.map(user => (<UserCard user={user} key={user.id} handleClick={redirectUser} />))}
        </div>
      : <Spinner />}
    </div>
  )
}
