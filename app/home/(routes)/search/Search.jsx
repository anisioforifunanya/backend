'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PeopleSearch from './components/PeopleSearch';
import EventsSearch from './components/EventsSearch';
import JobsSearch from './components/JobsSearch';
import ProductsSearch from './components/ProductsSearch';
import PostSearch from './components/PostSearch';
import SearchBar from '@/app/components/SearchBar';

export default function Search() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [currentTab, setCurrentTab] = useState('people');
 
  useEffect(() => {
    setQuery(searchParams.get('query'))
    if(searchParams.get('type')){
      setCurrentTab(searchParams.get('type'))
    }
  }, [pathname, searchParams])

 const Prompt = () => (
  <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
        <img src="/search.svg" alt="error" className={'w-[150px] h-auto'} />
        <h1 className='text-xl font-bold'>Type in the searchbar above!</h1>
    </div>
 )

  return (
    <div className='w-full p-3 overflow-y-auto'>
      <Suspense>
        <div className={`w-full flex justify-center mb-4 hideSearchBar`}>
          <SearchBar size='small' placeholder={'Search people, posts...'} newRoute={'/home/search'} fullWidth={true}/>
        </div>
      </Suspense>
      <div className="flex w-full gap-2 overflow-x-auto pb-3">
        <button
          onClick={()=> setCurrentTab('people')} 
          className={`custom-button ${currentTab === 'people' ? 'custom-button-active' : 'custom-button-inactive'}`}>
          People
        </button>
        <button
          onClick={()=> setCurrentTab('posts')} 
          className={`custom-button ${currentTab === 'posts' ? 'custom-button-active' : 'custom-button-inactive'}`}>
          Posts
        </button>
        <button
          onClick={()=> setCurrentTab('jobs')} 
          className={`custom-button ${currentTab === 'jobs' ? 'custom-button-active' : 'custom-button-inactive'}`}>
          Jobs
        </button>
        <button
          onClick={()=> setCurrentTab('events')} 
          className={`custom-button ${currentTab === 'events' ? 'custom-button-active' : 'custom-button-inactive'}`}>
          Events
        </button>
        <button
          onClick={()=> setCurrentTab('products')} 
          className={`custom-button ${currentTab === 'products' ? 'custom-button-active' : 'custom-button-inactive'}`}>
          Products
        </button>
      </div>
      <div className="border-t w-full h-full mt-3 border-gray-300">
        { !query? <Prompt />
         : currentTab == 'people' ? <PeopleSearch query={query} />
         : currentTab == 'events' ? <EventsSearch query={query} />
         : currentTab == 'jobs' ? <JobsSearch query={query} />
         : currentTab == 'products' ? <ProductsSearch query={query} />
         : <PostSearch query={query} /> }
      </div>
    </div>
  );
}