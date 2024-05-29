'use client'
import Loader from '@/app/components/Loader';
import { sendGroupMessage } from '@/services/chatsService';
import {useState} from 'react'
import { LuSend } from "react-icons/lu";
import { toast } from 'react-toastify';

export default function SendGroupChat({user, handleUpdate, groupId}) {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = () => {
        if(message.trim() === '') {
            toast.error('Message cannot be empty!')
            return
        } 
        
        if(isSending) return;
        
        setIsSending(true)

        const data = {
            sender: user.id,
            message,
            timestamp: new Date().toISOString(),
            display_name: user.display_name
        }
        sendGroupMessage({
            group: groupId,
            new_message: data
        }).then(res => {
            if(res !== 'error'){
                handleUpdate(data)
                setMessage('')
            }
            setIsSending(false)
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

  return (
    <div className='flex gap-2 items-center p-3'>
        <textarea
            value={message} 
            onChange={(e)=> setMessage(e.target.value)}
            className='w-full p-[8px] pt-[10px]  border-b-2 h-[40px] leading-none outline-none border-gray-300 rounded-md transition-[0.2s] bg-red-100 focus:outline-none focus:border-red-500 resize-none placeholder-red-300'
            placeholder='Type a message...'
            onKeyPress={handleKeyPress}
           >
        </textarea>
        <button 
            onClick={handleSend}
            className={` text-white rounded-lg transition flex font-semibold hover:bg-red-800 ${isSending? 'bg-slate-400 p-[10px]' : 'bg-red-500 p-3'}`}>
            {isSending? <Loader /> : <LuSend />}
        </button>
    </div>
  )
}
