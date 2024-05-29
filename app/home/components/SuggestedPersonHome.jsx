'use client'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '@/context/authContext'
import { followUser, unFollowUser } from '@/services/peopleService'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Modal from '@/app/components/Modal'
import Loader from '@/app/components/Loader'

export default function SuggestedPersonHome({person}) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [followers, setFollowers] = useState(person.followers);

    const { user: authUser } = useContext(AuthContext);

    useEffect(() => {
        if (authUser?.following.includes(person.username)){
          setIsFollowing(true)
        } else{
            setIsFollowing(false)
        }
      }, [authUser]);
    

    const toggleFollow = () => {
        if(isFollowing){
          setOpenModal(true)
          return
        }
        setIsLoadingFollow(true)
        followUser( authUser?.id, person.username)
        .then(res => {
            if(res !== 'error'){
              setIsFollowing(true)
              setFollowers(prev => prev + 1 )
              toast.success(`You are now following ${person?.display_name}`)
            }
        }).finally(() => setIsLoadingFollow(false))
      }
    
      const handleUnfollow = () => { 
        setIsLoadingFollow(true)
        unFollowUser(authUser?.id, person.username)
        .then(res => {
          if(res !== 'error'){
            setIsFollowing(false)
            setFollowers(prev => prev - 1)
            toast.success(`You have unfollowed ${person?.display_name}`)
          }
      }).finally(() => setIsLoadingFollow(false))
        setOpenModal(false)
      }

    const {push} = useRouter()
    return (
        <div className="popular_profile_home">
            <div>
                <img 
                    onClick={() => push(`/home/people/${person.id}`)}
                    className='cursor-pointer'
                    src={person.profile_pic_url || '/img/user.png'} 
                    alt={person.display_name|| 'user'} 
                    height={35} 
                    width={35}/>
                <div>
                    <p className="font-bold leading-tight">{person.display_name}</p>
                    <p className="text-sm text-gray-400">
                      {followers} {followers === 1? 'follower' : 'followers'}</p>
                </div>
            </div>
            <button 
                onClick={()=>toggleFollow()} 
                style={isLoadingFollow? {
                            background:"#888", 
                            color:"#fff", 
                            minWidth:"0", 
                            cursor:"wait",
                            display:"flex",
                            padding:'4px'
                        } : isFollowing? {
                            border:"2px solid #f54747", color:"#f54747", 
                            background:"#fff"} : {}}
            >
                {isLoadingFollow ? <Loader /> : isFollowing? "Unfollow" : "Follow"}
            </button>
            <Modal 
                className={'text-black'}
                onClose={()=> setOpenModal(false)}
                isModalOpen={openModal} 
                title={'Hold On...'} 
                >
                <p className="mb-5 text-lg font-semibold">Are you sure you want to unfollow {person.display_name}?</p>
                <div className="flex gap-2">
                <button 
                    onClick={handleUnfollow} 
                    className='p-3 rounded bg-[#f24429] text-white font-semibold w-[48%]'>Unfollow</button>
                <button 
                    onClick={()=> setOpenModal(false)} 
                    className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Close</button>
                </div>
            </Modal>
        </div>
    )
}
