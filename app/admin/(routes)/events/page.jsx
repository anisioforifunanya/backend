'use client'
import useEvents from '@/hooks/useEvents'
import { useEffect, useState } from 'react'
import Spinner from '@/app/components/Spinner'
import EventTile from './components/EventTile'
import Error from '@/app/components/Error'
import SearchBar from '@/app/components/SearchBar'
import { useSearchParams } from 'next/navigation'
import NoResults from '@/app/components/NoResults'

export default function page() {
  const { data, isPending, error } = useEvents();
  const [notFound, setNotFound] = useState(false)
  const [results, setResults] = useState(null);
  const queryParams = useSearchParams();

  useEffect(() => {
      const query = queryParams.get('query');
      if(query && data){
        const filteredResults = data?.filter(event => { 
          return event.title.toLowerCase().includes(query.toLowerCase()) || event.location.toLowerCase().includes(query.toLowerCase()) 
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

  return (
    <main className="flex w-full overflow-y-auto relative flex-col items-center h-full">
      {results ? 
          (
            <>
              <h2 className="text-2xl font-semibold w-full p-5">All Events</h2>
                <div className='w-full sticky top-5 z-30 flex justify-center'>
                  <SearchBar placeholder={'Search events...'}  />
                </div>
              <div className="flex w-full gap-[10px] p-4 mt-4 justify-center flex-wrap">
                {results.map(event => (
                  <EventTile key={event.id} event={event} />
                ))}
                {notFound && <NoResults className='w-[150px] h-auto' />}
              </div>
            </>
          ) : !error ?
            <div className='h-full w-full flex justify-center items-center'>
              <Spinner />
            </div> :
          <Error className={'w-[150px] h-auto'}/>}
    </main>
  )
}
