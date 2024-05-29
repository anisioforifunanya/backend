'use client'
import React, { useState, useContext, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Spinner from '@/app/components/Spinner';
import Modal from '@/app/components/Modal';
import moment from 'moment';
import { IoArrowBackOutline, IoPeopleCircleOutline } from "react-icons/io5";
import { BsHouseCheck } from "react-icons/bs";
import {  capitalize, socialLinkIcon } from '@/utils/stringHelperFuncts'
import { FaFemale, FaMale, FaFileAlt, FaWhatsapp, FaBirthdayCake } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaUser, FaUserCheck, FaUsers, FaArrowTrendUp } from 'react-icons/fa6';
import { fetchUser } from '@/services/peopleService';


import Loader from '@/app/components/Loader';
import { toast } from 'react-toastify';
import { approveUser, rejectUser } from '@/services/adminService';

export default function page({ params }) {
    const { back, push } = useRouter();
    const { user } = useContext(AuthContext);
    const [refetch, setRefetch] = useState(0);
    const [data, setData] = useState(null);
    const [dismissModal, setDismissModal] = useState(false);
    const [dismissPending, setDismissPending] = useState(false);

    useEffect(() =>{
      fetchUser(params.id)
        .then(res => setData(res))
        .catch(()=>{
          notFound()
        })
    }, [refetch])

    const handleDismiss = () => {
        setDismissPending(true);
        rejectUser(params.id)
            .then((res) =>{
                if(res !== 'error'){
                    toast.success('User Dismissed')
                    push('/admin/users/requests')
                }
            }).finally(() => setDismissPending(false))
    }
    
  return (
    <div className={"w-full flex flex-col p-[15px] overflow-y-auto"} style={{position:"relative"}}>
      <div className="h-fit">
       {data? (
           <>
                <h1 className="text-3xl mt-2 text-white font-semibold">
                    Verification Picture
                    <hr />
                </h1>

              <div className={'gap-3 flex justify-center my-[50px]'}>
                    <img 
                        src={data.verify_pic_url || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=No%20Verification%20Pic}'} alt='verification picture' className='rounded-3xl h-[300px] w-[300px] object-cover object-center'/>
              </div>
              <h1 className="text-3xl mt-2 text-white font-semibold">
                    Personal Details
                    <hr />
                </h1>
              <div className="flex flex-col gap-3">

                <div className='flex gap-4 items-center mt-5 justify-between'>
                  <div className='flex gap-4 items-center'>
                    <img src={data.profile_pic_url || '/img/user.png'} alt={data.display_name} className=' border-2 object-cover border-white rounded-full w-16 h-16' />
                    <div>
                      <h1 className="text-2xl font-semibold flex">{data?.display_name} 
                      </h1>
                      <p className="text-white">@{data?.username}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2 text-sm text-black font-semibold mt-5'>
                  {data.location && <p className="bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center"><FiMapPin />{data.location}</p>}
                  <p className="bg-gray-100 rounded-md text-black p-2 shadow-sm flex gap-1 items-center">{data.gender == "male"? (<FaMale />) : (<FaFemale/>)} {capitalize(data.gender)}</p>
                </div>

                <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><BsHouseCheck />Address</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line text-black'>{data.address}</p>
                </div>

                <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaWhatsapp />Phone Number (WhatsApp)</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line text-black'>{data.phone_number}</p>
                </div>

                <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaBirthdayCake />Date of Birth</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line text-black'>{moment(data.birth_date).format('MMMM Do, YYYY')}</p>
                </div>

               {data.bio && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaUserCheck />Bio</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line text-black'>{data.bio}</p>
                </div>}

               {data.social_links?.length > 0 && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><IoPeopleCircleOutline />Socials</h4>
                  <div className='flex flex-wrap gap-2 text-sm font-semibold '>
                      {data.social_links?.map(({link, name}, i) => (
                        <a key={i} href={link} target='_blank' className='bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center text-black hover:text-white hover:bg-black transition-colors'>{socialLinkIcon(name)} {capitalize(name)}</a>
                        ))}
                  </div>
                </div>}

                {data.work_experience && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaFileAlt />Work Experience</h4>
                  <p className='bg-gray-100 rounded-md text-black p-2 shadow-sm whitespace-pre-line'>{data.work_experience}</p>
                </div>}

                <div className="flex w-full gap-3 items-center flex-wrap justify-center">
                    <button 
                        onClick={()=> setDismissModal(true)}
                        className="p-3 bg-red-600 text-lg transition min-w-[200px] hover:bg-red-900 flex-1 font-semibold rounded-xl">
                        Remove User
                    </button>
                </div>
                <Modal
                    isModalOpen={dismissModal}
                    onClose={() => setDismissModal(false)}
                    title="Dismiss User"
                    className="text-black"
                >
                    <p className='font-semibold'>Are you sure you want to dismiss this user</p>

                    <p className='text-red-600 font-semibold my-5'>Note: Dismissing this user will delete him/her from the entire system</p>
                    <div className="flex gap-2">
                    <button 
                        onClick={handleDismiss} 
                        className={`p-3 rounded text-white ${dismissPending ? 'bg-[#545454]' : 'bg-[#ff3c00]'} font-semibold w-[48%] flex items-center justify-center gap-2`}>{dismissPending? <>Loading <Loader /></>: 'Dismiss Request'}</button>
                    <button 
                        onClick={()=> setDismissModal(false)} 
                        className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Back</button>
                    </div>
                </Modal>
              </div>
           </>
       ) : 
        ( <div className="flex justify-center items-center w-full h-[90vh]">
            <Spinner />
        </div> )}
      </div>
    </div>
  )
}
