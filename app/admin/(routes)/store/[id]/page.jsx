'use client'
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Spinner from '@/app/components/Spinner';
import styles from '@/app/admin/(routes)/events/events.module.css'
import SectionHeader from '@/app/home/components/SectionHeader'
import {  formatTimeAgo, capitalize, formatCurrency } from '@/utils/stringHelperFuncts'
import { urlToEmbed } from '@/utils/stringHelperFuncts';
import { FiMapPin } from "react-icons/fi";
import { MdOutlineCategory, MdOutlineMessage, MdPhone, MdPhoneInTalk } from "react-icons/md";
import { fetchProduct } from '@/services/storeService';
import Error from '@/app/components/Error';

export default function page({ params }) {
    const { push } = useRouter();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{
      fetchProduct(params.id)
        .then(res =>{
          if(res !== 'error'){
            setData(res)
          } else{
            setError(true)
          }
        })
        .finally(()=> setLoading(false))
    }, [])
      
  return (
    <div className={styles.eventDetail}>
      <div className="h-full">
       {data? (
           <>
              <SectionHeader text={data.title} canUpdate={true} id={data.id} type="Product"/>
               <div className="flex w-full justify-between items-center mb-4">
                    <div className='w-full'>
                        <p className='font-semibold text-2xl mb-4 text-[#90ff82]'>
                        {'₦' + formatCurrency(data.price)}
                      </p>
                      <img 
                        src={data.picture_url ||'https://placehold.co/600x400/EEE/31343C?font=raleway&text=No%20Product%20Image' } 
                        alt="Product Image"
                        className="w-full h-[250px] border-2 border-red-300 object-cover rounded-[10px] my-2"
                      />
                        <p className="font-semibold text-xl flex gap-1 place-items-center">
                          <MdOutlineCategory />
                          {capitalize(data.category || 'generic')}
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
                  <p className='font-semibold text-xl mb-1'>Description</p>
                  <p className="py-2 px-3 bg-red-100 text-black whitespace-pre-wrap rounded-xl mb-4">
                    {data.description}
                  </p>
                  <p className='font-semibold text-xl mb-1'>Contact Seller</p>
                    <div className='flex justify-center items-center flex-wrap mb-4 gap-3'>
                      <button 
                        className='flex gap-2 rounded-lg p-3 font-semibold text-white w-[48%] flex-grow hover:bg-red-900 bg-red-700 transition-colors items-center'
                        onClick={() => push(`/messages/${data.posted_by}`)}
                        >
                        <MdOutlineMessage />
                        Message
                      </button>
                      <a 
                        className='flex gap-2 rounded-lg p-3 font-semibold text-white w-[48%] flex-grow hover:bg-red-900 bg-red-700 transition-colors items-center' 
                        href={`tel:${data.phone_no?.replace(' ', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <MdPhoneInTalk />
                        Phone ({data.phone_no})
                        </a>
                    </div>

                </div>
                <iframe
                  className={styles.mapIframe}
                  frameBorder="0"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={urlToEmbed(data.location) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.63647931907!2d3.1191491406398058!3d6.5480282454496646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1709906873224!5m2!1sen!2sng"}
                  allowFullScreen>
                </iframe>
           </>
       )
        : loading?
        ( <div className="flex justify-center items-center w-full h-[90vh]">
            <Spinner />
        </div> )
        : error? (
          <>
            <Error className="w-[150px] h-auto" >
              <button 
                onClick={() => push('/home/market')}
                className='bg-red-500 rounded-lg transition-all text-white font-semibold p-3 hover:scale-105'>
                Back to Market
              </button>
            </Error>
          </>
        ) : null}
      </div>
    </div>
  )
}
