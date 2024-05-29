'use client'
import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import styles from '../../styles/Map.module.css'
import { AuthContext } from '@/context/authContext';
import dynamic from 'next/dynamic'
import { fetchUserLocations } from '@/services/mapService'
import { useRouter } from 'next/navigation';
import LocationBtn from '@/app/components/LocationBtn'
import Error from '@/app/components/Error';
import moment from 'moment';
import { sortLastSeen } from '@/utils/stringHelperFuncts';
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), { ssr: false })

export default function page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  const [rebound, setRebound] = useState(false);

  const reboundMap = () => {
    setRebound(true)
    console.log('rebounded')
    setTimeout(() => setRebound(false), 3000)
  }


  useEffect(() => {
    fetchUserLocations()
     .then(data => {
          if(data !== 'error'){
            setData(sortLastSeen(data))
          } else {
            setError(true)
          }
      })
  },[data])
  return (
    <div className='w-full p-4 h-full flex flex-col overflow-y-auto gap-5'>
      <div className='h-[300px] z-20'>
        <MapComponent locations={data} handleRebound={rebound}/>
      </div>
      <div>
        {user && <LocationBtn userId={user.id} handleRebound={reboundMap} rebound={rebound} />}
      </div>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">People</h1>
        </div>
        <div className="flex flex-col gap-2">
          {error && <Error className={'w-[150px] h-auto'} />}
          {data?.map(user => (
            <div 
              key={user.id} 
              onClick={() => push(`/home/people/${user.id}`)}
              className="flex cursor-pointer hover:bg-red-200 transition items-center gap-2 bg-red-100 rounded-2xl p-2">
              <img src={user.profile_pic || '/img/user.png'} alt={user.display_name} className="w-10 h-10 rounded-full object-cover border border-red-500"/>
              <div className='w-full items-center justify-between flex-row flex'>
                <p className="font-semibold">{user.display_name}</p>
                <p className="text-sm">{moment(user.last_seen).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
