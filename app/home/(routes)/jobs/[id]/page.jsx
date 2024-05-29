'use client'
import React, { useState, useContext, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Spinner from '@/app/components/Spinner';
import styles from '../../../styles/Events.module.css'
import SectionHeader from '@/app/home/components/SectionHeader'
import {  formatTimeAgo, capitalize } from '@/utils/stringHelperFuncts'
import { urlToEmbed } from '@/utils/stringHelperFuncts';
import { FiMapPin } from "react-icons/fi";
import { FaRegBuilding } from 'react-icons/fa6';
import { fetchJob } from '@/services/jobsService';

export default function page({ params }) {
    const { push } = useRouter();
    const { user } = useContext(AuthContext);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [data, setData] = useState(false);

    useEffect(() =>{
      fetchJob(params.id)
        .then(res => setData(res))
        .catch(()=>{
          notFound()
        })
    }, [])
    
    useEffect(() => {
      if (user){
        if(user.id === data?.posted_by ){
          setIsUpdateVisible(true)
        }
      }
    }, [user, data]);
      
      
  return (
    <div className={styles.eventDetail}>
      <div className="h-fit">
       {data? (
           <>
              <SectionHeader text={data.title} canUpdate={isUpdateVisible} id={data?.id} type="Job"/>
               <div className="flex w-full justify-between items-center mb-4">
                    <div>
                        <p className="font-semibold text-xl flex gap-1 place-items-center">
                          <FaRegBuilding />
                          {data.company}
                        </p>
                        <div className="flex gap-1 items-center">
                            <p className="flex place-items-center gap-2">
                              {formatTimeAgo(data.date_created)} |
                              <span className='flex gap-1 items-center'><FiMapPin /> {data.location}</span>
                              <span className='bg-red-700 text-white px-2 font-medium rounded-lg'>{data.job_type}</span>
                            </p>
                        </div>
                    </div>
               </div>
                <div>
                  <p className='font-semibold text-lg'>
                    Employment Type: {" "}
                      {capitalize((
                        data.employment_type == "full_time"? 'Full Time' 
                        : data.employment_type == "part_time" ? 'Part Time'
                        : data.employment_type))}
                  </p>
                  <p className="py-2 px-3 bg-red-100 whitespace-pre-wrap rounded-xl my-4">
                    {data.description}
                  </p>

                </div>
                { data.apply_link? 
                  <button onClick={() => push(data.apply_link)}
                    className={`p-3 w-full text-xl text-center justify-center font-semibold flex gap-2 items-center hover:scale-[1.01] transition-all my-6 rounded-lg ${false ? 'text-red-800 border border-red-800' : 'text-white bg-red-800'}`}>  
                      Apply For This Job
                  </button>
                  : null
                }
                <iframe
                  className={styles.mapIframe}
                  frameBorder="0"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={urlToEmbed(data.location) ? urlToEmbed(data.location) : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.63647931907!2d3.1191491406398058!3d6.5480282454496646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1709906873224!5m2!1sen!2sng"}
                  allowFullScreen>
                </iframe>
           </>
       ) : 
        ( <div className="flex justify-center items-center w-full h-[90vh]">
            <Spinner />
        </div> )}
      </div>
    </div>
  )
}
