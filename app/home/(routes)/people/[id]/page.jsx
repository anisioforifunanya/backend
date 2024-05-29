'use client'
import React, { useState, useContext, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Spinner from '@/app/components/Spinner';
import Modal from '@/app/components/Modal';
import styles from '../../../styles/personPage.module.css'
import { IoArrowBackOutline, IoPeopleCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Image from 'next/image';
import {  formatTimeAgo, capitalize, socialLinkIcon } from '@/utils/stringHelperFuncts'
import { urlToEmbed } from '@/utils/stringHelperFuncts';
import { FaFemale, FaMale, FaFileAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaUser, FaUserCheck, FaUsers, FaArrowTrendUp } from 'react-icons/fa6';
import { fetchUser, followUser, unFollowUser } from '@/services/peopleService';
import PostsActivity from '../components/PostsActivity';
import JobsActivity from '../components/JobsActivity';
import EventsActivity from '../components/EventsActivity';
import ProductsActivity from '../components/ProductsActivity';


import dynamic from 'next/dynamic'
import Loader from '@/app/components/Loader';
import { toast } from 'react-toastify';
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), { ssr: false })

export default function page({ params }) {
    const { back, push } = useRouter();
    const { user } = useContext(AuthContext);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);
    const [refetch, setRefetch] = useState(0);
    const [data, setData] = useState(null);
    const [ currentTab, setCurrentTab ] = useState('posts');

    useEffect(() =>{
      fetchUser(params.id)
        .then(res => setData(res))
        .catch(()=>{
          notFound()
        })
    }, [refetch])
    
    useEffect(() => {
      if (user){
        if(user.id === data?.id ){
          setIsUpdateVisible(true)
        }
        if (user.following.includes(data?.username)){
          setIsFollowing(true)
        }
      }
    }, [user, data, refetch]);

    const toggleFollow = () => {
      if(isFollowing){
        setOpenModal(true)
        return
      }
      setIsLoadingFollow(true)
      followUser( user.id, data?.username)
      .then(res => {
          if(res !== 'error'){
            setRefetch(prev => prev + 1)
            setIsFollowing(true)
            toast.success(`You are now following ${data?.display_name}`)
          }
      }).finally(() => setIsLoadingFollow(false))
    }

    const handleUnfollow = () => { 
      setIsLoadingFollow(true)
      unFollowUser(user.id, data?.username)
      .then(res => {
        if(res !== 'error'){
          setRefetch(prev => prev + 1)
          setIsFollowing(false)
          toast.success(`You have unfollowed ${data?.display_name}`)
        }
    }).finally(() => setIsLoadingFollow(false))
      setOpenModal(false)
    }

      
    const other_pics = [
      'https://placehold.co/600x400/EEE/31343C?font=raleway&text=no%20cover%20picture',
      'https://placehold.co/600x400/EEE/31343C?font=raleway&text=no%20cover%20picture',
      'https://placehold.co/600x400/EEE/31343C?font=raleway&text=no%20cover%20picture'
    ]

    const otherPics = data?.other_pics?.length === 0 ? other_pics : data?.other_pics;

  return (
    <div className={"w-full flex flex-col p-[15px] overflow-y-auto"} style={{position:"relative"}}>
      <Modal 
          className={'text-black'}
          onClose={()=> setOpenModal(false)}
          isModalOpen={openModal} 
          title={'Hold On...'} 
          >
          <p className="mb-5 text-lg font-semibold">Are you sure you want to unfollow {data?.display_name}?</p>
          <div className="flex gap-2">
          <button 
              onClick={handleUnfollow} 
              className='p-3 rounded bg-[#f24429] text-white font-semibold w-[48%]'>Unfollow</button>
          <button 
              onClick={()=> setOpenModal(false)} 
              className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Close</button>
          </div>
      </Modal>
      <div className="h-fit">
       {data? (
           <>
              <button onClick={()=> back()} className="py-1 absolute left-4 font-medium px-2 flex place-items-center rounded border border-red-900 bg-white text-red-900 hover:text-white hover:bg-red-800 hover:scale-110 transition"><IoArrowBackOutline /> Back</button>

              <div className={'flex h-[200px] gap-3 overflow-x-auto pb-4'}>
                {otherPics?.slice(0, 5).map((pic, i) => (
                    <img key={i} src={pic || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=error%20loading%20image}'} alt='other pictures' className='flex-grow rounded-lg min-w-[250px] h-full object-cover'/>
                ))}
                <img  src={data.verify_pic_url || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=No%20Verification%20pic}'} alt='verification picture' title='Verification Picture' className='flex-grow rounded-lg min-w-[250px] h-full object-cover'/>
              </div>
              <div className="flex flex-col gap-3">

                <div className='flex gap-4 items-center mt-5 justify-between'>
                  <div className='flex gap-4 items-center'>
                    <img src={data.profile_pic_url || '/img/user.png'} alt={data.display_name} className=' border object-cover border-red-500 rounded-full w-16 h-16' />
                    <div>
                      <h1 className="text-2xl font-semibold flex">{data?.display_name} 
                        {!isUpdateVisible && 
                          <button 
                            className={`ml-4 p-2 hover:scale-110 text-white font-medium text-base rounded-lg ${isLoadingFollow? 'bg-slate-800' : isFollowing? 'bg-slate-500' : 'bg-red-400'} cursor-pointer hover:scale-110 transition flex gap-1 items-center`}
                            onClick={toggleFollow}
                            >
                              { isLoadingFollow? "Loading..." 
                              : isFollowing? "Following" : "Follow"}
                              {isLoadingFollow && <Loader />}
                          </button>}
                      </h1>
                      <p className="text-gray-500">@{data?.username}</p>
                    </div>
                  </div>
                  {isUpdateVisible && 
                    <button onClick={()=> push(`/home/people/${params.id}/edit`)} className="py-1 font-medium px-2 flex place-items-center rounded bg-yellow-200 text-yellow-800 hover:scale-110 transition"><RiEdit2Line /> Edit Profile</button>
                  }
                </div>
                <div className='flex flex-wrap gap-2 text-sm font-semibold mt-5'>
                  <p className="bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center"><FaUsers />{data.followers.length} Followers</p>
                  <p className="bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center"><FaUser />{data.following.length} Following</p>
                  {data.location && <p className="bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center"><FiMapPin />{data.location}</p>}
                  <p className="bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center">{data.gender == "male"? (<FaMale />) : (<FaFemale/>)} {capitalize(data.gender)}</p>
                </div>

               {data.bio && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaUserCheck />Bio</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line'>{data.bio}</p>
                </div>}

               {data.social_links?.length > 0 && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><IoPeopleCircleOutline />Socials</h4>
                  <div className='flex flex-wrap gap-2 text-sm font-semibold '>
                      {data.social_links?.map(({link, name}, i) => (
                        <a key={i} href={link} target='_blank' className='bg-gray-100 rounded-md p-2 shadow-sm flex gap-1 items-center hover:text-white hover:bg-black transition-colors'>{socialLinkIcon(name)} {capitalize(name)}</a>
                        ))}
                  </div>
                </div>}

                {data.work_experience && <div>
                  <h4 className=' font-semibold flex gap-1 items-center my-4'><FaFileAlt />Work Experience</h4>
                  <p className='bg-gray-100 rounded-md p-2 shadow-sm whitespace-pre-line'>{data.work_experience}</p>
                </div>}

                <h4 className='mt-9 font-semibold flex gap-1 items-center'><FaArrowTrendUp />Activity</h4>
                <div className="activity">
                  <div className={styles.activity_switcher}>
                    <label 
                      style={currentTab === 'posts'? {background:'#840606', color:'#fff'}: null} 
                      onClick={() => setCurrentTab('posts')}>
                        Posts
                    </label>
                    <label 
                      style={currentTab === 'jobs'? {background:'#840606', color:'#fff'}: null} 
                      onClick={() => setCurrentTab('jobs')}>
                        Jobs
                    </label>
                    <label 
                      style={currentTab === 'events'? {background:'#840606', color:'#fff'}: null} 
                      onClick={() => setCurrentTab('events')}>
                        Events
                    </label>
                    <label 
                      style={currentTab === 'products'? {background:'#840606', color:'#fff'}: null} 
                      onClick={() => setCurrentTab('products')}>
                        Products
                    </label>
                  </div>
                  <div className='w-full max-h-[600px] overflow-y-auto rounded-2xl p-3  border-gray-300 border mb-5 overflow-x-hidden'>
                    {currentTab === 'posts'? <PostsActivity userId={params.id} name={user?.id === data.id? "You" : data.display_name}/> 
                    : currentTab === 'jobs'? <JobsActivity userId={params.id} name={user?.id === data.id? "You" : data.display_name}/> 
                    : currentTab === 'events'? <EventsActivity userId={params.id} name={user?.id === data.id? "You" : data.display_name}/> 
                    : <ProductsActivity userId={params.id} name={user?.id === data.id? "You" : data.display_name}/>}
                  </div>
                </div>

                <MapComponent />
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
