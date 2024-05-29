'use client'
import React, { useEffect, useState, useContext } from 'react'
import { search } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import UserCard from '@/app/components/people/userCard'
import Error from '@/app/components/Error'
import NoResults from '@/app/components/NoResults';

export default function PeopleSearch({query}) {
    const { user: authUser } = useContext(AuthContext);
    const { push } = useRouter();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {
     if(authUser) {
        setLoading(true)
        setUsers(null)
        search("users", query)
          .then(data => {
            if(data === 'error'){
                setError(true)
            } else {
                setUsers(data.filter(user => user.id !== authUser.id))
            }
        }).finally(()=> setLoading(false))
      }}, [authUser, query])
  
    const redirectUser = (id) => {
     push(`/home/people/${id}`)
    }
  return (
    <div className='flex flex-col w-full items-center p-[15px] h-[calc(100vh-70px)] overflow-y-auto'>
        {users?.length > 0?
          <>
            <div className='flex gap-3 flex-wrap animate-fadeup justify-center w-full'>
                {users.map(user => (<UserCard user={user} key={user.id} handleClick={redirectUser} />))}
            </div>
            <h2 className="text-center-font-semibold text-xl mt-[15px]">End of search results!</h2>
          </>
        : users?.length === 0? 
            <NoResults className={'w-[150px] h-auto'}/>
        : loading ?
            <Spinner centered />
        : error? <Error className={'w-[150px] h-auto'}/>
        : null}
    </div>
  )
}
