'use client'
import Error from '@/app/components/Error'
import Spinner from '@/app/components/Spinner'
import { getGroupMsg } from '@/services/chatsService'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { v4 as uuidv4 } from 'uuid';
import GroupMsg from './GroupMsg'
import SendGroupChat from './SendGroupChat'

export default function GroupBody({group, user, closeGroup}) {
    const [messages, setMessages] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [prevGroup, setPrevGroup] = useState(null)

    useEffect(()=> {
        if(prevGroup !== group){
            setLoading(true)
            setMessages(null)
            setPrevGroup(group)
        }
        getGroupMsg(group.id)
            .then((res)=> {
                if (res !== 'error') {
                    if(prevGroup !== group){
                        setMessages(res?.messages || [])
                    }
                } else {
                    setError(true)
                }
            }).finally(()=> setLoading(false))
        }, [group, messages])

    const updateChat = (message) => {
        setMessages(prev => [...prev, message])
    }
        
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          .sidebarBtn {
            bottom: 64px;
            padding: 10px;
            right: 12px;
          }
        `;
        document.head.appendChild(style);
    
        return () => {
          document.head.removeChild(style);
        };
      }, []);
      
    return (
        <div className='w-full h-full'>
            <header className='flex w-full min-h-[60px] py-2 px-4  border-b border-gray-200 gap-2 items-center justify-between relative'>
                <div className='w-[70%]'>
                    <h2 className='capitalize truncate w-[100%] font-semibold'>{group.name}</h2>
                    <p title={group.description} className="text-sm w-[100%] text-gray-400 truncate">{group.description}</p>
                </div>
                <div className='flex gap-3 absolute top-3 right-2'>
                    <button 
                        onClick={closeGroup}
                        className='p-2 text-white rounded-md bg-red-500 sm:hidden block '>
                        <FaArrowLeft />
                    </button>
                </div>
            </header>
            <main className="h-[calc(100%-61px)] w-full flex flex-col items-center justify-center">
                {(loading || !messages) && <Spinner  centered/>}

                {error && <Error className={'w-[150px] h-auto'}><p className='text-sm' >Try reloading the page!</p></Error>}


                {!loading && messages && (
                    <>
                        <div className='w-full h-full'>
                            <div className='w-full h-[calc(100%-64px)] p-2 overflow-y-auto'> 
                                {messages?.map(msg => (
                                    <GroupMsg key={uuidv4()} user={user} msg={msg}/>
                                ))}
                                {messages.length === 0 && <p className="font-semibold text-xl mt-5 text-center">No messages yet!</p>}
                            </div>
                            <SendGroupChat groupId={group.id} user={user} handleUpdate={updateChat} />
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
