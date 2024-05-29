'use client'
import React, { useState, useContext, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Image from 'next/image'
import useEvent from '@/hooks/useEvent'
import useAttendEvent from '@/hooks/useAttendEvent';
import { toast } from 'react-toastify'
import Spinner from '@/app/components/Spinner';
import styles from '../../../styles/Events.module.css'
import SectionHeader from '@/app/home/components/SectionHeader'
import { formatDateShort, convertTo12HourTime } from '@/utils/stringHelperFuncts'
import { eventCategoryIcons } from '@/utils/stringHelperFuncts';
import { AllEventCategories } from '@/mockServer';
import { urlToEmbed } from '@/utils/stringHelperFuncts';
import Loader from '@/app/components/Loader';

import { MdAccessTime } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { FaVideo } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

export default function page({ params }) {
    const { user } = useContext(AuthContext);
    const { data, isPending, error  } = useEvent(params.id);
    const { isLoading, bookEvent } = useAttendEvent();
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    
    useEffect(() => {
      if (user){
        if(user?.id === data?.created_by ){
          setIsUpdateVisible(true)
        }
      }
      
        if (error) {
          toast.error(error, { theme: 'light' })
          notFound();
        }
      
      setIsBooked(user?.user_events.includes(data?.id))
      }, [user, error, data]);
      
      const attendEvent = async () => {
        await bookEvent(data?.id);
        setIsBooked(prev => !prev)
      }
      
  return (
    <div className={styles.eventDetail}>
      <div className="h-fit">
       {data? (
           <>
                <SectionHeader text={data?.title} canUpdate={isUpdateVisible} id={data?.id} />
               <Image priority={true} src={data?.picture || 'https://placehold.co/600x400/png?text=Event+Image'} height={250} width={800} alt={data?.title}/>
               <div className="flex w-full justify-between items-center my-4">
                    <div>
                        <p className="font-bold text-xl flex gap-2 place-items-center">
                          {data?.organizer}
                        </p>
                        <div className="flex gap-1 items-center">
                            <p className="flex items-center gap-2 ">
                              {/* <FcLike/> {data?.likes || 0} Likes  |  */}
                              <BsPeople /> {data?.attendees == 0? "No" : data.attendees} Attendee{data?.attendees > 1 ? 's' : ""}
                              {isBooked && <span className='bg-green-600 text-white px-2 font-medium rounded-lg'>Booked</span>}
                            </p>
                        </div>
                    </div>
                    <button 
                      onClick={() => attendEvent()} 
                      className={`p-2 text-md font-semibold flex gap-2 items-center rounded-lg ${isBooked ? 'text-red-800 border border-red-800' : 'text-white bg-red-800'} ${isLoading && 'text-white bg-slate-600'}`}>  
                        {isLoading? 'Loading' : isBooked? "Cancel" : "RSVP"}
                        {isLoading && <Loader />}
                    </button>
               </div>

               <div className="flex justify-between items-center">
                  <div className='flex flex-col gap-2'>
                    <p className="flex place-items-center gap-1 font-semibold"><SlCalender /> {formatDateShort(data?.date)}</p>
                    <p className="flex place-items-center gap-1 font-semibold"><MdAccessTime /> {convertTo12HourTime(data?.time)}</p>
                    <p className="flex place-items-center gap-1 font-semibold"><FiMapPin /> {data?.location}</p>
                  </div>
                  <p 
                      className="p-2 border border-red-800 text-red-800 flex place-items-center rounded w-fit cursor-pointer my-2">{eventCategoryIcons(data?.category)}{
                    AllEventCategories
                    .filter(category => category.name == data?.category )
                    .map(item => item.displayName)}
                  </p>

               </div>
              
               {data?.virtual_url ? 
                <a 
                    className="flex place-items-center gap-1 hover:underline cursor-pointer" 
                    href={data?.virtual_url}
                    target="_blank">
                      <FaVideo/>Meeting Link
                </a> : null}
                  <iframe
                    className={styles.mapIframe}
                    frameBorder="0"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={urlToEmbed(data?.google_map_link) ? urlToEmbed(data?.google_map_link) : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.63647931907!2d3.1191491406398058!3d6.5480282454496646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1709906873224!5m2!1sen!2sng"}
                    allowFullScreen>
                  </iframe>

           </>
       ) : 
        ( <div className="flex justify-center items-center w-full h-full">
            <Spinner />
        </div> )}
      </div>
    </div>
  )
}
