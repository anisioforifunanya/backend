'use client'
import React, { useEffect, useState, useContext } from 'react'
import { fetchUsers } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import UserCard from '../../../components/people/userCard'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { AuthContext } from '@/context/authContext';
import Error from '@/app/components/Error'
import NoResults from '@/app/components/NoResults'
import SearchBar from '@/app/components/SearchBar'



export default function page() {
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();
  const [notFound, setNotFound] = useState(false)
  const [results, setResults] = useState(null);
  const queryParams = useSearchParams();
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
   if(authUser) {fetchUsers(true)
      .then(data => {
        if(data === 'error'){
            setError(true)
        } else {
          setData(data.filter(user => user.id !== authUser.id))
        }
      })}
  }, [authUser])

  useEffect(() => {
    const query = queryParams.get('query');
    if(query && data){
      const filteredResults = data?.filter(item => { 
        return item.display_name.toLowerCase().includes(query.toLowerCase()) || item.username.toLowerCase().includes(query.toLowerCase()) 
      })
      
      if(filteredResults?.length > 0){
        setResults(filteredResults);
        setNotFound(false)
      } else {
        setNotFound(true)
        setResults([])
      }
    } else if(data){
      setNotFound(false)
      setResults(data)
    }
}, [queryParams, data])

  const redirectUser = (id) => {
   push(`/admin/users/${id}`)
  }

  return (
    <>
      <div className='w-full sticky top-5 z-30 flex justify-center'>
        <SearchBar placeholder={'Search people...'}  />
      </div>
      <div className='flex flex-col w-full items-center p-[30px] h-[calc(100vh-70px)] overflow-y-auto'>
        {results?
          <div className='flex gap-3 my-4 flex-wrap animate-fadeup justify-center'>
            {results.map(user => (<UserCard user={user} key={user.id} handleClick={redirectUser} />))}
            {notFound && <NoResults className='w-[150px] h-auto' />}
          </div>
        : !error ?
        <div className='h-full w-full flex justify-center items-center'>
          <Spinner />
        </div> : 
        <Error className={'w-[150px] h-auto'}/>}
      </div>
    </> 
  )
}
