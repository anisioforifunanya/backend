'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { suggestedProfiles } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import SuggestedPersonHome from './SuggestedPersonHome'
import SkeletonLoader from '@/app/components/SkeletonLoader'
import Error from '@/app/components/Error'

export default function PopularProfiles() {
  const [suggestedPeople, setSuggestedPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    suggestedProfiles().then(data => {
      if(data === 'error'){
        setError(true)
      }else{
        setSuggestedPeople(data)
      }
    }).then(() => setLoading(false))
  }, [])

  return (
    <div className="popular_profiles">
      <div className="popular_profiles_header">
        <h2>Suggested Profiles</h2>
        <Link href="./home/people">See All</Link>
      </div>
      <div className="popular_profiles_list">
        {loading && <SkeletonLoader />}
        {error && <Error className={'w-[150px] my-5 h-auto'}/>}
        {!loading && !error &&
          suggestedPeople?.map((person, index) => (
            <SuggestedPersonHome key={index} person={person} />
        ))}
      </div>
    </div>
  )
}
