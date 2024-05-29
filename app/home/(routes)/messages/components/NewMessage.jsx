'use client'
import Loader from '@/app/components/Loader'
import { LuSend } from "react-icons/lu";
import Modal from '@/app/components/Modal'
import { search } from '@/services/peopleService'
import {useEffect, useState} from 'react'
import { sendMessage } from '@/services/chatsService';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function NewMessage({handleCloseModal, openModal, authUser, receiver, msg}) {
    const [message, setMessage] = useState({
        receiver: '',
        message: '',
        sender: authUser?.id,
        is_read: false
    })

    useEffect(()=> {
        setMessage({
            ...message,
            sender: authUser?.id,
            receiver: receiver || '',
            message: msg || ''
        })
    }, [authUser, receiver])

    const [displayName, setDisplayName] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [showResults, setShowResults] = useState(false)

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

    
    const handleInputChange = (e) => {
        setDisplayName(e.target.value);
    };

  const handleUserClick = (user) => {
        setMessage({
            ...message,
            receiver: user.id
        })
        setDisplayName(user.display_name)
        setShowResults(false)
  }
  

  const handleSend = () => {
        if(message.message.trim() === '') {
            toast.error('Message cannot be empty!')
            return
        }
        if(message.receiver === ''){
            toast.error('Please select a user to send message to!')
            return
        }
        setIsSending(true)
        sendMessage(message).then(res => {
            if(res !== 'error'){
                toast.success('Message sent!')
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
        title={'New Message'} 
    >
   <div className='flex flex-col gap-2'>
        <div className="w-full p-2 relative flex flex-col gap-1">
            {receiver && <h2 className='font-semibold'>Make sure to check your responses in the <Link href={'/home/messages'} className='text-red-500'>Messages Tab</Link></h2>}
            {!receiver && <>
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
            </>}
        </div>
        <div className="w-full p-2 flex flex-col gap-1">
            <label htmlFor="">Message</label>
            <div className='flex gap-1'>
                <textarea 
                    placeholder='Your message here' 
                    className='w-full p-[8px] pt-[10px] border-b-2 h-[40px] leading-none outline-none border-red-100 rounded-md transition-[0.2s] bg-red-100 focus:outline-none focus:border-red-500 resize-none placeholder-red-300'
                    value={message.message} 
                    onChange={(e)=> setMessage({
                        ...message,
                        message: e.target.value
                    })}>
                </textarea>
                <button 
                    onClick={handleSend}
                    className={` text-white rounded-lg transition flex font-semibold hover:bg-red-800 ${isSending? 'bg-slate-400 p-[10px]' : 'bg-red-500 p-3'}`}>
                    {isSending? <Loader /> : <LuSend />}
                </button>
            </div>
        </div>
    </div>
 </Modal>
  )
}
