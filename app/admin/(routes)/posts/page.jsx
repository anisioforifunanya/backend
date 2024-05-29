'use client'
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5"; 
import { BsBriefcase, BsEnvelopePlus } from "react-icons/bs";
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import { fetchPosts } from '@/services/postService';
import Post from './components/Post';
import SearchBar from '@/app/components/SearchBar';
import NoResults from '@/app/components/NoResults';
import Error from '@/app/components/Error';

export default function page() {
  const { push } = useRouter();
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);
  const [notFound, setNotFound] = useState(false)
  const queryParams = useSearchParams();
  const [error, setError] = useState(false)


  useEffect(() => {
    fetchPosts()
      .then(data => {
        setData(data);
      })
      .catch(error => setError(true))
    }, []);

    useEffect(() => {
      const query = queryParams.get('query');
        if(query && data){
          const filteredResults = data?.filter(post => { 
            return post.content.toLowerCase().includes(query.toLowerCase())
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

    const handlePostDelete = (id) =>{
      setData(prev => prev.filter(post => post.id !== id))
    }

  return (
    <>
      <div className='w-full sticky top-5 z-30 flex justify-center'>
        <SearchBar placeholder={'Search posts...'}  />
      </div>
      <div className='flex flex-col w-full overflow-y-auto mt-8 items-center p-2'>
        <div className='w-full justify-center gap-5'>
        {results?
            <div className='my-4 animate-fadeup justify-center'>
              {results.map(post => (<Post post={post} key={post.id} handleDeleteFilter={handlePostDelete} />))}
              {notFound && <NoResults className='w-[150px] h-auto' />}
            </div>
          : !error ?
          <div className='h-full w-full flex justify-center items-center'>
            <Spinner />
          </div> : 
          <Error className={'w-[150px] h-auto'}/>}
        </div>
      </div>
    </>
  )
}
