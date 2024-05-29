'use client'
import useEvents from '@/hooks/useEvents'
import { eventCategoryIcons } from '@/utils/stringHelperFuncts'

import Link from 'next/link'
import {toast} from 'react-toastify'
import Spinner from '@/app/components/Spinner'
import EventSlider from './components/EventSlider'
import EventTile from './components/EventTile'
import styles from '../../styles/Events.module.css' 

import { AllEventCategories } from '@/mockServer'


export default function page() {
  const { data, isPending, error } = useEvents();

  if (error) {
    toast.error(error)
  }

  return (
    <main className={styles.eventsMain} style={{display: 'block'}}>
      {data ? 
          (
            <>
              <EventSlider slides={data} />
              <div className={styles.EventsHeader}>
                <h2 className="text-2xl font-semibold">Featured Events</h2>
                <Link href="/home/events/create">Add Your Event!</Link>
              </div>
              <div className={styles.eventTiles}>
                {data.slice()
                      .sort((eventA, eventB) => eventB.likes - eventA.likes) 
                      .slice(0, 6)
                      .map(event => (
                  <EventTile key={event.id} event={event} />
                ))}
              </div>
              <h2 className="text-2xl font-semibold w-full p-5">Categories</h2>
              <div className='overflow-x-auto rounded-xl border mx-4'>
                <div className={'flex gap-2 flex-wrap w-[1900px] mx-auto h-[160px] p-2 '}>
                    {AllEventCategories.map((category, index) => (
                      <Link className='h-0' key={index} href={`/home/search?query=${category.name}&type=events`}>
                          <p className="flex items-center gap-1 text-xs rounded-xl border border-red-800 w-[160px] h-[65px] text-center justify-center transition hover:text-white font-semibold hover:bg-red-800">
                            <span className="text-xl">
                              {eventCategoryIcons(category.name)}
                            </span>
                            {category.displayName}
                          </p>
                      </Link>
                    ))}
                  </div>
              </div>
              <h2 className="text-2xl font-semibold w-full p-5">All Events</h2>
              <div className={styles.AllEventTiles}>
                {data.map(event => (
                  <EventTile key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : !error ? <Spinner type="" /> :
          <p>Failed to fetch</p>}
    </main>
  )
}
