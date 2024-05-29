'use client'
import {useState, useContext, useEffect} from 'react'
import styles from '../styles/UserCard.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext'
import { randomHex } from '@/utils/stringHelperFuncts'
import Loader from '../Loader'
import { followUser } from '@/services/peopleService';
import { unFollowUser } from '@/services/peopleService'
import { toast } from 'react-toastify'
import Modal from '../Modal'

export default function UserCard({user, handleClick, removeFollow}) {
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (authUser?.following.includes(user.username)){
      setIsFollowing(true)
    }
  }, [authUser]);

  const toggleFollow = () => {
    if(isFollowing){
      setOpenModal(true)
      return
    }
    if(!authUser){
      handleClick(user.id)
      return
    }
    setIsLoadingFollow(true)
    followUser( authUser?.id, user.username)
    .then(res => {
        if(res !== 'error'){
          setIsFollowing(true)
          toast.success(`You are now following ${user?.display_name}`)
        }
    }).finally(() => setIsLoadingFollow(false))
  }

  const handleUnfollow = () => { 
    setIsLoadingFollow(true)
    unFollowUser(authUser?.id, user.username)
    .then(res => {
      if(res !== 'error'){
        setIsFollowing(false)
        toast.success(`You have unfollowed ${user?.display_name}`)
      }
  }).finally(() => setIsLoadingFollow(false))
    setOpenModal(false)
  }

  return (
<div 
  className={styles.card} 
  style={{backgroundImage:user.other_pics[0] ? `url("${user.other_pics[0]}")` : `url(https://placehold.co/600x400/${randomHex()}/31343C?font=raleway&text=${user.username.replaceAll(" ", "_")}`}}
  >
    <Modal 
          className={'text-black'}
          onClose={()=> setOpenModal(false)}
          isModalOpen={openModal} 
          title={'Hold On...'} 
          >
          <p className="mb-5 text-lg font-semibold">Are you sure you want to unfollow {user.display_name}?</p>
          <div className="flex gap-2">
          <button 
              onClick={handleUnfollow} 
              className='p-3 rounded bg-[#f24429] text-white font-semibold w-[48%]'>Unfollow</button>
          <button 
              onClick={()=> setOpenModal(false)} 
              className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Close</button>
          </div>
      </Modal>
    <div 
      className={styles.overlay}
      onClick={()=> handleClick(user.id)}
      ></div>
    <div className={styles.userCardBottom}>
      <div>
        <Image width={40} height={40} alt='profile-pic' src={user.profile_pic_url ||  '/img/user.png'} />
        <div>
          <p className='text-white'>{user.display_name || "User"}</p>
          <p className='text-white text-sm '>@{user.username}</p>
        </div>
      </div>
      {/* <button className='bg-red-400 rounded-md text-white p-2 font-medium'>Follow</button> */}
      {!removeFollow && <button 
          className={`ml-4 p-2 hover:scale-110 text-white font-medium text-base rounded-lg ${isLoadingFollow? 'bg-slate-800' : isFollowing? 'bg-slate-500' : 'bg-red-400'} cursor-pointer hover:scale-110 transition flex gap-1 items-center`}
          onClick={toggleFollow}
          >
            { isLoadingFollow? "Loading..." 
            : isFollowing? "Following" : "Follow"}
            {isLoadingFollow && <Loader />}
        </button>}
    </div>
</div>
  )
}
