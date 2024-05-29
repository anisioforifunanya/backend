'use client'
import { useRef, useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import SendChat from './SendChat';
import { setAsRead } from '@/services/chatsService';
import { FaArrowLeft } from 'react-icons/fa6';

export default function ChatBody({ currentChat, user, closeChat }) {
    const [chat, setChat] = useState(currentChat);
    const [newMsgLength, setNewMsgLength] = useState(0);

    useEffect(() => {
        if (chat.messages.length !== currentChat.messages.length) {
            setNewMsgLength(prev => prev + 1);
        }
        setChat(currentChat);
    }, [currentChat]);

    useEffect(() => {
        for (let msg of chat.messages) {
            if (msg.is_read === false && msg.sender !== user.id) {
                setAsRead(msg.id);
            }
        }
    }, [currentChat])

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

    const { push } = useRouter();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [newMsgLength]);

    const updateMsg = (msg) => {
        const updatedChat = { ...chat, messages: [...chat.messages, msg] };
        setChat(updatedChat);
        setNewMsgLength(newMsgLength + 1);
    };

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const renderDateMarker = (currentMessage, previousMessage) => {
        if (!previousMessage || !isSameDay(new Date(currentMessage.timestamp), new Date(previousMessage.timestamp))) {
            const formattedDate = new Date(currentMessage.timestamp).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return <div className="text-center text-gray-500 font-semibold my-2">{formattedDate}</div>;
        }
        return null;
    };

    return (
        <div className='w-full h-full'>
            <header className='flex w-full h-[60px] py-2 px-4 capitalize border-b border-gray-200 gap-2 items-center font-semibold justify-between'>
                <div className='flex gap-2 items-center'>
                    <img 
                        onClick={() => push(`/home/people/${chat?.participantId}`)}
                        src={chat?.participantInfo.profile_pic_url || '/img/user.png'} 
                        className='w-[35px] h-[35px] object-cover rounded-full border-2 border-red-600'
                        alt="user"
                    />
                    {chat?.participantInfo.display_name}
                </div>
                <button 
                    onClick={closeChat}
                    className='p-2 text-white rounded-md bg-red-500 sm:hidden block '>
                    <FaArrowLeft />
                </button>
            </header>
            <div ref={chatContainerRef} className="h-[calc(100%-124px)] overflow-y-auto scroll-smooth p-3">
                {chat?.messages.map((msg, index) => (
                    <Fragment key={uuidv4()}>
                        {renderDateMarker(msg, index > 0 ? chat.messages[index - 1] : null)}
                        <Chat user={user} msg={msg} />
                    </Fragment>
                ))}
            </div>
            <SendChat sender={user.id} receiver={chat?.participantId} handleUpdate={updateMsg}/>
        </div>
    );
}
