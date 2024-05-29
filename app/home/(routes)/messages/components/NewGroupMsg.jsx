'use client'
import Loader from '@/app/components/Loader'
import { LuX } from "react-icons/lu";
import Modal from '@/app/components/Modal'
import { search } from '@/services/peopleService'
import {useEffect, useState} from 'react'
import { createGroup, sendMessage } from '@/services/chatsService';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function NewGroupMsg({handleCloseModal, openModal, authUser}) {
    const [group, setGroup] = useState({
        name: '',
        description: '',
        owner: authUser?.id,
        members: [authUser?.id]
    })

    const [displayName, setDisplayName] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [memberList, setMemberList] = useState([])

    useEffect(()=> {
        setGroup({
            ...group,
            owner: authUser?.id,
        })
        setMemberList([authUser])
    }, [authUser])

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            if(displayName === '') {
                setSearchResults(null);
                setShowResults(false);
                return;
            }

            const isItemSelected = searchResults?.find((user) => {
                    return user.display_name === displayName
            });

            if(isItemSelected) return;

            setLoading(true);
            search('users', displayName).then((res) => {
                if (res && res.length > 0) {
                    setSearchResults(res);
                    setShowResults(true);
                }
                setLoading(false);
            });
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
      }, [displayName, 500]);

    console.log("memberList", memberList)
    
    const handleInputChange = (e) => {
        setDisplayName(e.target.value);
    };

  const handleUserClick = (user) => {
    if(!memberList.find((member) => member.id === user.id)){
        setGroup({
            ...group,
            members: [ ...group.members, user.id]
        })
        setMemberList([...memberList, user])
    }
    setDisplayName("")
    setShowResults(false)
  }

  const removeUser = (user) => {
    setGroup({
        ...group,
        members: group.members.filter((id) => id !== user.id)
    })
    setMemberList(memberList.filter((member) => member.id !== user.id))
  } 
  

  const handleCreateGroup = () => {
        if(group.members.length < 2){
            toast.error('Please select at least 2 or more users!')
            return
        }
        if(group.name.trim() == ""){
            toast.error('Group name is required!')
            return
        }
        setIsSending(true)
        createGroup(group).then(res => {
            if(res !== 'error'){
                toast.success('Group created!')
                handleCloseModal()
            }
            setIsSending(false)
        })
  }

  return (
    <Modal
        className={'text-black'}
        onClose={handleCloseModal}
        isModalOpen={openModal} 
        title={'New Group Chat'} 
    >
   <div className='flex flex-col gap-2'>
        <div className="flex gap-2 w-full flex-wrap">
            {memberList?.map(user => (
                <div key={user?.id} className='flex gap-1 rounded-md border border-gray-500 relative p-1 pr-3 items-center text-[0.6em]' >
                    <img src={user?.profile_pic_url || '/img/user.png'} alt="" className='w-5 h-5 rounded-full object-cover aspect-square border border-red-500'/>
                    <p>{user?.display_name}</p>
                    {user?.id !== authUser?.id && <button onClick={() => removeUser(user)} className='absolute text-red-500 top-[2px] right-[2px]'><LuX size={10}/></button>}
                </div>
            ))}
        </div>
        <div className="w-full p-2 relative flex flex-col gap-1">
                <label htmlFor="">Display name or username</label>
                <div className='p-2 border border-gray-300 rounded-md transition-[0.2s]  focus-within:border-red-500 flex gap-1 items-center'>
                    <input 
                        type="text" 
                        placeholder='Start typing' 
                        className='w-full focus:outline-none outline-none'
                        value={displayName} 
                        onChange={handleInputChange}/>
                {loading && <Loader color={'red'} />}
                </div>
                {showResults &&
                    <div className='absolute top-[100%] flex flex-col rounded max-h-[200px] overflow-y-auto bg-[#ffffffab] backdrop-blur-md right-0 p-1 border'>
                        {searchResults?.map(user => (
                            <div 
                                key={user.id} 
                                className='flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 transition capitalize rounded'
                                onClick={()=> handleUserClick(user)}
                                >
                                    <img src={user.profile_pic_url || '/img/user.png'} alt="" className='w-7 h-7 rounded-full object-cover aspect-square border border-red-500'/>
                                    <p>{user.display_name}</p>
                            </div>
                        ))}
                        {searchResults?.length === 0 && <p className='p-2'>No users found</p>}
                    </div>
                }
        </div>
        <div className="w-full p-2 flex flex-col gap-1">
            <label htmlFor="">Description</label>
            <div className='flex gap-1'>
                <input 
                    placeholder='Enter group description here' 
                    className='w-full p-[8px] pt-[10px] border-b-2 h-[40px] leading-none outline-none border-red-100 rounded-md transition-[0.2s] bg-red-100 focus:outline-none focus:border-red-500 resize-none placeholder-red-300'
                    value={group.description} 
                    onChange={(e)=> setGroup({
                        ...group,
                        description: e.target.value
                    })} />
            </div>
            <label className="mt-3">Group Name</label>
            <div className='flex gap-1'>
                <input 
                    placeholder='Enter group name here' 
                    className='w-full p-[8px] pt-[10px] border-b-2 h-[40px] leading-none outline-none border-red-100 rounded-md transition-[0.2s] bg-red-100 focus:outline-none focus:border-red-500 resize-none placeholder-red-300'
                    value={group.name} 
                    onChange={(e)=> setGroup({
                        ...group,
                        name: e.target.value
                    })} />
            </div>
            <button 
                onClick={handleCreateGroup}
                className={` text-white rounded-lg transition justify-center mt-3 flex font-semibold hover:bg-red-800 ${isSending? 'bg-slate-400 p-[10px]' : 'bg-red-500 p-3'}`}>
                {isSending? <Loader /> : "Create"}
            </button>
        </div>
    </div>
 </Modal>
  )
}
